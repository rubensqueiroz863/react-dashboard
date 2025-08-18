// fetchSubscriptions.ts
"use server";

import { stripe } from "@/lib/stripe";
import { SubscriptionType } from "@/types/SubscriptionType";
import { prisma } from "@/lib/prisma";
import { TransactionResponse } from "@/types/TransactionTypes";

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

export async function getTransactions(userId: string): Promise<TransactionResponse[]> {
  if (!userId || typeof userId !== "string") {
    throw new Error("ID do usuário é obrigatório e deve ser uma string");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return transactions.map((tx) => ({
      id: tx.id,
      amount: tx.amount,
      currency: tx.currency,
      type: tx.type === "income" ? "income" : "expense",
      status: tx.status,
      userId: tx.userId,
      createdAt: tx.createdAt.toISOString(),
      name: tx.name ?? "", // converter Date para string
    }));
  } catch (err) {
    console.error("Erro ao buscar transações:", err);
    return [];
  }
}
