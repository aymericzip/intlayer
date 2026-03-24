import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';
import type { WithOnChange } from './useDictionary';

/**
 * Get the translated content for the given key and optionally subscribe to
 * locale changes via the chainable `.onChange()` method — mirroring the API
 * of `react-intlayer`'s `useIntlayer`.
 *
 * Unlike React (where the hook system automatically re-runs on re-render),
 * vanilla JS has no component lifecycle. The `.onChange()` callback is the
 * explicit equivalent: it is called with fresh content whenever the active
 * locale changes. Use it to patch your DOM or trigger a full re-render.
 *
 * The function returns the current content **directly** (same shape as
 * `getIntlayer(key)`), plus the `.onChange()` helper:
 *
 * ```ts
 * // React
 * const content = useIntlayer('app');
 *
 * // Vanilla — identical surface API, opt-in reactivity via .onChange()
 * const content = useIntlayer('app');
 * const content = useIntlayer('app').onChange((c) => render(c));
 * ```
 *
 * For cleanup (e.g. Vite HMR), subscribe via `getIntlayerClient().subscribe()`
 * and hold the returned unsubscribe function.
 *
 * @param key    - Dictionary key registered in your intlayer content files.
 * @param locale - Optional locale override (defaults to the current app locale).
 * @returns The current translated content with an `.onChange()` method.
 *
 * @example
 * ```ts
 * import { installIntlayer, useIntlayer } from 'vanilla-intlayer';
 *
 * installIntlayer();
 *
 * // Static read (no subscription)
 * const content = useIntlayer('homepage');
 * document.querySelector('h1').textContent = String(content.title);
 *
 * // Reactive read — onChange is called on every locale change
 * useIntlayer('homepage').onChange((c) => {
 *   document.querySelector('h1').textContent = String(c.title);
 * });
 * ```
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): WithOnChange<DeepTransformContent<DictionaryRegistryContent<T>>> => {
  const client = getIntlayerClient();
  const content = getIntlayer(key, locale ?? client.locale) as WithOnChange<
    DeepTransformContent<DictionaryRegistryContent<T>>
  >;

  content.onChange = (callback) => {
    client.subscribe((newLocale) => {
      callback(getIntlayer(key, (locale ?? newLocale) as typeof locale));
    });
    return content;
  };

  return content;
};
