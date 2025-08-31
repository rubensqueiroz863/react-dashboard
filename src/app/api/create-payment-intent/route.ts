import { auth } from '@clerk/nextjs/server';
import { stripe } from "@/lib/stripe";
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const { userId } = await auth();
  const { item, payment_intent_id } = await req.json();

  let paymentIntent: Stripe.PaymentIntent;
  const price = item.price ?? 0;
  const amount = price * 100;

  if (!userId) {
    return new Response("Unauthorized", { status: 404 });
  }

  if (!item?.id || !item?.name || typeof item.price !== "number") {
    return NextResponse.json({ error: "Dados de produtos inválidos." }, { status: 400 });
  }

  // Busca o usuário no banco
  const user = await prisma.user.findUnique({
    where: { externalId: userId }
  });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Garante que o produto exista
  const product = await prisma.product.upsert({
    where: { id: item.id }, // se quiser gerar ID automático, use remove id daqui
    update: {},
    create: {
      id: item.id,
      name: item.name,
      description: item.description ?? "",
      price,
    }
  });

  //const amount = totalPrice(item) * 100; // centavos para Stripe

  if (payment_intent_id) {
    // Atualiza PaymentIntent existente
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
    if (!current_intent) {
      return NextResponse.json({ error: "Payment intent not found" }, { status: 404 });
    }

    const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
      amount
    });

    // Atualiza order existente
    const existing_order = await prisma.order.findFirst({
      where: { paymentIntentID: payment_intent_id },
      include: { products: true }
    });

    if (!existing_order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await prisma.order.update({
      where: { paymentIntentID: payment_intent_id },
      data: {
        amount,
        products: {
          set: [{ id: product.id }] // substitui por produto atual
        }
      }
    });

    return NextResponse.json({ paymentIntent: updated_intent }, { status: 200 });
  } 

  // Cria novo PaymentIntent
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    });
  } catch (err) {
    return NextResponse.json({ error: "Não foi possível criar o paymentIntent." }, { status: 502 });
  }
  

  // Cria nova ordem
  await prisma.order.create({
    data: {
      user: { connect: { id: user.id } },
      currency: 'brl',
      status: 'pending',
      paymentIntentID: paymentIntent.id,
      amount,
      products: { connect: { id: product.id } }
    }
  });

  return NextResponse.json({ paymentIntent }, { status: 200 });
}