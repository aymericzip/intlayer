'use client';

import { getLocaleName } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { ButtonHTMLAttributes, FC } from 'react';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <div className="w-full border-gray-50 p-0.5">
    <button
      aria-label="language switcher"
      data-mode="system"
      className="focus:outline-hidden my-1 w-full cursor-pointer rounded-lg p-2 text-left hover:bg-white/10 focus:bg-white/10 disabled:text-white/25"
      {...props}
    >
      {children}
    </button>
  </div>
);

export const LocaleSwitcher: FC = () => {
  const { localeList, availableLocales, setLocale } = useLocale();
  const { langButtonLabel, langSwitcherLabel, title } =
    useIntlayer('lang-switcher');

  return (
    <div
      className="rounded border px-2 py-1 transition-colors hover:border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/40 hover:dark:bg-neutral-900/95"
      aria-label={langSwitcherLabel.value}
    >
      <MaxHeightSmoother>
        <div className="separator min-w-[100px] items-end divide-y divide-dashed p-1">
          <h2 className={`mb-3 text-xl font-semibold`}>{title} </h2>

          {localeList.map((lang) => (
            <ButtonItem
              key={lang}
              onClick={() => setLocale(lang)}
              aria-label={`${langButtonLabel.value} ${lang}`}
              disabled={!availableLocales.includes(lang)}
            >
              {getLocaleName(lang)}
            </ButtonItem>
          ))}
        </div>
      </MaxHeightSmoother>
    </div>
  );
};
