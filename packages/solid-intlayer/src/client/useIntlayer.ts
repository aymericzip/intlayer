import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { createMemo, useContext } from 'solid-js';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Solid hook that picks one dictionary by its key and returns its reactive content.
 *
 * The second argument is either a locale or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `{ id: 'prod_abc', ...metaFields }` — meta record
 * - `locale` composes with any selector and overrides the context locale
 *
 * Supports both direct property access and the accessor call form:
 * - `content.myField.value` — reactive when used inside JSX or other Solid reactive contexts
 * - `content()` — backward-compatible accessor form
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param localeOrSelector - Optional locale or selector.
 * @returns Reactive content accessible via property access or function call.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'solid-intlayer';
 *
 * const MyComponent = () => {
 *   const content = useIntlayer('my-dictionary-key');
 *   const faq2 = useIntlayer('faq', { item: 2 });
 *
 *   return <div>{content.myField.value}</div>;
 * };
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  ExtractSelectorLocale<A>
> => {
  const context = useContext(IntlayerClientContext) ?? {};

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  const accessor = createMemo(() => {
    const currentLocale = context?.locale?.();

    if (
      process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
      typeof localeOrSelector === 'object' &&
      localeOrSelector !== null
    ) {
      return getIntlayer(key, {
        ...localeOrSelector,
        locale: localeOrSelector.locale ?? currentLocale,
      } as A);
    }

    const localeTarget = (localeOrSelector ?? currentLocale) as A;

    return getIntlayer<T, A>(key, localeTarget);
  });

  return new Proxy(accessor, {
    get(target, prop) {
      const content = target();
      return content?.[prop as keyof typeof content];
    },
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
  }) as DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    ExtractSelectorLocale<A>
  >;
};
