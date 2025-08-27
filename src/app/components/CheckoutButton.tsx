// CheckoutButton.tsx
'use client'

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { SubscriptionType } from "@/types/SubscriptionType";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkout from "./Checkout";

type CheckoutButtonProps = {
  item: SubscriptionType;
}

export default function CheckoutButton({ item }: CheckoutButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const cartStore = useCartStore();

  const handleCheckout = () => {
    if (!user) {
      cartStore.toggleCart();
      router.push(`/sign-in?redirectUrl=/`);
      return;
    }

    cartStore.setItem(item); // adiciona o item ao store
    cartStore.setCheckout('checkout');
    setShowCheckout(true);
  }

  const handleFinish = () => {
    // chama ao finalizar pagamento
    cartStore.clearCart(); // limpa cart e paymentIntent
    setShowCheckout(false); // esconde checkout
  }

  return (
    <div className="w-full">
      <p className='text-green-600 font-bold mb-2'>
        Total: {formatPrice(item.price)}
      </p>
      <button 
        onClick={handleCheckout}
        className='w-full rounded-md mb-10 bg-neutral-600 text-white py-2'
      >
        Finalizar Compra
      </button>

      {showCheckout && <Checkout onFinish={handleFinish} />}
    </div>
  );
}
