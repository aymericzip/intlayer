/**
 * Locales the content views display: the stored selection restricted to the
 * available locales, never empty. Falls back to the valid default locales,
 * then the interface locale, then the first available locale.
 *
 * While `availableLocales` is still empty (configuration loading), the stored
 * selection is kept as is.
 */
export const resolveSelectedLocales = <Locale extends string>(
  storedLocales: readonly Locale[] | null | undefined,
  availableLocales: readonly Locale[],
  defaultLocales: readonly Locale[] = [],
  interfaceLocale?: Locale
): Locale[] => {
  const isAvailable = (locale: Locale) =>
    availableLocales.length === 0 || availableLocales.includes(locale);

  const validStoredLocales = (storedLocales ?? []).filter(isAvailable);
  if (validStoredLocales.length > 0) return validStoredLocales;

  const validDefaultLocales = defaultLocales.filter(isAvailable);
  if (validDefaultLocales.length > 0) return validDefaultLocales;

  if (interfaceLocale && isAvailable(interfaceLocale)) return [interfaceLocale];

  return availableLocales.slice(0, 1);
};
