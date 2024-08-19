import type { Locales } from '@intlayer/config/client';
import { getLocaleName } from '@intlayer/core';
import { MoveVertical } from 'lucide-react';
import type { ButtonHTMLAttributes, FC } from 'react';
import tw from 'twin.macro';
import { Container } from '../Container';
import { DropDown } from '../DropDown';

const StyledButtonContainer = tw.div`w-full relative p-0.5`;
const StyledButton = tw.button`w-full cursor-pointer rounded-lg py-1 px-3 text-left hover:bg-text/10 dark:hover:bg-text-opposite/10 focus:bg-text-opposite/20 dark:focus:bg-text-opposite/20 focus:outline-none disabled:text-white/25 aria-selected:bg-text/20 dark:aria-selected:bg-text-opposite/20 aria-selected:hover:cursor-default`;

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <StyledButtonContainer>
    <StyledButton data-mode="system" {...props}>
      {children}
    </StyledButton>
  </StyledButtonContainer>
);

type LocaleSwitcherProps = {
  locale?: Locales;
  localeList: Locales[];
  availableLocales?: Locales[];
  fullLocaleName?: boolean;
  setLocale: (locale: Locales) => void;
};

const StyledLocaleSwitcherContainer = tw.div`text-text dark:text-text-dark rounded-xl border border-text dark:border-text-dark transition-colors`;
const StyledTrigger = tw(DropDown.Trigger)`p-0 w-full`;
const StyledTriggerContent = tw.div`flex justify-between items-center`;
const StyledLocaleText = tw.div`px-2 py-1`;
const StyledMoveVertical = tw(MoveVertical)`self-center w-5`;
const StyledPanel = tw(
  DropDown.Panel
)`w-full divide-x divide-y divide-dotted divide-text dark:divide-text-dark z-50`;
const StyledListContainer = tw(Container)`p-1`;

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
    <StyledLocaleSwitcherContainer aria-label="Language switcher">
      <DropDown identifier="local-switcher">
        <StyledTrigger
          identifier="local-switcher"
          aria-label="Language selector"
        >
          {locale && (
            <StyledTriggerContent>
              <StyledLocaleText>{localeName}</StyledLocaleText>
              <StyledMoveVertical />
            </StyledTriggerContent>
          )}
        </StyledTrigger>

        <StyledPanel identifier="local-switcher" isOverable isFocusable>
          <StyledListContainer
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
          </StyledListContainer>
        </StyledPanel>
      </DropDown>
    </StyledLocaleSwitcherContainer>
  );
};
