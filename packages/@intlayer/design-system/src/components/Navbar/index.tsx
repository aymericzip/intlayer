'use client';

import type { ReactElement, ReactNode } from 'react';
import { useDevice, useIsMounted } from '../../hooks';
import type { TabSelectorItemProps } from '../TabSelector';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

/**
 * Props for the responsive Navbar component
 * @template T - The tab props type extending TabProps
 */
type NavbarProps<T extends TabSelectorItemProps> = {
  /** Logo component or element to display in navbar */
  logo: ReactNode;
  /** Currently selected tab key for active state management */
  selectedChoice: T['key'];
  /** Navigation sections displayed on desktop layout */
  desktopSections?: ReactElement<T>[];
  /** Additional content displayed at top of mobile navbar */
  mobileTopChildren?: ReactNode;
  /** Navigation sections displayed at top of mobile navbar */
  mobileTopSections?: ReactElement<T>[];
  /** Additional content displayed at bottom of mobile navbar */
  mobileBottomChildren?: ReactNode;
  /** Navigation sections displayed at bottom of mobile navbar */
  mobileBottomSections?: ReactElement<T>[];
  /** Right-aligned items for desktop navbar (e.g., user menu, settings) */
  rightItemsDesktop?: ReactNode;
  /** Right-aligned items for mobile navbar */
  rightItemsMobile?: ReactNode;
};

/**
 * Responsive Navbar Component
 *
 * A highly adaptable navigation component that automatically switches between desktop and mobile
 * layouts based on screen size. Provides comprehensive navigation structure with flexible content areas.
 *
 * Features:
 * - Automatic responsive switching at 'lg' breakpoint (1024px)
 * - Separate section configurations for desktop and mobile layouts
 * - Support for logo placement and right-aligned utility items
 * - Generic typing for tab properties and selected states
 * - Mobile-specific top/bottom content areas for enhanced mobile UX
 * - Hydration-safe rendering with useIsMounted hook
 *
 * @example
 * Basic usage:
 * ```tsx
 * const navSections = [
 *   { key: 'home', label: 'Home', href: '/' },
 *   { key: 'about', label: 'About', href: '/about' }
 * ];
 *
 * <Navbar
 *   logo={<Logo />}
 *   selectedChoice="home"
 *   desktopSections={navSections}
 *   mobileTopSections={navSections}
 *   rightItemsDesktop={<UserMenu />}
 * />
 * ```
 *
 * @example
 * Advanced mobile configuration:
 * ```tsx
 * <Navbar
 *   logo={<Logo />}
 *   selectedChoice={activeTab}
 *   desktopSections={mainNavItems}
 *   mobileTopSections={primaryMobileNavItems}
 *   mobileTopChildren={<SearchBar />}
 *   mobileBottomSections={secondaryMobileNavItems}
 *   mobileBottomChildren={<UserProfile />}
 *   rightItemsDesktop={<DesktopActions />}
 *   rightItemsMobile={<MobileActions />}
 * />
 * ```
 *
 * Responsive Behavior:
 * - Desktop (≥1024px): Shows DesktopNavbar with horizontal layout
 * - Mobile (<1024px): Shows MobileNavbar with collapsible vertical layout
 * - Automatic detection with no flash of unstyled content
 *
 * @template T - Tab properties type extending TabProps for type safety
 * @param props - Navbar component props
 * @returns Responsive navbar JSX element
 */
export const Navbar = <T extends TabSelectorItemProps>({
  logo,
  mobileTopChildren,
  desktopSections = [],
  mobileTopSections = [],
  mobileBottomChildren,
  mobileBottomSections = [],
  rightItemsDesktop,
  rightItemsMobile,
  selectedChoice,
}: NavbarProps<T>) => {
  const { isMobile } = useDevice('lg');
  const isMoUnted = useIsMounted();

  if (!isMoUnted) return <></>;

  return isMobile ? (
    <MobileNavbar
      topChildren={mobileTopChildren}
      topSections={mobileTopSections}
      bottomChildren={mobileBottomChildren}
      bottomSections={mobileBottomSections}
      logo={logo}
      rightItems={rightItemsMobile}
    />
  ) : (
    <DesktopNavbar
      sections={desktopSections}
      rightItems={rightItemsDesktop}
      logo={logo}
      selectedChoice={selectedChoice}
    />
  );
};
