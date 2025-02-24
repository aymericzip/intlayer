'use client';

import { getLocaleName } from 'intlayer';
import type { ButtonHTMLAttributes, FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <div className="w-full border-gray-50 p-0.5">
    <button
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
  const content = useIntlayer('lang-switcher');

  return (
    <div
      className="rounded border border-[#61dafb] bg-[#5e6678]/40 px-2 py-1 transition-colors hover:border-gray-300"
      aria-label={content.langSwitcherLabel.value}
    >
      <MaxHeightSmoother>
        <div className="separator min-w-[100px] items-end divide-y divide-dashed p-1">
          <h2 className={`mb-3 text-xl font-semibold`}>{content.title} </h2>

          {localeList.map((lang) => (
            <ButtonItem
              key={lang}
              onClick={() => setLocale(lang)}
              aria-label={`${content.langButtonLabel} ${lang}`}
              disabled={!availableLocales?.includes(lang)}
            >
              {getLocaleName(lang)}
            </ButtonItem>
          ))}
        </div>
      </MaxHeightSmoother>
    </div>
  );
};
