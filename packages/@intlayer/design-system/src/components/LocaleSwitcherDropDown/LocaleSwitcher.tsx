'use client';

import type { Locales } from '@intlayer/config/client';
import { getLocaleName } from '@intlayer/core';
import { MoveVertical } from 'lucide-react';
import type { ButtonHTMLAttributes, FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { Container } from '../Container';
import { DropDown } from '../DropDown';

const StyledButtonContainer = tw.div`w-full relative p-0.5`;
const StyledButton = tw.button`w-full cursor-pointer rounded-lg p-1 text-left hover:bg-text/10 dark:hover:bg-text-opposite/10 focus:bg-text-opposite/20 dark:focus:bg-text-opposite/20 focus:outline-none disabled:text-white/25`;

const ButtonItem: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <StyledButtonContainer>
    <StyledButton
      data-role="language-switcher-item"
      data-mode="system"
      {...props}
    >
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

const StyledLocaleSwitcherContainer = tw.div`text-text dark:text-text-dark rounded border border-text dark:border-text-dark transition-colors`;
const StyledTrigger = styled(DropDown.Trigger)`p-0`;
const StyledTriggerContent = tw.div`flex justify-between items-center`;
const StyledLocaleText = tw.div`px-2 py-1`;
const StyledMoveVertical = tw(MoveVertical)`self-center w-5`;
const StyledDropDown = tw(
  DropDown
)`w-full divide-x divide-y divide-dotted divide-text dark:divide-text-dark`;
const StyledListContainer = tw(Container)``;

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
      <StyledTrigger
        identifier="local-switcher"
        aria-label="Language selector"
        aria-selected={true}
      >
        {locale && (
          <StyledTriggerContent>
            <StyledLocaleText>
              {locale ? getLocaleName(locale) : 'Select a locale'}
            </StyledLocaleText>
            <StyledMoveVertical />
          </StyledTriggerContent>
        )}
        <StyledDropDown identifier="local-switcher" isOverable isFocusable>
          <StyledListContainer separator="y">
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
          </StyledListContainer>
        </StyledDropDown>
      </StyledTrigger>
    </StyledLocaleSwitcherContainer>
  );
};
