import type { LocalesValues } from '@intlayer/config/client';

export const getLocaleName = (
  displayLocale: LocalesValues,
  targetLocale: LocalesValues = displayLocale
): string => {
  // Native path (modern browsers & Node 18+)
  if (typeof Intl?.DisplayNames === 'function') {
    try {
      const displayNames = new Intl.DisplayNames([targetLocale], {
        type: 'language',
      });
      return displayNames.of(displayLocale) ?? 'Unknown locale';
    } catch {
      return displayLocale;
    }
  }

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    console.warn(
      `getLocaleName: Intl.DisplayNames is not supported in this browser. Using displayLocale: ${displayLocale}`
    );
  }

  return displayLocale;
};
