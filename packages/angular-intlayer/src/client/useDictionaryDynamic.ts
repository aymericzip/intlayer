'use client';

import { computed, inject, type Signal, signal } from '@angular/core';
import {
  createDynamicContentStore,
  type DynamicLoaderMap,
  loadingContentPlaceholder,
  type QualifiedDynamicLoaderMap,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';

/** Content cache shared by every dynamic read of the app. */
const dynamicContentStore = createDynamicContentStore<unknown>(
  (dictionary, argument) => getDictionary(dictionary, argument)
);

/**
 * Lazily loads a dictionary (plain or qualified) and returns its reactive
 * content.
 *
 * The locale, selector, chunk selection and transform are resolved by the
 * shared dynamic content store, so only the chunk(s) the read targets are
 * loaded. The content follows the provider locale and
 * variant, keeping the previous content on screen while the next one loads.
 *
 * If the locale is not provided (directly or through the selector), it will use
 * the locale from the client context.
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
): Signal<DeepTransformContent<T['content']>> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);
  const readContent = dynamicContentStore.createReader(
    dictionaryPromise as DynamicLoaderMap,
    String(key)
  );

  /** Bumped when a load lands, so the content reads the store again. */
  const settledLoadCount = signal(0);
  let latestContent: unknown = loadingContentPlaceholder;

  return computed(() => {
    settledLoadCount();

    // Re-read whenever the provider locale or variant changes. Settles outside
    // the computation, where writing a signal is allowed.
    const settled = readContent(
      {
        localeOrSelector,
        contextLocale: intlayer?.locale(),
        contextVariant: intlayer?.variant?.(),
      },
      () => settledLoadCount.update((count) => count + 1)
    );

    if (settled) latestContent = settled.content;

    return latestContent as DeepTransformContent<T['content']>;
  });
};
