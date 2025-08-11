import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SubscriptionType } from '@/types/SubscriptionType';

type PaymentIntentType = {
  id: string;
  client_secret: string;
};

type CartState = {
  item: SubscriptionType | null; // Só um item no carrinho
  setItem: (product: SubscriptionType) => void;
  removeItem: () => void;
  isOpen: boolean;
  toggleCart: () => void;
  clearCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: PaymentIntentType | null;
  setPaymentIntent: (paymentIntent: PaymentIntentType | null) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      item: null,
      setItem: (product) => set(() => ({ item: product })), // adiciona o produto
      removeItem: () => set(() => ({ item: null })), // remove o produto
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: 'cart',
      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      paymentIntent: null,
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
      clearCart: () => set(() => ({ item: null, paymentIntent: null })),
    }),
    { name: 'cart-storage' }
  )
);