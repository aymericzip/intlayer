import { create } from 'zustand';

type Blocker = {
  element: Element;
  blockers: string[];
};

type ScrollBlockageStore = {
  scrollBlockers: Blocker[];
  addBlockage: (blockerName: string, element: HTMLElement) => void;
  removeBlockage: (blockerName: string, element: HTMLElement) => void;
  isElementScrollBlocked: (element: HTMLElement) => boolean;
};

export const useScrollBlockageStore = create<ScrollBlockageStore>(
  (set, get) => ({
    scrollBlockers: [],

    addBlockage: (blockerName: string, element: HTMLElement) =>
      set((state) => {
        const scrollBlockers = state.scrollBlockers;
        const blockersElement = scrollBlockers.find(
          (blocker) => blocker.element === element
        );

        if (blockersElement) {
          const isBlockerNameExist =
            blockersElement.blockers.includes(blockerName);

          const newBlockers = isBlockerNameExist
            ? blockersElement.blockers
            : [...blockersElement.blockers, blockerName];

          return {
            scrollBlockers: scrollBlockers.map((blocker) =>
              blocker.element === element
                ? { ...blocker, blockers: newBlockers }
                : blocker
            ),
          };
        }

        element.style.overflowY = 'hidden';
        return {
          scrollBlockers: [
            ...scrollBlockers,
            { element, blockers: [blockerName] },
          ],
        };
      }),

    removeBlockage: (blockerName: string, element: HTMLElement) =>
      set((state) => {
        const scrollBlockers = state.scrollBlockers;
        const blocker = scrollBlockers.find(
          (blocker) => blocker.element === element
        );

        if (blocker) {
          // if there are more than one blocker, remove the blockerName from the list
          if (blocker.blockers.length > 1) {
            return {
              scrollBlockers: scrollBlockers.map((blocker) =>
                blocker.element === element
                  ? {
                      ...blocker,
                      blockers: blocker.blockers.filter(
                        (b) => b !== blockerName
                      ),
                    }
                  : blocker
              ),
            };
          }

          // if there is only one blocker, remove the full blocker element
          element.style.overflowY = 'auto';
          return {
            scrollBlockers: scrollBlockers.filter(
              (blocker) => blocker.element !== element
            ),
          };
        }

        return {
          scrollBlockers,
        };
      }),

    isElementScrollBlocked: (element: HTMLElement) =>
      get().scrollBlockers.some((blocker) => blocker.element === element),
  })
);
