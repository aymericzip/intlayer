import { create } from 'zustand';

type RightDrawerStore = {
  drawers: Record<string, boolean>;
  open: (key: string) => void;
  close: (key: string) => void;
  isOpen: (key: string) => boolean;
};

export const useRightDrawerStore = create<RightDrawerStore>((set, get) => ({
  drawers: {},
  open: (key: string) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: true,
      },
    })),
  close: (key: string) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: false,
      },
    })),
  isOpen: (key: string) => get().drawers[key] ?? false,
}));
