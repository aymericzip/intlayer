'use client';

import type { ReactElement, ReactNode } from 'react';

import {
  TabSelector,
  TabSelectorColor,
  type TabSelectorProps,
} from '../TabSelector';

/**
 * Props for the DesktopNavbar component
 * @template T - The tab props type extending TabProps
 */
type DesktopNavbarProps<T extends TabSelectorProps<any>> = {
  /** Logo component or element displayed on the left side */
  logo: ReactNode;
  /** Array of navigation sections as tab elements */
  sections: ReactElement<T>[];
  /** Right-aligned items (e.g., user menu, search, settings) */
  rightItems?: ReactNode;
  /** Currently selected tab key for highlighting active state */
  selectedChoice: T['selectedChoice'];
};

/**
 * Desktop Navigation Bar Component
 *
 * A horizontal navigation bar optimized for desktop and tablet viewports.
 * Features a sticky header with backdrop blur, left-aligned logo, center navigation tabs,
 * and right-aligned utility items.
 *
 * Features:
 * - Sticky positioning with z-index layering (z-50)
 * - Semi-transparent backdrop with blur effect for modern glass-morphism design
 * - Responsive spacing that adapts across screen sizes
 * - Horizontal scrollable tabs for overflow content
 * - Left-to-right layout: Logo → Navigation → Utility Items
 * - Integrated with TabSelector for consistent tab behavior
 *
 * Layout Structure:
 * ```
 * [Logo] -------- [Nav Tab 1] [Nav Tab 2] [Nav Tab 3] -------- [Right Items]
 * ```
 *
 * Responsive Behavior:
 * - Base: 2vw margin-left, 3-unit gap between tabs
 * - Large (≥1024px): 5vw margin-left, 3-unit gap between tabs
 * - Extra Large (≥1280px): 10vw margin-left, 6-unit gap between tabs
 * - Right items: 2-unit gap on mobile, 4-unit gap on medium screens
 *
 * Styling Features:
 * - Semi-transparent card background (`bg-card/80`)
 * - Subtle shadow with controlled blur (`shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)]`)
 * - Backdrop blur effect for content behind navbar
 * - Horizontal overflow scrolling for tab content
 *
 * @example
 * Basic usage:
 * ```tsx
 * const navigationTabs = [
 *   { key: 'home', label: 'Home', href: '/' },
 *   { key: 'products', label: 'Products', href: '/products' },
 *   { key: 'about', label: 'About', href: '/about' }
 * ];
 *
 * <DesktopNavbar
 *   logo={<CompanyLogo />}
 *   sections={navigationTabs}
 *   selectedChoice="home"
 *   rightItems={<UserProfileMenu />}
 * />
 * ```
 *
 * @example
 * With multiple right items:
 * ```tsx
 * <DesktopNavbar
 *   logo={<Logo />}
 *   sections={navSections}
 *   selectedChoice={currentPage}
 *   rightItems={
 *     <>
 *       <SearchButton />
 *       <NotificationBell />
 *       <UserMenu />
 *     </>
 *   }
 * />
 * ```
 *
 * @template T - Tab properties type extending TabProps for type safety
 * @param props - DesktopNavbar component props
 * @returns Horizontal desktop navigation JSX element
 */
export const DesktopNavbar = <T extends TabSelectorProps<any>>({
  logo,
  sections,
  rightItems,
  selectedChoice,
}: DesktopNavbarProps<T>) => (
  <nav className="sticky top-0 z-50 flex w-full items-center bg-card/80 px-4 py-3 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
    {logo}

    <TabSelector
      selectedChoice={selectedChoice}
      className="ml-[2vw] gap-3 overflow-x-auto text-neutral tracking-wide lg:ml-[5vw] lg:gap-3 xl:ml-[10vw] xl:gap-6"
      tabs={sections}
      hoverable
      color={TabSelectorColor.TEXT}
    />

    <div className="mr-4 flex items-center justify-end gap-2 md:gap-4">
      {rightItems}
    </div>
  </nav>
);
