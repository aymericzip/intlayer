import type { LocalesValues } from '@intlayer/types';
import { CachedIntl } from '../utils/intl';

export const getLocaleName = (
  displayLocale: LocalesValues,
  targetLocale: LocalesValues = displayLocale
): string => {
  // new Intl.DisplayNames() is fairly heavy: under the hood every call parses CLDR data and builds a resolver table. In your LocaleSwitcher it’s invoked:
  const displayNames = new CachedIntl.DisplayNames(targetLocale, {
    type: 'language',
  });

  return displayNames.of(displayLocale) ?? 'Unknown locale';
};
