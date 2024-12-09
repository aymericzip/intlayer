'use client';

import { getLocaleName, getLocalizedUrl, Locales } from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import type { ButtonHTMLAttributes, FC } from 'react';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { useLocation, useNavigate } from 'react-router-dom';

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <div className="w-full border-gray-50 p-0.5">
    <button
      aria-label="language switcher"
      data-mode="system"
      className="my-1 w-full cursor-pointer rounded-lg p-2 text-left hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:text-white/25"
      {...props}
    >
      {children}
    </button>
  </div>
);

export const LocaleSwitcher: FC = () => {
  const location = useLocation(); // Get the current URL path. Example: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construct the URL with the updated locale
    // Example: /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Update the URL path
    navigate(pathWithLocale);
  };

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  const content = useIntlayer('lang-switcher');

  return (
    <div
      className="rounded border border-[#61dafb] bg-[#5e6678]/40 px-2 py-1 transition-colors hover:border-gray-300"
      aria-label={content.langSwitcherLabel.value}
    >
      <MaxHeightSmoother>
        <div className="separator min-w-[100px] items-end divide-y divide-dashed p-1">
          <h2 className={`mb-3 text-xl font-semibold`}>{content.title} </h2>

          {availableLocales.map((lang) => (
            <ButtonItem
              key={lang}
              onClick={() => setLocale(lang)}
              aria-label={`${content.langButtonLabel} ${lang}`}
              disabled={!(availableLocales ?? []).includes(lang)}
            >
              {getLocaleName(lang)}
            </ButtonItem>
          ))}
        </div>
      </MaxHeightSmoother>
    </div>
  );
};
