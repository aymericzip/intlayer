'use client';

import type { FC, ReactNode } from 'react';

import { css, styled } from 'styled-components';
import tw from 'twin.macro';
import { Button } from '../Button';
import { useNavActions } from './useNavigation';
import type { NavSection } from '.';

type DesktopNavbarProps = {
  logo: ReactNode;
  sections: NavSection[];
  rightItems?: ReactNode;
};

const StyledNav = styled.nav(() => [
  tw`bg-card/80 dark:bg-card-dark/80 sticky top-0 z-50 flex w-screen items-center px-4 py-3 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur`,
  css`
    -webkit-backdrop-filter: var(--tw-backdrop-blur)
      var(--tw-backdrop-brightness) var(--tw-backdrop-contrast)
      var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate)
      var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
      var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  `,
]);
const StyledList = tw.div`ml-[10vw] flex flex-row gap-6 tracking-wide text-neutral dark:text-neutral-dark`;

const StyledRightItemContainer = tw.div`mr-4 flex w-full justify-end items-center gap-2 md:gap-4`;

export const DesktopNavbar: FC<DesktopNavbarProps> = ({
  logo,
  sections,
  rightItems,
}) => {
  const { activeSection, onClickSection } = useNavActions();

  return (
    <StyledNav>
      {logo}
      <StyledList
        role="tablist"
        aria-orientation="horizontal"
        aria-multiselectable="false"
      >
        {sections?.map(({ id, url, label, title, onClick }) => (
          <Button
            key={id}
            role="tab"
            variant="invisible-link"
            color="text"
            aria-selected={activeSection === id}
            label={label}
            onClick={(e) => {
              onClickSection(id, url);
              onClick(e);
            }}
          >
            {title}
          </Button>
        ))}
      </StyledList>
      <StyledRightItemContainer>{rightItems}</StyledRightItemContainer>
    </StyledNav>
  );
};
