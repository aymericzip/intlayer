import { GridPattern } from '@intlayer/design-system';
import type { FC, PropsWithChildren } from 'react';

export const BackgroundLayout: FC<
  PropsWithChildren<{ hasSpotlight?: boolean }>
> = ({ children, hasSpotlight = true }) => {
  return (
    <>
      <div className="absolute z-[-1] size-full max-h-full max-w-full overflow-hidden">
        <div className="relative size-full">
          <GridPattern
            width={70}
            height={100}
            x={-1}
            y={-1}
            className={
              hasSpotlight
                ? 'h-[200vw] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_45%,white_50%,transparent_100%)]'
                : 'h-[200vw]'
            }
          />
        </div>
      </div>
      {children}
    </>
  );
};
