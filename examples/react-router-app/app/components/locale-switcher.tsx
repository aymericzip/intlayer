import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from 'intlayer';
import { useLocale } from 'react-intlayer';
import { useLocation } from 'react-router';

export default function LocaleSwitcher() {
  const { pathname, search } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + search, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label="Select language"
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* Example: Français (French) */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
