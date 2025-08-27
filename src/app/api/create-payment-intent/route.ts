import { auth } from '@clerk/nextjs/server';
import { stripe } from "@/lib/stripe";
import { SubscriptionType } from '@/types/SubscriptionType';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const totalPrice = (item: SubscriptionType) => item.price ?? 0;

export async function POST(req: Request) {
  const { userId } = await auth();
  const { item, payment_intent_id } = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
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
      price: totalPrice(item),
    }
  });

  const amount = totalPrice(item) * 100; // centavos para Stripe

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
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'brl',
    automatic_payment_methods: { enabled: true },
  });

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
