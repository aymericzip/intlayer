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
): DeepTransformContent<T['content'], L> => {
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
  }) as DeepTransformContent<T['content'], L>;
};
