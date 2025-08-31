"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

type CheckoutFormProps = {
  clientSecret: string;
  onSuccess: () => void; // callback para após pagamento
};

export default function CheckoutForm({ clientSecret, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required', // evita redirecionamento automático
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message || "Ocorreu um erro no pagamento.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setSuccess(true);
      onSuccess(); // chama callback para limpar carrinho
    }
  };

  if (success) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-lg font-bold text-green-600">Pagamento concluído!</h1>
        <p>Obrigado pela sua compra 🎉</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      <PaymentElement options={{ layout: "tabs" }} />

      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center text-gray-500 font-bold">
          Processando...
        </div>
      )}

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? "Processando..." : "Pagar agora"}
      </button>
    </form>
  );
}
