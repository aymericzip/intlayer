'use client';

import type { FC, MouseEventHandler, ReactNode } from 'react';
import { useDevice, useIsMounted } from '../../hooks';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

export interface NavSection {
  title: ReactNode;
  id: string;
  onClick: MouseEventHandler;
  url?: string;
  label: string;
}

interface NavbarProps {
  logo: ReactNode;
  desktopSections?: NavSection[];
  mobileTopChildren?: ReactNode;
  mobileTopSections?: NavSection[];
  mobileBottomSections?: NavSection[];
  rightItemsDesktop?: ReactNode;
  rightItemsMobile?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({
  logo,
  mobileTopChildren,
  desktopSections = [],
  mobileTopSections = [],
  mobileBottomSections = [],
  rightItemsDesktop,
  rightItemsMobile,
}) => {
  const { isMobile } = useDevice();
  const isMoUnted = useIsMounted();

  if (!isMoUnted) return <></>;

  return (
    <>
      {isMobile ? (
        <MobileNavbar
          topChildren={mobileTopChildren}
          topSections={mobileTopSections}
          bottomSections={mobileBottomSections}
          logo={logo}
          rightItems={rightItemsMobile}
        />
      ) : (
        <DesktopNavbar
          sections={desktopSections}
          rightItems={rightItemsDesktop}
          logo={logo}
        />
      )}
    </>
  );
};
