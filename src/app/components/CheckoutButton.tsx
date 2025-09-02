"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { SubscriptionType } from "@/types/SubscriptionType";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Checkout from "./Checkout";
import { existsOrder } from "../actions";

type CheckoutButtonProps = {
  item: SubscriptionType;
}

export default function CheckoutButton({ item }: CheckoutButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setInProcessing] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const router = useRouter();
  const { user } = useUser();
  const cartStore = useCartStore();

  const userId = user?.id;

  useEffect(() => {
    const checkOrder = async () => {
      if (!user) return;
      const result = await existsOrder(item.id, userId!);
      
      setAvailable(!result); // se existe order completa, desativa botão
    };
    checkOrder();
  }, [item.id, userId]);

  const handleCheckout = () => {
    if (!user) {
      cartStore.toggleCart();
      router.push(`/sign-in?redirectUrl=/`);
      return;
    }

    cartStore.setItem(item);
    cartStore.setCheckout('checkout');
    setShowCheckout(true);
    setInProcessing(true);
  }

  const handleFinish = async () => {
    cartStore.clearCart();
    setAvailable(false);
    setInProcessing(false);

    setTimeout(() => {
      setShowCheckout(false);
      router.refresh();
    }, 8000);

    let attempts = 0;
    const check = async () => {
      if (attempts > 5) return; // para depois de 5 tentativas
      const result = await existsOrder(item.id, userId!);
      if (!result) {
        setAvailable(false);
      } else {
        attempts++;
        setTimeout(check, 2000);
      }
    };
    check();
  }

  if (available === null) return <button disabled className="w-full rounded-md mb-10 bg-gray-400 py-2">Carregando...</button>;

  return (
    <div className="w-full">
      <p className='text-green-600 font-bold mb-2'>
        Total: {formatPrice(item.price)}
      </p>
      <button 
        onClick={handleCheckout}
        disabled={!available}
        className={`w-full cursor-pointer rounded-md mb-10 py-2 text-white ${available ? 'bg-neutral-600' : 'bg-gray-400'}`}
      >
        {available ? "Finalizar Compra" : "Plano já adquirido"}
      </button>

      {showCheckout && <Checkout onFinish={handleFinish} />}
      
      {isProcessing && (
        <div className="text-center text-neutral-600 font-bold my-2">
          Processando transação...
        </div>
      )}
    </div>
  );
}