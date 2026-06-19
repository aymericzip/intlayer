'use client';

import { cn } from '@intlayer/design-system/utils';
import dynamic from 'next/dynamic';
import type { FC, PropsWithChildren } from 'react';

const GridDistortionPattern = dynamic(
  () =>
    import('@intlayer/design-system/pattern').then((m) => ({
      default: m.GridDistortionPattern,
    })),
  { ssr: false }
);

export const BackgroundLayout: FC<
  PropsWithChildren<{ hasSpotlight?: boolean; className?: string }>
> = ({ children, hasSpotlight = true, className }) => (
  <>
    <div
      className={cn(
        'absolute z-[-1] size-full max-h-full max-w-full overflow-hidden',
        className
      )}
    >
      <div className="relative size-full">
        <GridDistortionPattern
          width={70}
          height={70}
          radius={360}
          strength={0.12}
          className={
            hasSpotlight
              ? 'mask-[radial-gradient(ellipse_75%_55%_at_50%_45%,white_50%,transparent_100%)] h-[200vw]'
              : 'h-[200vw]'
          }
        />
      </div>
    </div>
    {children}
  </>
);
