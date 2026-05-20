'use client';

import { type FC, lazy, type PropsWithChildren, Suspense } from 'react';

const LazyLanguageSection = lazy(() =>
  import('./LanguageSection').then((m) => ({ default: m.LanguageSection }))
);

export const LanguageBackground: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="absolute top-0 left-0 z-0 flex size-full items-center justify-center">
      <Suspense>
        <LazyLanguageSection className="mt-[30%]" />
      </Suspense>
    </div>
    {children}
  </>
);
