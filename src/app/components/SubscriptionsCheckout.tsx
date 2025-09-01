"use client";

import { motion } from "framer-motion";
import { formatPrice, subscriptionsFeatures } from "@/lib/utils";
import Link from "next/link";

interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function SubscriptionsCheckout({
  sub,
  index,
}: {
  sub: Subscription;
  index: number;
}) {

  return (
    <Link href={`subscription-checkout/${sub.id}/`}>
        <motion.div
        className="flex flex-col rounded-2xl border shadow-md w-full max-w-sm px-6 py-10 h-full bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
        >
        <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold">{sub.name}</h1>
            <p className="py-2 text-md">{sub.description ?? "Sem descrição"}</p>

            <div className="space-y-2 text-neutral-500 font-sans text-sm mt-2">
            {subscriptionsFeatures[index].map((subscriptionFeature, i) => (
                <p key={i}>{subscriptionFeature}</p>
            ))}
            </div>

            <div className="flex items-end pt-6 mt-auto">
            <p className="text-3xl font-bold">{formatPrice(sub.price)}</p>
            <p className="ml-1 text-lg font-semibold text-neutral-600">/mês</p>
            </div>
        </div>
        </motion.div>
    </Link>
    
  );
}
