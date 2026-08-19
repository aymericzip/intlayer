import { internationalization } from '@intlayer/config/built';
import {
  getDictionarySelectorCacheKey,
  getPreloadedDictionary,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
  resolveDictionaryArgument,
  resolveQualifiedDynamicContentAsync,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
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
import { IntlayerClientContext, type IntlayerValue } from './IntlayerProvider';
import { useDictionary } from './useDictionary';
import { seedDynamicValue, useLoadDynamic } from './useLoadDynamic';

type DynamicDictionarySource = {
  cacheKey: string;
  locale: LocalesValues;
};

/**
 * On the client side, Hook that lazily loads a dictionary and returns its
 * reactive content.
 *
 * The dictionary entry is either a plain dynamic loader map
 * (`locale → loader`) or a qualified one (collection / variant,
 * possibly combined). For a qualified map, only the chunk(s) the selector
 * targets are loaded; the resolution mirrors static mode.
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the locale from the client context.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = DeclaredLocales,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
) => {
  // Reads outside a provider fall back to an empty context.
  const context: Partial<IntlayerValue> =
    useContext(IntlayerClientContext) ?? {};
  const { locale: currentLocale } = context;
  const defaultLocale = internationalization.defaultLocale;
  const dictionaryKey = String(key);

  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryPromise)
  ) {
    const { locale: selectorLocale, selector: callSelector } =
      parseDictionarySelector<LocalesValues>(localeOrSelector);

    // Layers the provider's ambient variant under the call-site argument. Kept
    // as an accessor — not resolved once — so a variant or locale change
    // re-runs the sources and resources below.
    const selectorAccessor = () =>
      parseDictionarySelector<LocalesValues>(
        resolveDictionaryArgument({
          localeOrSelector,
          contextLocale: currentLocale?.(),
          contextVariant: context.variant?.(),
          dictionaryKey,
        })
      ).selector;

    const qualifierTypes = dictionaryPromise[QUALIFIER_DYNAMIC_TYPES_KEY];

    // The `item` axis is the only one that can expand into several entries; when
    // it is declared but not selected, the result is a collection (array). Only
    // the call site can pin an item, so this stays a one-off check.
    const isCollection =
      qualifierTypes.includes('item') && callSelector?.item === undefined;

    const localeAccessor = () =>
      selectorLocale ?? currentLocale?.() ?? defaultLocale;

    if (!isCollection) {
      // Single entry (variant / selected item). Reuse the plain
      // dynamic path so pending-safety, owner-scoped interpretation and every
      // node type (markdown / html / nested) behave exactly like a normal
      // dictionary.
      const dictionarySourceAccessor = (): DynamicDictionarySource => {
        const localeTarget = localeAccessor();

        return {
          cacheKey: `${dictionaryKey}.${localeTarget}.${getDictionarySelectorCacheKey(
            selectorAccessor()
          )}`,
          locale: localeTarget,
        };
      };

      const loadEntry = ({ locale: localeTarget }: DynamicDictionarySource) =>
        resolveQualifiedDynamicContentAsync<Dictionary>({
          loaderMap: dictionaryPromise,
          key: dictionaryKey,
          locale: localeTarget,
          selector: selectorAccessor(),
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
      return useDictionary(
        dictionary,
        selectorLocale as DeclaredLocales
      ) as DeepTransformContent<T['content']>;
    }

    // Collection: load only the targeted raw entries, then interpret each inside
    // the component owner scope so a real array is exposed (so `<For>` works) and
    // owner-scoped context (router, markdown, editor) stays available.
    const [resolvedEntries] = createResource(
      // Tracks the variant as well as the locale, so an ambient variant change
      // reloads the targeted chunks.
      () => ({ locale: localeAccessor(), selector: selectorAccessor() }),
      ({ locale: localeTarget, selector }) =>
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

  // A build-tool plugin may have started this locale's chunk while the entry
  // point evaluated, and it may already have landed. Seeding the resource cache with it makes the resource
  // below resolve synchronously, so Suspense never sees a pending state.
  const preloadedDictionary = getPreloadedDictionary(
    dictionaryLoaders,
    localeAccessor()
  );

  if (preloadedDictionary) {
    seedDynamicValue(dictionarySourceAccessor(), preloadedDictionary);
  }

  const dictionary = useLoadDynamic<T, DynamicDictionarySource>(
    dictionarySourceAccessor,
    loadDictionary
  );

  // Keep locale resolution inside useDictionary so the interpreted content
  // follows the same reactive context as static Solid dictionaries.
  return useDictionary(dictionary, locale);
};
