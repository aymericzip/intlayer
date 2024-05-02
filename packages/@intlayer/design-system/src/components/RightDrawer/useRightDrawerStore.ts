import { create } from 'zustand';

type RightDrawerStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useRightDrawerStore = create<RightDrawerStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
