import type { Locales } from '@intlayer/config/client';
import { getLocaleName } from '@intlayer/core';
import { MoveVertical } from 'lucide-react';
import type { FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../Button';
import { Container } from '../Container';
import { DropDown } from '../DropDown';
import localeSwitcherContent from './localeSwitcher.content';

export type LocaleSwitcherProps = {
  locale?: Locales;
  localeList: Locales[];
  availableLocales?: Locales[];
  fullLocaleName?: boolean;
  setLocale: (locale: Locales) => void;
};

const DROPDOWN_IDENTIFIER = 'locale-switcher';

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  locale,
  localeList,
  availableLocales,
  fullLocaleName = true,
  setLocale,
}) => {
  let localeName = 'Select a locale';
  const { switchTo } = useDictionary(localeSwitcherContent);

  if (locale) {
    localeName = fullLocaleName ? getLocaleName(locale) : locale.toUpperCase();
  }

  return (
    <div
      className="border-text text-text dark:border-text-dark dark:text-text-dark rounded-xl border transition-colors"
      aria-label="Language switcher"
    >
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger
          identifier={DROPDOWN_IDENTIFIER}
          aria-label="Language selector"
        >
          <div className="flex w-full items-center justify-between">
            <div className="text-nowrap px-2">{localeName}</div>
            <MoveVertical className="w-5 self-center" />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel identifier={DROPDOWN_IDENTIFIER} isOverable isFocusable>
          <Container
            className="min-w-28 p-1"
            separator="y"
            role="listbox"
            aria-label="Language list"
          >
            {localeList.map((lang) => (
              <div key={lang} className="p-0.5">
                <Button
                  onClick={() => setLocale(lang)}
                  label={`${switchTo} ${lang}`}
                  disabled={!(availableLocales ?? localeList).includes(lang)}
                  role="option"
                  isActive={locale === lang}
                  className="text-nowrap"
                  variant="hoverable"
                  color="text"
                  isFullWidth
                  textAlign="left"
                  lang={lang}
                >
                  {getLocaleName(lang)}
                </Button>
              </div>
            ))}
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
