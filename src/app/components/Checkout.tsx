'use client';

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm"; 
import { SubscriptionType } from "@/types/SubscriptionType";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutProps = {
  item: SubscriptionType; // Recebe o item direto
};

export default function Checkout({ item }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState<{ id: string; client_secret: string } | null>(null);

  useEffect(() => {
    if (!item) return;

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item,
        payment_intent_id: paymentIntent?.id, // reusa se já existir
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentIntent(data.paymentIntent);
        setClientSecret(data.paymentIntent.client_secret);
      })
      .catch((err) => {
        console.error("Erro ao criar Payment Intent:", err);
      });

  }, [item, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      labels: 'floating',
    }
  };

  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div>
          <h1>Carregando...</h1>
        </div>
      )}
    </div>
  );
}
