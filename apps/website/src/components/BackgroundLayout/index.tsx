'use client';

import { GridPattern, Spotlight } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useTheme } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

export const BackgroundLayout: FC<
  PropsWithChildren<{ hasSpotlight?: boolean }>
> = ({ children, hasSpotlight }) => {
  const { resolvedTheme } = useTheme();

  const showSpotlight = hasSpotlight && resolvedTheme === 'dark';

  return (
    <>
      <div className="absolute z-[-1] size-full max-h-full max-w-full overflow-hidden">
        <div className="relative size-full">
          {showSpotlight && (
            <Spotlight className="max-sm:display-none w-[84%] opacity-50" />
          )}
          <GridPattern
            width={50}
            height={50}
            x={-1}
            y={-1}
            className={cn(
              'h-[200vw] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]'
            )}
          />
        </div>
      </div>
      {children}
    </>
  );
};
