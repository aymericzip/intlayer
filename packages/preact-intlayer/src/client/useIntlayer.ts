import {
  getDictionarySelectorCacheKey,
  resolveDictionaryArgument,
} from '@intlayer/core/dictionaryManipulator';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useContext, useMemo } from 'preact/hooks';
import { getIntlayer } from '../getIntlayer';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Preact hook that picks one dictionary by its key and returns its content.
 *
 * The second argument is either a locale or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `locale` composes with any selector and overrides the context locale
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param localeOrSelector - Optional locale or selector.
 * @returns The transformed dictionary content.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'preact-intlayer';
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
) => {
  const { locale: currentLocale, variant: contextVariant } =
    useContext(IntlayerClientContext) ?? {};

  // Layers the provider's locale and variant under the call-site argument.
  // Selectors disabled project-wide (build-time flag) ⇒ the argument can only
  // be a locale, so the merge is dead code and is dropped by the bundler.
  const argument =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? resolveDictionaryArgument({
          localeOrSelector,
          contextLocale: currentLocale,
          contextVariant,
          dictionaryKey: key as string,
        })
      : (localeOrSelector ?? currentLocale);

  // Stable identity of the resolved argument for memoization — a provider
  // variant is often a fresh object literal on every render, so the dependency
  // has to be its serialization, never its reference.
  const argumentIdentity =
    typeof argument === 'object' && argument !== null
      ? `${argument.locale ?? ''}|${getDictionarySelectorCacheKey(argument)}`
      : argument;

  return useMemo(
    () => getIntlayer<T, A>(key, argument as A),
    [key, argumentIdentity]
  );
};
