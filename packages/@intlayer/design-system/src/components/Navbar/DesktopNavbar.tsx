'use client';

import type { ReactElement, ReactNode } from 'react';

import { type TabProps, TabSelector } from '../TabSelector';

type DesktopNavbarProps<T extends TabProps> = {
  logo: ReactNode;
  sections: ReactElement<T>[];
  rightItems?: ReactNode;
  selectedChoice: T['key'];
};

export const DesktopNavbar = <T extends TabProps>({
  logo,
  sections,
  rightItems,
  selectedChoice,
}: DesktopNavbarProps<T>) => {
  return (
    <nav className="bg-card/80 sticky top-0 z-50 flex w-full items-center px-4 py-3 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
      {logo}

      <TabSelector
        selectedChoice={selectedChoice}
        className="text-neutral ml-[2vw] gap-3 overflow-x-auto tracking-wide lg:ml-[10vw] lg:gap-6"
        tabs={sections}
        hoverable
        color="text"
      />

      <div className="mr-4 flex items-center justify-end gap-2 md:gap-4">
        {rightItems}
      </div>
    </nav>
  );
};
