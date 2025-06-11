import { DestroyRef, inject } from '@angular/core';

type AnyFn = (...args: any[]) => any;

export type SharedComposableReturn<T extends AnyFn = AnyFn> = T;

/**
 * Angular replacement for Vue's tryOnScopeDispose
 * Uses Angular's DestroyRef to handle cleanup when the injection context is destroyed
 */
export function tryOnScopeDispose(fn: () => void) {
  try {
    const destroyRef = inject(DestroyRef, { optional: true });
    if (destroyRef) {
      destroyRef.onDestroy(fn);
      return true;
    }
    return false;
  } catch {
    // If called outside injection context, return false
    return false;
  }
}

/**
 * Angular equivalent of Vue's createSharedComposable
 * Creates a singleton pattern for services/composables
 */
export const createSharedComposable = <Fn extends AnyFn>(
  composable: Fn
): SharedComposableReturn<Fn> => {
  let subscribers = 0;
  let state: ReturnType<Fn> | undefined;
  let cleanupFn: (() => void) | undefined;

  const dispose = () => {
    subscribers -= 1;
    if (cleanupFn && subscribers <= 0) {
      cleanupFn();
      state = undefined;
      cleanupFn = undefined;
    }
  };

  return <Fn>((...args) => {
    subscribers += 1;
    if (!state) {
      state = composable(...args);
      // Set up cleanup when the first subscriber is destroyed
      if (tryOnScopeDispose(dispose)) {
        cleanupFn = dispose;
      }
    } else {
      // For additional subscribers, just set up their individual cleanup
      tryOnScopeDispose(dispose);
    }
    return state;
  });
};
