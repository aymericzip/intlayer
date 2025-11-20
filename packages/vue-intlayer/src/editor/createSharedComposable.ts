import { type EffectScope, effectScope } from 'vue';

type AnyFn = (...args: any[]) => any;

export type SharedComposableReturn<T extends AnyFn = AnyFn> = T;

import { getCurrentScope, onScopeDispose } from 'vue';

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 */
export const tryOnScopeDispose = (fn: () => void) => {
  if (getCurrentScope()) {
    onScopeDispose(fn);

    return true;
  }

  return false;
};

/**
 * Make a composable function usable with multiple Vue instances.
 */
export const createSharedComposable = <Fn extends AnyFn>(
  composable: Fn
): SharedComposableReturn<Fn> => {
  let subscribers = 0;
  let state: ReturnType<Fn> | undefined;
  let scope: EffectScope | undefined;

  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = undefined;
      scope = undefined;
    }
  };

  return <Fn>((...args) => {
    subscribers += 1;

    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }

    tryOnScopeDispose(dispose);

    return state;
  });
};
