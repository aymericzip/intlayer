import configuration from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Resolves the most specific locale from a user-provided list,
 * or falls back to the default locale if no match is found.
 */
export const localeResolver = (
  selectedLocale: LocalesValues | LocalesValues[],
  locales: LocalesValues[] = configuration?.internationalization?.locales,
  defaultLocale: LocalesValues = configuration?.internationalization
    ?.defaultLocale
): Locale => {
  // Ensure we can handle both a single locale or an array of locales uniformly
  const requestedLocales = [selectedLocale].flat();

  // Simple helper to normalize locale strings (e.g. "en-US" => "en-us")
  const normalize = (locale: string): string => locale.trim().toLowerCase();

  try {
    // Check each requested locale in order
    for (const requested of requestedLocales) {
      const normalizedRequested = normalize(requested);

      // Attempt exact match
      const exactMatch = locales.find(
        (locale) => normalize(locale) === normalizedRequested
      );
      if (exactMatch) {
        return exactMatch as Locale;
      }

      // Attempt partial match on language subtag
      // e.g. if requested is "en-US" and not found,
      // see if "en" is available among locales
      const [requestedLang] = normalizedRequested.split('-');
      const partialMatch = locales.find(
        (locale) => normalize(locale).split('-')[0] === requestedLang
      );
      if (partialMatch) {
        return partialMatch as Locale;
      }
    }
  } catch {
    // If anything unexpected happened, fall back to default
  }

  // If no match was found, return the default
  return defaultLocale as Locale;
};
