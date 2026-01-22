import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import { type Accessor, createMemo, useContext } from 'solid-js';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Solid hook that picks one dictionary by its key and returns its reactive content.
 *
 * It returns a reactive accessor that updates whenever the locale changes.
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param locale - Optional locale to override the current context locale.
 * @returns A reactive accessor to the dictionary content.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'solid-intlayer';
 *
 * const MyComponent = () => {
 *   const content = useIntlayer('my-dictionary-key');
 *
 *   return <div>{content().myField.value}</div>;
 * };
 * ```
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
): Accessor<DeepTransformContent<DictionaryRegistryContent<T>, L>> => {
  const context = useContext(IntlayerClientContext);

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return createMemo(() => {
    const currentLocale = context?.locale();
    const localeTarget = locale ?? currentLocale;

    return getIntlayer<T, L>(key, localeTarget as L);
  });
};
