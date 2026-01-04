'use client';

import { useScrollBlockage } from '@hooks/useScrollBlockage';
import { useScrollDetection } from '@hooks/useScrollDetection';
import { cn } from '@utils/cn';
import { m, type Variants } from 'framer-motion';
import { type ReactElement, type ReactNode, useRef, useState } from 'react';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import type { TabSelectorItemProps } from '../TabSelector';
import { Burger } from './Burger';

/**
 * Props for the MobileNavbar component
 * @template T - The tab props type extending TabProps
 */
type MobileNavbarProps<T extends TabSelectorItemProps> = {
  /** Logo component or element displayed in the header */
  logo: ReactNode;
  /** Additional content displayed at the top of expanded mobile menu */
  topChildren?: ReactNode;
  /** Navigation sections displayed in the top area of expanded menu */
  topSections?: ReactElement<T>[];
  /** Additional content displayed at the bottom of expanded mobile menu */
  bottomChildren?: ReactNode;
  /** Navigation sections displayed in the bottom area of expanded menu */
  bottomSections?: ReactElement<T>[];
  /** Right-aligned items in the collapsed header (e.g., search, notifications) */
  rightItems?: ReactNode;
  /** Whether the navbar should be rollable (default: true) */
  rollable?: boolean;
};

/**
 * Framer Motion animation variants for staggered menu item reveals
 * Creates a smooth cascading effect when menu opens/closes
 */
const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

/**
 * Shared background styling for mobile navbar components
 * Provides glass-morphism effect with blur and transparency
 */
const bgStyle =
  'bg-card/95 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur';

/**
 * Mobile Navigation Bar Component
 *
 * A sophisticated mobile-first navigation component with rollable full-screen menu,
 * scroll-aware behavior, and smooth animations. Optimized for touch interactions and
 * mobile user experience patterns.
 *
 * Features:
 * - rollable hamburger menu with full-screen overlay
 * - Auto-hide on scroll down, show on scroll up for screen space optimization
 * - Background scroll prevention when menu is open
 * - Staggered animations for smooth menu item reveals
 * - Flexible content areas (top/bottom children and sections)
 * - Responsive layout with viewport-aware sizing
 * - Backdrop blur effects for modern glass-morphism design
 *
 * Layout Structure:
 * ```
 * [Logo] ----------- [Right Items] [Burger]
 *           (when expanded)
 * ┌─────────────────────────────────────────┐
 * │ [Top Children]                          │
 * │ [Top Sections - Navigation Items]       │
 * │ [Bottom Sections - Navigation Items]    │
 * │ [Bottom Children]                       │
 * └─────────────────────────────────────────┘
 * ```
 *
 * Behavioral Features:
 * - Sticky positioning with dynamic hide/show based on scroll direction
 * - Background scroll locking when menu is expanded
 * - Click outside to close expanded menu
 * - Smooth height animations with MaxHeightSmoother
 * - Intelligent burger button visibility (only shown if sections exist)
 *
 * Animation Details:
 * - Menu items animate in with staggered timing (70ms delay between items)
 * - Exit animations are reversed with 50ms stagger
 * - Initial delay of 200ms before items start animating in
 * - Full viewport height menu with dynamic height calculation
 *
 * @example
 * Basic mobile navbar:
 * ```tsx
 * <MobileNavbar
 *   logo={<MobileLogo />}
 *   topSections={primaryNavItems}
 *   rightItems={<SearchIcon />}
 * />
 * ```
 *
 * @example
 * Full-featured mobile navbar:
 * ```tsx
 * <MobileNavbar
 *   logo={<Logo />}
 *   topChildren={<WelcomeMessage />}
 *   topSections={mainNavItems}
 *   bottomSections={utilityNavItems}
 *   bottomChildren={<UserProfile />}
 *   rightItems={
 *     <>
 *       <NotificationIcon />
 *       <SearchIcon />
 *     </>
 *   }
 * />
 * ```
 *
 * Accessibility Features:
 * - Menu expanded state communicated via aria-expanded
 * - Focus management and keyboard navigation support
 * - Screen reader friendly with semantic nav structure
 *
 * @template T - Tab properties type extending TabProps for type safety
 * @param props - MobileNavbar component props
 * @returns Mobile navigation with rollable full-screen menu
 */
export const MobileNavbar = <T extends TabSelectorItemProps>({
  logo,
  topChildren,
  topSections = [],
  bottomChildren,
  bottomSections = [],
  rightItems,
  rollable = true,
}: MobileNavbarProps<T>) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isUnrolled, setIsUnrolled] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);

  useScrollBlockage({
    disableScroll: rollable,
    key: 'mobile_nav',
  });

  useScrollDetection({
    onScrollUp: () => setIsHidden(false),
    onScrollDown: () => setIsHidden(true),
    isEnabled: !isUnrolled && rollable,
  });

  const backDivHeight = !isHidden ? (navRef.current?.clientHeight ?? 0) : 0;

  const isBurgerShowed = topSections.length + bottomSections.length > 0;

  return (
    <nav
      className={cn(
        bgStyle,
        'sticky top-0 z-50 flex w-screen flex-col transition',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
      id="mobile-menu"
    >
      <div
        className="flex w-full items-center justify-between gap-1 px-4 py-3 md:gap-[10vw]"
        ref={navRef}
      >
        {logo}

        <div className="flex w-full flex-1 items-center justify-end gap-6">
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
            className="flex w-full flex-col pt-10 pb-[20%] text-lg text-text tracking-wide"
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
