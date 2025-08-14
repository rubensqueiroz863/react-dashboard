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

  // Buscar o usuário no banco usando o externalId (do Clerk)
  const user = await prisma.user.findUnique({
    where: { externalId: userId }
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (payment_intent_id) {
    // Atualizar pagamento existente
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (!current_intent) {
      return NextResponse.json({ error: "Payment intent not found" }, { status: 404 });
    }

    const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
      amount: totalPrice(item)
    });

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
        amount: totalPrice(item),
        products: {
          deleteMany: {}, // apaga produto anterior
          create: {
            name: item.name,
            description: item.description ?? "",
            price: totalPrice(item),
          }
        }
      }
    });

    return NextResponse.json({ paymentIntent: updated_intent }, { status: 200 });
  } 

  // Criar novo pagamento
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice(item),
    currency: 'brl',
    automatic_payment_methods: { enabled: true },
  });

  const newOrder = await prisma.order.create({
    data: {
      user: { connect: { id: user.id } }, // conecta pelo id interno
      currency: 'brl',
      status: 'pending',
      paymentIntentID: paymentIntent.id,
      amount: totalPrice(item),
      products: {
        create: {
          name: item.name,
          description: item.description ?? "",
          price: totalPrice(item)
        }
      }
    }
  });

  return NextResponse.json({ paymentIntent }, { status: 200 });
}
