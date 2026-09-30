'use client';

import { useIsMounted } from '@hooks/useIsMounted';
import { type FC, lazy, type PropsWithChildren, Suspense } from 'react';

const LazyLanguageSection = lazy(() =>
  import('./LanguageSection').then((m) => ({ default: m.LanguageSection }))
);

export const LanguageBackground: FC<PropsWithChildren> = ({ children }) => {
  const isMounted = useIsMounted();

  return (
    <>
      {children}
      <div className="absolute inset-s-0 top-0 -z-1 flex size-full items-center justify-center">
        {isMounted && (
          <Suspense>
            <LazyLanguageSection className="mt-[30%]" />
          </Suspense>
        )}
      </div>
    </>
  );
};
