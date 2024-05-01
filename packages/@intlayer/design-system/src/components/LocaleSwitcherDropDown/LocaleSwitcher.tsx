'use client';

import type { Locales } from '@intlayer/config/client';
import { getLocaleName } from '@intlayer/core';
import { MoveVertical } from 'lucide-react';
import type { ButtonHTMLAttributes, FC } from 'react';
import tw from 'twin.macro';
import { DropDown } from '../DropDown';

const StyledButtonContainer = tw.div`w-full border-gray-50 p-0.5 relative`;
const StyledButton = tw.button`my-0.5 w-full cursor-pointer rounded-lg p-1 text-left hover:bg-white/10 focus:bg-white/40 focus:outline-none disabled:text-white/25`;

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <StyledButtonContainer>
    <StyledButton data-role="language-switcher" data-mode="system" {...props}>
      {children}
    </StyledButton>
  </StyledButtonContainer>
);

type LocaleSwitcherProps = {
  locale?: Locales;
  localeList: Locales[];
  availableLocales?: Locales[];
  setLocale: (locale: Locales) => void;
};

const StyledLocaleSwitcherContainer = tw.div`rounded border transition-colors`;
const StyledListContainer = tw.div`items-end divide-y divide-dashed p-1`;
const StyledMoveVertical = tw(
  MoveVertical
)`absolute top-1/2 right-2 w-5 h-5 transform -translate-y-1/2`;
const StyledDropDown = tw(
  DropDown
)`bg-gray-300/80 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur rounded`;

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  locale,
  localeList,
  availableLocales,
  setLocale,
}) => {
  return (
    <StyledLocaleSwitcherContainer
      data-role="locale-switcher"
      aria-label="Language switcher"
    >
      <StyledListContainer>
        <DropDown.Trigger identifier="local-switcher">
          {locale && (
            <ButtonItem aria-label="Language selector" aria-selected={true}>
              {locale ? getLocaleName(locale) : 'Select a locale'}
              <StyledMoveVertical />
            </ButtonItem>
          )}
          <StyledDropDown identifier="local-switcher" isOverable isFocusable>
            {localeList
              .filter((lang) => lang !== locale)
              .map((lang) => (
                <ButtonItem
                  key={lang}
                  onClick={() => setLocale(lang)}
                  aria-label={`Switch to ${lang}`}
                  aria-selected={false}
                  disabled={!(availableLocales ?? localeList).includes(lang)}
                >
                  {getLocaleName(lang)}
                </ButtonItem>
              ))}
          </StyledDropDown>
        </DropDown.Trigger>
      </StyledListContainer>
    </StyledLocaleSwitcherContainer>
  );
};
