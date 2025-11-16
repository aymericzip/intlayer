import { useLocation } from '@tanstack/react-router';
import { getHTMLTextDir, getLocaleName, getPathWithoutLocale } from 'intlayer';
import type { FC } from 'react';
import { setLocaleInStorage, useIntlayer, useLocale } from 'react-intlayer';

import { LocalizedLink, type To } from './localized-link';

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer('locale-switcher');
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol className="absolute top-10 right-10 divide-y divide-dashed divide-text/20 overflow-y-auto p-1">
      {availableLocales.map((localeEl) => (
        <li className="py-1 pr-1.5" key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? 'page' : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeEl)}`}
            onClick={() => setLocaleInStorage(localeEl)}
            params={{ locale: localeEl }}
            to={pathWithoutLocale as To}
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
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
