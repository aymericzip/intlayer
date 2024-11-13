'use client';

import type { ReactElement, ReactNode } from 'react';
import { useDevice, useIsMounted } from '../../hooks';
import { TabProps } from '../TabSelector';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

type NavbarProps<T extends TabProps> = {
  logo: ReactNode;
  selectedChoice: T['key'];
  desktopSections?: ReactElement<T>[];
  mobileTopChildren?: ReactNode;
  mobileTopSections?: ReactElement<T>[];
  mobileBottomChildren?: ReactNode;
  mobileBottomSections?: ReactElement<T>[];
  rightItemsDesktop?: ReactNode;
  rightItemsMobile?: ReactNode;
};

export const Navbar = <T extends TabProps>({
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
  const { isMobile } = useDevice();
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
