// fetchSubscriptions.ts
"use server";

import { stripe } from "@/lib/stripe";
import { SubscriptionType } from "@/types/SubscriptionType";
import { TransactionInput, TransactionResponse } from "@/types/TransactionTypes";

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

export async function addTransaction({
  amount,
  currency,
  type,
  status,
  userId,
}: TransactionInput): Promise<TransactionResponse | void> {
  if (!amount || !currency || !type || !userId) {
    console.error("Parâmetros obrigatórios ausentes");
    return;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/route`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount, currency, type, status, userId }),
});




  if (!res.ok) {
    console.error("Erro ao criar transação");
    return;
  }

  const data: TransactionResponse = await res.json();
  console.log("Nova transação:", data);
  return data;
}
