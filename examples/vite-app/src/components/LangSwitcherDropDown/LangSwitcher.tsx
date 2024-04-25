'use client';

import { getLocaleName } from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import type { ButtonHTMLAttributes, FC } from 'react';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <div className="w-full border-gray-50 p-0.5 ">
    <button
      data-role="language-switcher"
      data-mode="system"
      className="my-1 w-full cursor-pointer rounded-lg p-2 text-left hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:text-white/25"
      {...props}
    >
      {children}
    </button>
  </div>
);

export const LocaleSwitcher: FC = () => {
  const { locale, localeList, availableLocales, setLocale } = useLocale();
  const content = useIntlayer('lang-switcher');

  return (
    <div
      className="rounded border border-[#61dafb] bg-[#5e6678]/40 px-2 py-1 transition-colors hover:border-gray-300"
      data-role="dark-mode-switcher"
      aria-label={content.langSwitcherLabel}
    >
      <MaxHeightSmoother>
        <div className="separator min-w-[100px] items-end divide-y divide-dashed p-1">
          <h2 className={`mb-3 text-xl font-semibold`}>{content.title} </h2>

          {localeList.map((lang) => (
            <ButtonItem
              key={lang}
              onClick={() => setLocale(lang)}
              aria-label={`${content.langButtonLabel} ${lang}`}
              aria-selected={lang === locale}
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
