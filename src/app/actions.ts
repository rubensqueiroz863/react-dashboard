// fetchSubscriptions.ts
"use server";

import { stripe } from "@/lib/stripe";
import { SubscripitionType } from "@/types/SubscriptionTpe";

export async function fetchSubscriptions(): Promise<{ subscriptions: SubscripitionType[] }> {
  const { data: products } = await stripe.products.list();

  const subscriptions: SubscripitionType[] = [];

  for (const product of products) {
    const prices = await stripe.prices.list({ product: product.id, limit: 1 });

    const price = prices.data[0];

    if (price && price.unit_amount !== null) {
      subscriptions.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.unit_amount / 100, // geralmente o Stripe usa centavos
      });
    }
  }

  return { subscriptions };
}
