'use client';

import { motion, type Variants } from 'framer-motion';
import { useRef, useState, type FC, type ReactNode } from 'react';
import { css, styled } from 'styled-components';
import tw from 'twin.macro';
import { useScrollBlockage, useScrollDetection } from '../../hooks';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { Burger } from './Burger';
import { useNavActions } from './useNavigation';
import type { NavSection } from '.';

type MobileNavbarProps = {
  logo: ReactNode;
  topChildren?: ReactNode;
  topSections?: NavSection[];
  bottomSections?: NavSection[];
  rightItems?: ReactNode;
};

type SectionListProps = {
  sections: NavSection[];
  activeSection: string | null;
  onClickSection: (id: string, url?: string) => void;
};

const sectionListItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const StyledSection = styled(motion.div)`
  ${tw`hover:text-primary aria-selected:text-primary w-full cursor-pointer p-3 text-center transition`}
`;

const SectionList: FC<SectionListProps> = ({
  sections,
  activeSection,
  onClickSection,
}) => (
  <div role="tablist" aria-orientation="vertical" aria-multiselectable="false">
    {sections?.map(({ id, label, url, title, onClick }) => (
      <StyledSection
        role="tab"
        key={id}
        id={id}
        aria-label={label}
        onClick={(e) => {
          onClickSection(id, url);
          onClick?.(e);
        }}
        variants={sectionListItemVariants}
        aria-selected={activeSection === id}
      >
        {title}
      </StyledSection>
    ))}
  </div>
);

const bgStyle = [
  tw`bg-card/95 dark:bg-card-dark/95 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur`,
  css`
    -webkit-backdrop-filter: var(--tw-backdrop-blur)
      var(--tw-backdrop-brightness) var(--tw-backdrop-contrast)
      var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate)
      var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
      var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  `,
];
const StyledNav = styled.nav<{ $isHidden: boolean }>(({ $isHidden }) => [
  ...bgStyle,
  tw`relative sticky top-0 z-50 flex w-screen flex-col  transition`,
  $isHidden ? tw`-translate-y-full` : tw`translate-y-0`,
]);
const StyledHeaderContainer = tw.div`flex w-full items-center justify-between gap-[10vw] px-4 py-3`;
const StyledRightItemContainer = tw.div`flex w-full items-center justify-end gap-6`;
const StyledRightCustomItemContainer = tw.div`flex w-full items-center justify-end gap-1`;
const StyledFullScreenPanel = styled.div(() => [
  ...bgStyle,
  tw`absolute bottom-0 left-0 w-full translate-y-full`,
]);
const StyledFullScreenPanelContent = styled(motion.div)(
  () =>
    tw`flex w-full flex-col pb-[20%] pt-10 text-lg tracking-wide text-text dark:text-text-dark`
);
const StyledSectionContainer = tw.div`flex h-full flex-col justify-between`;

export const MobileNavbar: FC<MobileNavbarProps> = ({
  logo,
  topChildren,
  topSections = [],
  bottomSections = [],
  rightItems,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isUnrolled, setIsUnrolled] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);

  const { activeSection, onClickSection } = useNavActions();
  useScrollBlockage({
    disableScroll: isUnrolled,
    key: 'mobile_nav',
  });

  useScrollDetection({
    onScrollUp: () => setIsHidden(false),
    onScrollDown: () => setIsHidden(true),
    isEnabled: !isUnrolled,
  });

  const backDivHeight = !isHidden ? navRef.current?.clientHeight ?? 0 : 0;

  const isBurgerShowed = topSections.length + bottomSections.length > 0;

  return (
    <StyledNav id="mobile-menu" $isHidden={isHidden}>
      <StyledHeaderContainer ref={navRef}>
        {logo}

        <StyledRightItemContainer>
          <StyledRightCustomItemContainer>
            {rightItems}
          </StyledRightCustomItemContainer>

          {isBurgerShowed && (
            <Burger
              isActive={isUnrolled}
              onClick={() => setIsUnrolled((isUnrolled) => !isUnrolled)}
            />
          )}
        </StyledRightItemContainer>
      </StyledHeaderContainer>

      <StyledFullScreenPanel>
        <MaxHeightSmoother isHidden={!isUnrolled}>
          <StyledFullScreenPanelContent
            onClick={() => setIsUnrolled(false)}
            animate={isUnrolled ? 'open' : 'closed'}
            variants={navVariants}
            style={{
              height: `calc(100vh - ${backDivHeight}px)`,
            }}
          >
            {topChildren}
            <StyledSectionContainer>
              <SectionList
                sections={topSections}
                activeSection={activeSection}
                onClickSection={onClickSection}
              />
              <SectionList
                sections={bottomSections}
                activeSection={activeSection}
                onClickSection={onClickSection}
              />
            </StyledSectionContainer>
          </StyledFullScreenPanelContent>
        </MaxHeightSmoother>
      </StyledFullScreenPanel>
    </StyledNav>
  );
};
