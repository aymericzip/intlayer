import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';

export type WithOnChange<T> = T & {
  /**
   * Subscribe to locale changes. The callback receives the fresh content
   * whenever the active locale changes. Returns the content object itself
   * for convenient one-liner patterns:
   *
   * ```ts
   * const content = useDictionary(myDict).onChange((c) => {
   *   document.querySelector('p')!.textContent = String(c.greeting);
   * });
   * ```
   */
  onChange: (
    callback: <T extends Dictionary, L extends LocalesValues>(
      content: DeepTransformContent<T['content'], L>
    ) => void
  ) => WithOnChange<T>;
};

/**
 * Get the translated content for a raw dictionary object and optionally
 * subscribe to locale changes via the chainable `.onChange()` method —
 * mirroring the API of `react-intlayer`.
 *
 * Unlike `useIntlayer` (which takes a registered key), this function accepts a
 * dictionary object directly — useful for dictionaries loaded asynchronously
 * or defined inline.
 *
 * The function returns the current content **directly** (same shape as
 * `getDictionary(dict)`), plus the `.onChange()` helper:
 *
 * ```ts
 * // React
 * const content = useDictionary(myDict);
 *
 * // Vanilla — identical surface API, opt-in reactivity via .onChange()
 * const content = useDictionary(myDict);
 * const content = useDictionary(myDict).onChange((c) => render(c));
 * ```
 *
 * @param dictionary - The raw dictionary object.
 * @param locale     - Optional locale override.
 * @returns The current translated content with an `.onChange()` method.
 *
 * @example
 * ```ts
 * import myDict from './myDictionary.content';
 * import { installIntlayer, useDictionary } from 'vanilla-intlayer';
 *
 * installIntlayer();
 *
 * const content = useDictionary(myDict).onChange((c) => {
 *   document.querySelector('p').textContent = String(c.greeting);
 * });
 *
 * document.querySelector('p').textContent = String(content.greeting);
 * ```
 */
export const useDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
): WithOnChange<DeepTransformContent<T['content'], L>> => {
  const client = getIntlayerClient();
  const content = getDictionary(
    dictionary,
    (locale ?? client.locale) as L
  ) as WithOnChange<DeepTransformContent<T['content'], L>>;

  content.onChange = (
    callback: (content: DeepTransformContent<T['content'], L>) => void
  ) => {
    client.subscribe((newLocale) => {
      callback(getDictionary(dictionary, (locale ?? newLocale) as L));
    });
    return content;
  };

  return content;
};
