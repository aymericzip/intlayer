import { internationalization } from '@intlayer/config/built';
import {
  getDictionarySelectorCacheKey,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDynamicContentAsync,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import {
  createMemo,
  createRenderEffect,
  createResource,
  useContext,
} from 'solid-js';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

type DynamicDictionarySource = {
  cacheKey: string;
  locale: LocalesValues;
};

/**
 * On the client side, Hook that lazily loads a dictionary and returns its
 * reactive content.
 *
 * The dictionary entry is either a plain dynamic loader map
 * (`locale → loader`) or a qualified one (collection / variant / meta record,
 * possibly combined). For a qualified map, only the chunk(s) the selector
 * targets are loaded; the resolution mirrors static mode.
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the locale from the client context.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = LocalesValues,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};
  const defaultLocale = internationalization.defaultLocale;
  const dictionaryKey = String(key);

  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryPromise)
  ) {
    const { locale: selectorLocale, selector } =
      parseDictionarySelector<LocalesValues>(localeOrSelector);
    const selectorCacheKey = getDictionarySelectorCacheKey(selector);
    const qualifierTypes = dictionaryPromise[QUALIFIER_DYNAMIC_TYPES_KEY];

    // The `item` axis is the only one that can expand into several entries; when
    // it is declared but not selected, the result is a collection (array).
    const isCollection =
      qualifierTypes.includes('item') && selector?.item === undefined;

    const localeAccessor = () =>
      selectorLocale ?? currentLocale?.() ?? defaultLocale;

    if (!isCollection) {
      // Single entry (variant / meta record / selected item). Reuse the plain
      // dynamic path so pending-safety, owner-scoped interpretation and every
      // node type (markdown / html / nested) behave exactly like a normal
      // dictionary.
      const dictionarySourceAccessor = (): DynamicDictionarySource => {
        const localeTarget = localeAccessor();

        return {
          cacheKey: `${dictionaryKey}.${localeTarget}.${selectorCacheKey}`,
          locale: localeTarget,
        };
      };

      const loadEntry = ({ locale: localeTarget }: DynamicDictionarySource) =>
        resolveQualifiedDynamicContentAsync<Dictionary>({
          loaderMap: dictionaryPromise,
          key: dictionaryKey,
          locale: localeTarget,
          selector,
          transform: (dictionary) => dictionary,
        }).then(
          (resolved) =>
            (Array.isArray(resolved) ? resolved[0] : resolved) as Dictionary
        );

      const dictionary = useLoadDynamic<Dictionary, DynamicDictionarySource>(
        dictionarySourceAccessor,
        loadEntry
      );

      // Pass the explicit selector locale (or `undefined` to follow the client
      // context), mirroring the plain path so interpretation and the loaded
      // chunk stay on the same locale.
      return useDictionary(dictionary, selectorLocale) as DeepTransformContent<
        T['content']
      >;
    }

    // Collection: load only the targeted raw entries, then interpret each inside
    // the component owner scope so a real array is exposed (so `<For>` works) and
    // owner-scoped context (router, markdown, editor) stays available.
    const [resolvedEntries] = createResource(localeAccessor, (localeTarget) =>
      resolveQualifiedDynamicContentAsync<Dictionary>({
        loaderMap: dictionaryPromise,
        key: dictionaryKey,
        locale: localeTarget,
        selector,
        transform: (dictionary) => dictionary,
      })
    );

    const accessor = createMemo(() => {
      const resolved = resolvedEntries();
      const localeTarget = localeAccessor();

      if (!Array.isArray(resolved)) return [];

      return resolved.map((dictionary) =>
        getDictionary(dictionary, localeTarget)
      );
    });

    // Read the resource in a render effect so Suspense triggers without aborting
    // the component body before the proxy below is consumed.
    createRenderEffect(() => {
      resolvedEntries();
    });

    return new Proxy(accessor, {
      get(target, prop) {
        const content = target();
        return content?.[prop as keyof typeof content];
      },
      apply(target) {
        return target();
      },
    }) as DeepTransformContent<T['content']>;
  }

  const dictionaryLoaders = dictionaryPromise as Partial<
    Record<LocalesValues, () => Promise<T>>
  >;
  const locale = localeOrSelector as LocalesValues | undefined;
  const localeAccessor = () => locale ?? currentLocale?.() ?? defaultLocale;
  const dictionarySourceAccessor = (): DynamicDictionarySource => {
    const localeTarget = localeAccessor();

    return {
      cacheKey: `${dictionaryKey}.${localeTarget}`,
      locale: localeTarget,
    };
  };
  const loadDictionary = ({
    locale: localeTarget,
  }: DynamicDictionarySource) => {
    const dictionaryLoader = dictionaryLoaders[localeTarget];

    if (!dictionaryLoader) {
      return Promise.reject(
        new Error(
          `No dynamic dictionary loader found for key "${dictionaryKey}" and locale "${localeTarget}".`
        )
      );
    }

    return dictionaryLoader();
  };

  const dictionary = useLoadDynamic<T, DynamicDictionarySource>(
    dictionarySourceAccessor,
    loadDictionary
  );

  // Keep locale resolution inside useDictionary so the interpreted content
  // follows the same reactive context as static Solid dictionaries.
  return useDictionary(dictionary, locale);
};
