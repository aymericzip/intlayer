import { useLocation } from '@tanstack/react-router';
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer('locale-switcher');

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
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
