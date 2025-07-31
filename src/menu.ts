import { create } from "zustand";

type MenuState = {
  isOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
}));
