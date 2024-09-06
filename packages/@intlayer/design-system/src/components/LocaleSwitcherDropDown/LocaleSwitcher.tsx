import type { Locales } from '@intlayer/config/client';
import { getLocaleName } from '@intlayer/core';
import { MoveVertical } from 'lucide-react';
import type { ButtonHTMLAttributes, FC } from 'react';
import { Container } from '../Container';
import { DropDown } from '../DropDown';

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <div className="relative w-full p-0.5">
    <button
      className="hover:bg-text/10 dark:hover:bg-text-opposite/10 focus:bg-text-opposite/20 dark:focus:bg-text-opposite/20 aria-selected:bg-text/20 dark:aria-selected:bg-text-opposite/20 w-full cursor-pointer rounded-lg px-3 py-1 text-left focus:outline-none disabled:text-white/25 aria-selected:hover:cursor-default"
      data-mode="system"
      {...props}
    >
      {children}
    </button>
  </div>
);

type LocaleSwitcherProps = {
  locale?: Locales;
  localeList: Locales[];
  availableLocales?: Locales[];
  fullLocaleName?: boolean;
  setLocale: (locale: Locales) => void;
};

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  locale,
  localeList,
  availableLocales,
  fullLocaleName = true,
  setLocale,
}) => {
  let localeName = 'Select a locale';

  if (locale) {
    localeName = fullLocaleName ? getLocaleName(locale) : locale.toUpperCase();
  }

  return (
    <div
      className="text-text dark:text-text-dark border-text dark:border-text-dark rounded-xl border transition-colors"
      aria-label="Language switcher"
    >
      <DropDown identifier="local-switcher">
        <DropDown.Trigger
          className="w-full p-0"
          identifier="local-switcher"
          aria-label="Language selector"
        >
          {locale && (
            <div className="flex items-center justify-between">
              <div className="px-2 py-1">{localeName}</div>
              <MoveVertical className="w-5 self-center" />
            </div>
          )}
        </DropDown.Trigger>

        <DropDown.Panel
          className="divide-text dark:divide-text-dark z-50 w-full divide-x divide-y divide-dotted"
          identifier="local-switcher"
          isOverable
          isFocusable
        >
          <Container
            className="p-1"
            separator="y"
            role="listbox"
            aria-label="Language list"
          >
            {localeList.map((lang) => (
              <ButtonItem
                key={lang}
                onClick={() => setLocale(lang)}
                aria-label={`Switch to ${lang}`}
                disabled={!(availableLocales ?? localeList).includes(lang)}
                role="option"
                aria-selected={locale === lang}
                lang={lang}
              >
                {getLocaleName(lang)}
              </ButtonItem>
            ))}
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
