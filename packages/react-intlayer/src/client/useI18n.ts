'use client';

import type { LocalesValues } from '@intlayer/config/client';
import type { DictionaryKeys } from '@intlayer/core';
import { useChangedContent } from '@intlayer/editor-react';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { useContext } from 'react';
import { getDictionary } from '../getDictionary';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Hook that provides a translation function `t()` for accessing nested content by key.
 * This hook mimics the pattern found in libraries like i18next, next-intl, and vue-i18n.
 *
 * @param namespace - The dictionary key to scope translations to
 * @param locale - Optional locale override. If not provided, uses the current context locale
 * @returns A translation function `t(key)` that returns the translated content for the given key
 *
 * @example
 * ```tsx
 * const t = useI18n('IndexPage');
 * const title = t('title'); // Returns translated string for 'IndexPage.title'
 * const nestedContent = t('section.subtitle'); // Returns 'IndexPage.section.subtitle'
 * ```
 */
export const useI18n = <T extends DictionaryKeys>(
  namespace: T,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const { changedContent } = useChangedContent();
  const localeTarget = locale ?? currentLocale;

  // Get the dictionary content for the namespace
  let dictionaryContent: DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;

  if (changedContent?.[namespace]) {
    // @ts-ignore fix instantiation is excessively deep and possibly infinite
    dictionaryContent = getDictionary(changedContent[namespace], localeTarget);
  } else {
    dictionaryContent = getIntlayer(namespace, localeTarget);
  }

  // Return the translation function
  const t = (path: string): any => {
    if (!path) {
      return dictionaryContent;
    }

    const pathArray = path.split('.');
    let current: any = dictionaryContent;

    for (const key of pathArray) {
      current = current?.[key];
      if (current === undefined) {
        // Return the whole dictionary as fallback if path is not found
        return dictionaryContent;
      }
    }

    return current;
  };

  return t;
};
