'use client';

import { m, type Variants } from 'framer-motion';
import { useRef, useState, type FC, type ReactNode } from 'react';
import { useScrollBlockage, useScrollDetection } from '../../hooks';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { Burger } from './Burger';
import { useNavActions } from './useNavigation';
import type { NavSection } from '.';

type MobileNavbarProps = {
  logo: ReactNode;
  topChildren?: ReactNode;
  topSections?: NavSection[];
  bottomChildren?: ReactNode;
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

const MotionSection = m.div;

const SectionList: FC<SectionListProps> = ({
  sections,
  activeSection,
  onClickSection,
}) => (
  <div role="tablist" aria-orientation="vertical" aria-multiselectable="false">
    {sections?.map(({ id, label, url, title, onClick }) => (
      <MotionSection
        className="hover:text-primary aria-selected:text-primary w-full cursor-pointer p-3 text-center transition"
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
      </MotionSection>
    ))}
  </div>
);

const bgStyle =
  'bg-card/95 dark:bg-card-dark/95 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur';
// css`
//   -webkit-backdrop-filter: var(--tw-backdrop-blur)
//     var(--tw-backdrop-brightness) var(--tw-backdrop-contrast)
//     var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate)
//     var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
//     var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
// `,

export const MobileNavbar: FC<MobileNavbarProps> = ({
  logo,
  topChildren,
  topSections = [],
  bottomChildren,
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
    <nav
      className={cn(
        ...bgStyle,
        'sticky top-0 z-50 flex w-screen flex-col  transition',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
      id="mobile-menu"
    >
      <div
        className="flex w-full items-center justify-between gap-[10vw] px-4 py-3"
        ref={navRef}
      >
        {logo}

        <div className="flex w-full items-center justify-end gap-6">
          <div className="flex w-full items-center justify-end gap-1">
            {rightItems}
          </div>

          {isBurgerShowed && (
            <Burger
              isActive={isUnrolled}
              onClick={() => setIsUnrolled((isUnrolled) => !isUnrolled)}
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          ...bgStyle,
          'absolute bottom-0 left-0 w-full translate-y-full'
        )}
      >
        <MaxHeightSmoother isHidden={!isUnrolled}>
          <m.div
            className="text-text dark:text-text-dark flex w-full flex-col pb-[20%] pt-10 text-lg tracking-wide"
            onClick={() => setIsUnrolled(false)}
            animate={isUnrolled ? 'open' : 'closed'}
            variants={navVariants}
            style={{
              height: `calc(100vh - ${backDivHeight}px)`,
            }}
          >
            {topChildren}
            <div className="flex h-full flex-col justify-between">
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
            </div>

            <div className="m-auto flex w-full max-w-[400px] items-center justify-center gap-1 px-5 py-3">
              {bottomChildren}
            </div>
          </m.div>
        </MaxHeightSmoother>
      </div>
    </nav>
  );
};
