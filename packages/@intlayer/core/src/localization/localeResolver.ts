import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';

/**
 * Resolves the most specific locale from a user-provided list,
 * or falls back to the default locale if no match is found.
 */
export const localeResolver = (
  selectedLocale: LocalesValues | LocalesValues[],
  locales: LocalesValues[] = configuration.internationalization.locales,
  defaultLocale: LocalesValues = configuration.internationalization
    .defaultLocale
): LocalesValues => {
  // Ensure we can handle both a single locale or an array of locales uniformly
  const requestedLocales = [selectedLocale].flat();

  // Simple helper to normalize locale strings (e.g. "en-US" => "en-us")
  const normalize = (locale: string): string => locale.trim().toLowerCase();

  try {
    // Check each requested locale in order
    for (const requested of requestedLocales) {
      const normalizedRequested = normalize(requested);

      // 1) Attempt exact match
      const exactMatch = locales.find(
        (loc) => normalize(loc) === normalizedRequested
      );
      if (exactMatch) {
        return exactMatch;
      }

      // 2) Attempt partial match on language subtag
      //    e.g. if requested is "en-US" and not found,
      //    see if "en" is available among locales
      const [requestedLang] = normalizedRequested.split('-');
      const partialMatch = locales.find(
        (loc) => normalize(loc).split('-')[0] === requestedLang
      );
      if (partialMatch) {
        return partialMatch;
      }
    }
  } catch (_error) {
    // If anything unexpected happened, fall back to default
  }

  // If no match was found, return the default
  return defaultLocale;
};
