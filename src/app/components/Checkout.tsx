"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { completePayment } from "../actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutProps = {
  onFinish: () => void;
}

export default function Checkout({ onFinish }: CheckoutProps) {
  const cartStore = useCartStore();
  const item = cartStore.item; // pega o item diretamente
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!item) {
      setLoading(false); // garante que não fique carregando indefinidamente
      return;
    }

    const createPaymentIntent = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item,
            payment_intent_id: cartStore.paymentIntent?.id
          }),
        });

        // Se a resposta não for 2xx, tenta pegar erro
        if (!res.ok) {
          const text = await res.text(); // evita erro se não tiver JSON
          throw new Error(text || 'Erro desconhecido');
        }

        const data = await res.json();
        cartStore.setPaymentIntent(data.paymentIntent);
        setClientSecret(data.paymentIntent.client_secret);
      } catch (err: unknown) {
        console.error("Erro ao criar Payment Intent:", err);
        setError("Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    createPaymentIntent();

  }, [item]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;
  if (!clientSecret) return <div>Pagamento não disponível</div>;
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'night', labels: 'floating' }
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm 
        clientSecret={clientSecret} 
        onSuccess={async () => {
          if (cartStore.paymentIntent?.id) {
            await completePayment(cartStore.paymentIntent.id);
          }
          cartStore.clearCart();
          onFinish(); // se quiser disparar algo extra passado como prop
        }} 
      />
    </Elements>
  );
}