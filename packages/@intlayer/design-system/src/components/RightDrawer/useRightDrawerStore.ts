import { create, StoreApi, UseBoundStore } from 'zustand';

type RightDrawerStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const drawerStores = new Map<
  string,
  UseBoundStore<StoreApi<RightDrawerStore>>
>();

export const useRightDrawerStore = (key: string) => {
  if (!drawerStores.has(key)) {
    drawerStores.set(
      key,
      create<RightDrawerStore>((set) => ({
        isOpen: false,
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      }))
    );
  }
  return drawerStores.get(key)!;
};
