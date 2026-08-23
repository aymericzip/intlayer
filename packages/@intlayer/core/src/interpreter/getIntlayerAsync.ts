import type { DictionarySelector } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  Plugins,
} from './getContent';
import { getIntlayer } from './getIntlayer';

/**
 * Picks one dictionary by its key and resolves its content for the given
 * locale or selector, loading that locale alone.
 *
 * Async counterpart of {@link getIntlayer}, meant for the places a dictionary
 * is read outside of rendering — route `head` / metadata builders, loaders,
 * server functions. Where `getIntlayer` pulls in the merged dictionary holding
 * every locale, the build plugins (`@intlayer/babel`, `@intlayer/swc`) rewrite
 * this call into `getDictionaryAsync(loaderMap, key, locale)`, pointing it at
 * the per-locale chunks in `.intlayer/dynamic_dictionaries/`, so the bundle
 * only ever carries the locale actually requested.
 *
 * Without those plugins — an unoptimized build — the call resolves through the
 * synchronous dictionary registry instead: the same content, without the
 * per-locale split.
 *
 * The second argument is either a locale (`'fr'`) or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `{ variant: { id: 'prod_abc', userId: '123' } }` — structured variant
 * - `locale` can be combined with any selector: `{ item: 2, locale: 'fr' }`
 *
 * @example
 * ```ts
 * const { title } = await getIntlayerAsync('home-metadata', locale);
 * ```
 */
export const getIntlayerAsync = async <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
> => getIntlayer<T, A>(key, localeOrSelector, plugins);
