import { GridPattern } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { type FC, type PropsWithChildren } from 'react';

export const BackgroundLayout: FC<
  PropsWithChildren<{ hasSpotlight?: boolean }>
> = ({ children }) => {
  return (
    <>
      <div className="absolute z-[-1] size-full max-h-full max-w-full overflow-hidden">
        <div className="relative size-full">
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
