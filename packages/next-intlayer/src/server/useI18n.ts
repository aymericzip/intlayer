import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useI18n as useI18nBase } from 'react-intlayer/server';
import { resolveAmbientLocale } from './ambientLocale';

/**
 * On the server side, hook returning a `t(path)` function scoped to one
 * dictionary key, in the i18next / next-intl style.
 *
 * If the locale is not provided, it will use the locale from the server
 * context, falling back to the locale carried by the request.
 */
export const useI18n = <T extends DictionaryKeys>(
  namespace: T,
  locale?: LocalesValues
): ReturnType<typeof useI18nBase<T>> =>
  useI18nBase<T>(namespace, resolveAmbientLocale(locale));
