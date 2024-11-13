'use client';

import { m, type Variants } from 'framer-motion';
import { useRef, useState, type ReactElement, type ReactNode } from 'react';
import { useScrollBlockage, useScrollDetection } from '../../hooks';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { TabProps } from '../TabSelector';
import { Burger } from './Burger';

type MobileNavbarProps<T extends TabProps> = {
  logo: ReactNode;
  topChildren?: ReactNode;
  topSections?: ReactElement<T>[];
  bottomChildren?: ReactNode;
  bottomSections?: ReactElement<T>[];
  rightItems?: ReactNode;
};

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const bgStyle =
  'bg-card/95 dark:bg-card-dark/95 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur';

export const MobileNavbar = <T extends TabProps>({
  logo,
  topChildren,
  topSections = [],
  bottomChildren,
  bottomSections = [],
  rightItems,
}: MobileNavbarProps<T>) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isUnrolled, setIsUnrolled] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);

  useScrollBlockage({
    disableScroll: isUnrolled,
    key: 'mobile_nav',
  });

  useScrollDetection({
    onScrollUp: () => setIsHidden(false),
    onScrollDown: () => setIsHidden(true),
    isEnabled: !isUnrolled,
  });

  const backDivHeight = !isHidden ? (navRef.current?.clientHeight ?? 0) : 0;

  const isBurgerShowed = topSections.length + bottomSections.length > 0;

  return (
    <nav
      className={cn(
        bgStyle,
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
          bgStyle,
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
            <div className="flex h-full flex-col justify-center">
              {topSections}
              {bottomSections}
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
