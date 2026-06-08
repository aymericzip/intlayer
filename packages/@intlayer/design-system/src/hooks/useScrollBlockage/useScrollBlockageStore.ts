import { useSyncExternalStore } from 'react';

type Blocker = {
  element: Element;
  blockers: string[];
};

class ScrollBlockageObservable {
  private listeners = new Set<() => void>();
  private scrollBlockers: Blocker[] = [];

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => {
    return this.scrollBlockers;
  };

  addBlockage = (blockerName: string, element: HTMLElement) => {
    const blockersElement = this.scrollBlockers.find(
      (blocker) => blocker.element === element
    );

    if (blockersElement) {
      if (blockersElement.blockers.includes(blockerName)) return;

      this.scrollBlockers = this.scrollBlockers.map((blocker) =>
        blocker.element === element
          ? { ...blocker, blockers: [...blocker.blockers, blockerName] }
          : blocker
      );
    } else {
      element.style.overflowY = 'hidden';
      element.style.overflowX = 'hidden';
      this.scrollBlockers = [
        ...this.scrollBlockers,
        { element, blockers: [blockerName] },
      ];
    }
    this.emit();
  };

  removeBlockage = (blockerName: string, element: HTMLElement) => {
    const blocker = this.scrollBlockers.find(
      (blocker) => blocker.element === element
    );

    if (blocker) {
      if (blocker.blockers.length > 1) {
        this.scrollBlockers = this.scrollBlockers.map((b) =>
          b.element === element
            ? {
                ...b,
                blockers: b.blockers.filter((name) => name !== blockerName),
              }
            : b
        );
      } else {
        element.style.overflowY = '';
        element.style.overflowX = '';
        this.scrollBlockers = this.scrollBlockers.filter(
          (b) => b.element !== element
        );
      }
      this.emit();
    }
  };

  isElementScrollBlocked = (element: HTMLElement) => {
    return this.scrollBlockers.some((blocker) => blocker.element === element);
  };

  private emit = () => {
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

export const scrollBlockageManager = new ScrollBlockageObservable();

const serverSnapshot: Blocker[] = [];

export const useScrollBlockageStore = () => {
  const scrollBlockers = useSyncExternalStore(
    scrollBlockageManager.subscribe,
    scrollBlockageManager.getSnapshot,
    () => serverSnapshot
  );

  return {
    scrollBlockers,
    addBlockage: scrollBlockageManager.addBlockage,
    removeBlockage: scrollBlockageManager.removeBlockage,
    isElementScrollBlocked: scrollBlockageManager.isElementScrollBlocked,
  };
};
