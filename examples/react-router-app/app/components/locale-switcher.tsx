import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from 'intlayer';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link, useLocation } from 'react-router';

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer('locale-switcher');
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol className="absolute top-10 right-10 divide-y divide-dashed divide-text/20 overflow-y-auto p-1">
      {availableLocales.map((localeEl) => (
        <li className="py-1 pr-1.5" key={localeEl}>
          <Link
            aria-current={localeEl === locale ? 'page' : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeEl)}`}
            onClick={() => setLocale(localeEl)}
            to={getLocalizedUrl(pathWithoutLocale, localeEl)}
          >
            <div className="flex flex-row items-center justify-between gap-3 px-2 py-1">
              <div className="flex flex-col text-nowrap">
                <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
                  {getLocaleName(localeEl)}
                </span>
                <span className="text-neutral text-xs">
                  {getLocaleName(localeEl, localeEl)}
                </span>
              </div>
              <span className="text-nowrap text-neutral text-sm">
                {localeEl.toUpperCase()}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
};
