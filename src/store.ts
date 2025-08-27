import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SubscriptionType } from '@/types/SubscriptionType';

export type PaymentIntentType = {
  id: string;
  client_secret: string;
};

type CartState = {
  item: SubscriptionType | null; // apenas 1 item
  setItem: (item: SubscriptionType) => void;
  removeItem: () => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: 'cart' | 'checkout';
  setCheckout: (checkout: 'cart' | 'checkout') => void;
  paymentIntent: PaymentIntentType | null;
  setPaymentIntent: (paymentIntent: PaymentIntentType | null) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      item: null,
      setItem: (item) => set({ item }),
      removeItem: () => set({ item: null }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: 'cart',
      setCheckout: (checkout) => set({ onCheckout: checkout }),
      paymentIntent: null,
      setPaymentIntent: (paymentIntent) => set({ paymentIntent }),
      clearCart: () => set({ item: null, paymentIntent: null, onCheckout: 'cart' }),
    }),
    { name: 'cart-storage' }
  )
);
