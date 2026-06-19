import { useDevice, useIsMounted } from '@intlayer/design-system/hooks';
import { GridPattern } from '@intlayer/design-system/pattern';
import { cn } from '@intlayer/design-system/utils';
import dynamic from 'next/dynamic';
import { type FC, type PropsWithChildren, Suspense } from 'react';

const GridDistortionPattern = dynamic(
  () =>
    import('@intlayer/design-system/pattern').then((m) => ({
      default: m.GridDistortionPattern,
    })),
  { ssr: false }
);

export const BackgroundLayout: FC<
  PropsWithChildren<{ hasSpotlight?: boolean; className?: string }>
> = ({ children, hasSpotlight = true, className }) => {
  const isMounted = useIsMounted();
  const { isMobile } = useDevice();

  const patternClassName = cn(
    'h-[200vw]',
    hasSpotlight &&
      'mask-[radial-gradient(ellipse_75%_55%_at_50%_45%,white_50%,transparent_100%)]'
  );

  const showHeavyPattern = isMounted && !isMobile;

  return (
    <>
      <div className={cn('absolute inset-0 z-[-1] overflow-hidden', className)}>
        {showHeavyPattern ? (
          <Suspense
            fallback={
              <GridPattern
                width={70}
                height={70}
                radius={360}
                className={patternClassName}
              />
            }
          >
            <GridDistortionPattern
              width={70}
              height={70}
              radius={360}
              strength={0.12}
              className={patternClassName}
            />
          </Suspense>
        ) : (
          <GridPattern
            width={70}
            height={70}
            radius={360}
            className={patternClassName}
          />
        )}
      </div>
      {children}
    </>
  );
};
