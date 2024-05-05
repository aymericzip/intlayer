import { create } from 'zustand';

type RightDrawerStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const createRightDrawerStore = () =>
  create<RightDrawerStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }));

const drawerStores: Record<
  string,
  ReturnType<typeof createRightDrawerStore>
> = {};

export const useRightDrawerStore = (key: string) => {
  // If a store doesn't exist for this key, create it.
  if (!drawerStores[key]) {
    drawerStores[key] = createRightDrawerStore();
  }

  // Return the store for the given key.
  return drawerStores[key];
};
