import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { createMemo, useContext } from 'solid-js';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';
import type { ReactiveContent } from './useDictionary';

/**
 * Solid hook that picks one dictionary by its key and returns its reactive content.
 *
 * Supports both direct property access and the accessor call form:
 * - `content.myField.value` — reactive when used inside JSX or other Solid reactive contexts
 * - `content()` — backward-compatible accessor form
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param locale - Optional locale to override the current context locale.
 * @returns Reactive content accessible via property access or function call.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'solid-intlayer';
 *
 * const MyComponent = () => {
 *   const content = useIntlayer('my-dictionary-key');
 *
 *   return <div>{content.myField.value}</div>;
 * };
 * ```
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
): ReactiveContent<DeepTransformContent<DictionaryRegistryContent<T>, L>> => {
  const context = useContext(IntlayerClientContext) ?? {};

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  const accessor = createMemo(() => {
    const currentLocale = context?.locale();
    const localeTarget = locale ?? currentLocale;

    return getIntlayer<T, L>(key, localeTarget as L);
  });

  return new Proxy(accessor, {
    get(target, prop) {
      const content = target();
      return content?.[prop as keyof typeof content];
    },
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
  }) as ReactiveContent<DeepTransformContent<DictionaryRegistryContent<T>, L>>;
};
