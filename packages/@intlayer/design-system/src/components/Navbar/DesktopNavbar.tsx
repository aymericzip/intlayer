'use client';

import type { FC, ReactNode } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';
import { Button } from '../Button';
import { useNavActions } from './useNavigation';
import type { NavSection } from '.';

type DesktopNavbarProps = {
  logo: ReactNode;
  sections: NavSection[];
  rightItems?: ReactNode;
};

const StyledNav = tw.nav`bg-card/80 sticky top-0 z-50 flex w-screen items-center px-4 py-3 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur`;
const StyledList = tw.div`ml-[10vw] flex flex-row gap-6 tracking-wide text-neutral-800`;
const StyledListItem = styled(Button)`
  ${tw`hover:text-primary`}
`;
const StyledRightItemContainer = tw.div`mr-4 flex w-full justify-end gap-2`;

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
          <StyledListItem
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
          </StyledListItem>
        ))}
      </StyledList>
      <StyledRightItemContainer>{rightItems}</StyledRightItemContainer>
    </StyledNav>
  );
};
