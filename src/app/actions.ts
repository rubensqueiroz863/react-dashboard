// fetchSubscriptions.ts
"use server";

import { stripe } from "@/lib/stripe";
import { SubscriptionType } from "@/types/SubscriptionType";
import { prisma } from "@/lib/prisma";

export async function fetchSubscriptions(): Promise<{ subscriptions: SubscriptionType[] }> {
  const { data: products } = await stripe.products.list();

  const subscriptions: SubscriptionType[] = [];

  for (const product of products) {
    const prices = await stripe.prices.list({ product: product.id, limit: 1 });

    const price = prices.data[0];

    if (price && price.unit_amount !== null) {
      subscriptions.push({
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        price: price.unit_amount / 100, // geralmente o Stripe usa centavos
      });
    }
  }

  return { subscriptions };
}

export async function fetchSubscriptionById(productId: string): Promise<SubscriptionType | null> {
  try {
    const product = await stripe.products.retrieve(productId);
    const prices = await stripe.prices.list({ product: product.id, limit: 1 });

    const price = prices.data[0];

    if (price && price.unit_amount !== null) {
      return {
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        price: price.unit_amount / 100, // centavos -> reais
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar assinatura:", error);
    return null;
  }
}

export async function completePayment(payment_intent_id: string) {
  if (!payment_intent_id || typeof payment_intent_id !== "string") {
    throw new Error("ID da transação é obrigatório e deve ser uma string");
  }
  try {
      await prisma.order.update({
      where: { paymentIntentID: payment_intent_id },
      data: { status: "completed"},
    })
    return true;
  } catch (err) {
    console.error("Erro ao editar transação: ", err);
    return false;
  }
}

export async function existsOrder(productId: string, userId: string) {
  if (!productId || typeof productId !== "string") {
    throw new Error("ID do produto é obrigatório e deve ser uma string");
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        products: {
          some: { id: productId }, // procura orders que tenham pelo menos esse produto
        },
        status: "completed",
        userId: userId
      },
    });

    return !!order; // true se encontrou, false se não
  } catch (err) {
    console.error("Erro ao buscar order:", err);
    return false;
  }
}

export async function deletePendingOrders(): Promise<boolean> {
  try {
    const deletedOrders = await prisma.order.deleteMany({
      where: { status: "pending"},
    });

    return !!deletedOrders;
  } catch (err) {
    console.error("Erro ao excluir transação:", err);
    return false;
  }
}