import type { LocalesValues } from '@intlayer/config/client';
import type {
  DictionaryKeys,
  GetSubPath,
  ValidDotPathsFor,
} from '@intlayer/core';
import type { DeepTransformContent } from '../plugins';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { getIntlayer } from '../getIntlayer';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

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
  const localeTarget =
    locale ?? getServerContext<LocalesValues>(IntlayerServerContext);

  // Get the dictionary content for the namespace
  const dictionaryContent = getIntlayer(namespace, localeTarget);

  // Return the translation function
  const t = <P extends ValidDotPathsFor<T>>(
    path: P
  ): GetSubPath<
    DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']>,
    P
  > => {
    if (!path) {
      return dictionaryContent as any;
    }

    const pathArray = (path as string).split('.');
    let current: any = dictionaryContent;

    for (const key of pathArray) {
      current = current?.[key];
      if (current === undefined) {
        // Return the whole dictionary as fallback if path is not found
        return dictionaryContent as any;
      }
    }

    return current;
  };

  return t;
};
