import type { LocalesValues } from '@intlayer/config/client';
import { Intl } from '../utils/intl';

export const getLocaleName = (
  displayLocale: LocalesValues,
  targetLocale: LocalesValues = displayLocale
): string => {
  // new Intl.DisplayNames() is fairly heavy: under the hood every call parses CLDR data and builds a resolver table. In your LocaleSwitcher it’s invoked:
  let displayNames = new Intl.DisplayNames(targetLocale, {
    type: 'language',
  });

  return displayNames.of(displayLocale) ?? 'Unknown locale';
};
