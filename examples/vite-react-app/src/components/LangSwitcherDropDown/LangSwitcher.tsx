'use client';

import { getLocaleName, getLocalizedUrl } from 'intlayer';
import type { ButtonHTMLAttributes, FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useLocation, useNavigate } from 'react-router-dom';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <div className="w-full border-gray-50 p-0.5">
    <button
      aria-label="language switcher"
      data-mode="system"
      className="my-1 w-full cursor-pointer rounded-lg p-2 text-left hover:bg-white/10 focus:bg-white/10 focus:outline-hidden disabled:text-white/25"
      {...props}
    >
      {children}
    </button>
  </div>
);

export const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Get the current URL path. Example: /fr/about
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construct the URL with the updated locale
      // Example: /es/about
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Update the URL path
      navigate(pathWithLocale);
    },
  });

  const content = useIntlayer('lang-switcher');

  return (
    <div
      className="rounded border border-[#61dafb] bg-[#5e6678]/40 px-2 py-1 transition-colors hover:border-gray-300"
      aria-label={content.langSwitcherLabel.value}
    >
      <MaxHeightSmoother>
        <div className="separator min-w-[100px] items-end divide-y divide-dashed p-1">
          <h2 className={`mb-3 font-semibold text-xl`}>{content.title} </h2>

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
