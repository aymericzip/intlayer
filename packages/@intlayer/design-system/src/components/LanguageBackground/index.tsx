'use client';

import {
  type FC,
  lazy,
  type PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from 'react';

const LazyLanguageSection = lazy(() =>
  import('./LanguageSection').then((m) => ({ default: m.LanguageSection }))
);

export { LanguageSection } from './LanguageSection';

export const LanguageBackground: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 z-0 flex size-full items-center justify-center">
        {mounted && (
          <Suspense>
            <LazyLanguageSection className="mt-[30%]" />
          </Suspense>
        )}
      </div>
      {children}
    </>
  );
};
