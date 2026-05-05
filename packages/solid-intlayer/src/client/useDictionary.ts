import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { createMemo, useContext } from 'solid-js';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * A reactive content object that can be accessed both as a function (accessor)
 * and directly via property access.
 *
 * - `content()` returns the full content object (backward-compatible accessor form)
 * - `content.myField` accesses the property reactively (calls the accessor internally)
 *
 * Property access is reactive when used inside a Solid reactive context (JSX, createEffect, createMemo).
 * Destructuring outside a reactive context is not reactive — the same constraint applies to all Solid signals.
 */
export type ReactiveContent<T> = T & (() => T);

/**
 * On the client side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
): ReactiveContent<DeepTransformContent<T['content'], L>> => {
  const context = useContext(IntlayerClientContext) ?? {};

  const accessor = createMemo(() => {
    const localeTarget = locale ?? context?.locale?.();
    return getDictionary<T, L>(dictionary, localeTarget as L);
  });

  return new Proxy(accessor, {
    get(target, prop) {
      const content = target();
      return content?.[prop as keyof typeof content];
    },
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
  }) as ReactiveContent<DeepTransformContent<T['content'], L>>;
};
