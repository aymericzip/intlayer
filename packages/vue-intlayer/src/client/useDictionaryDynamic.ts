import {
  createDynamicContentStore,
  type DynamicLoaderMap,
  type DynamicReadContext,
  type QualifiedDynamicLoaderMap,
} from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { type MaybeRefOrGetter, shallowRef, toValue, watch } from 'vue';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { createContentProxy, injectIntlayerProvider } from './useDictionary';

/** Content cache shared by every dynamic read of the app. */
const dynamicContentStore = createDynamicContentStore<unknown>(
  (dictionary, argument) => getDictionary(dictionary, argument)
);

/**
 * Loads a dynamic read and returns the content proxy over it, reloading on
 * every change of the call argument, provider locale or provider variant — the
 * one implementation behind `useDictionaryDynamic` and `useDictionaryAsync`.
 *
 * Resolves once the first content is loaded (Vue awaits it in `<script
 * setup>`); later reloads keep the previous content until the next one lands.
 *
 * @param loaderMap - Plain or qualified dynamic loader map.
 * @param dictionaryKey - Dictionary key (provider variant lookup, cache keys).
 * @param localeOrSelector - Optional reactive locale or selector.
 */
export const useDynamicContent = async (
  loaderMap: DynamicLoaderMap,
  dictionaryKey: string,
  localeOrSelector?: MaybeRefOrGetter<
    LocalesValues | DictionarySelector | null | undefined
  >
): Promise<any> => {
  const intlayer = injectIntlayerProvider();
  const readContent = dynamicContentStore.createReader(
    loaderMap,
    dictionaryKey
  );

  const source = shallowRef<unknown>({});

  // Resolves with whichever read lands first, so a context change during the
  // first load cannot leave the setup waiting on a superseded read.
  let hasContent = false;
  let resolveFirstContent: () => void = () => {};
  let rejectFirstContent: (error: unknown) => void = () => {};
  const firstContent = new Promise<void>((resolve, reject) => {
    resolveFirstContent = resolve;
    rejectFirstContent = reject;
  });

  const applyContent = (content: unknown): void => {
    source.value = content;
    hasContent = true;
    resolveFirstContent();
  };

  const readForContext = (context: DynamicReadContext): void => {
    const settled = readContent(context, applyContent, (error) => {
      if (hasContent) throw error;

      rejectFirstContent(error);
    });

    if (settled) applyContent(settled.content);
  };

  const getContext = (): DynamicReadContext => ({
    localeOrSelector: toValue(localeOrSelector),
    contextLocale: toValue(intlayer?.locale),
    contextVariant: toValue(intlayer?.variant),
  });

  // Registered before the first await, while the component instance is current
  watch(getContext, readForContext);
  readForContext(getContext());

  await firstContent;

  return createContentProxy(source);
};

/**
 * Vue composable that lazily loads a dictionary (plain or qualified) and
 * returns its reactive content.
 *
 * The locale, selector, chunk selection and transform are resolved by the
 * shared `resolveDictionaryRead` / dynamic content store, so only the chunk(s)
 * the read targets are loaded.
 *
 * @param dictionaryPromise - Locale-keyed loader map, or a qualified loader map.
 * @param key - The dictionary key.
 * @param localeOrSelector - Optional reactive locale or selector.
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
  localeOrSelector?: MaybeRefOrGetter<A | null | undefined>
): Promise<DeepTransformContent<T['content']>> =>
  useDynamicContent(
    dictionaryPromise as DynamicLoaderMap,
    String(key),
    localeOrSelector as MaybeRefOrGetter<
      LocalesValues | DictionarySelector | null | undefined
    >
  );
