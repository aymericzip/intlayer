'use client';

import {
  type FC,
  lazy,
  type PropsWithChildren,
  Suspense,
  startTransition,
  useEffect,
  useState,
} from 'react';

const LazyLanguageSection = lazy(() =>
  import('./LanguageSection').then((m) => ({ default: m.LanguageSection }))
);

export const LanguageBackground: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // startTransition defers the background as a low-priority update so the
    // sign-in form paints before React starts loading the flag section chunk.
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  return (
    <>
      {children}
      <div className="absolute top-0 left-0 -z-1 flex size-full items-center justify-center">
        {mounted && (
          <Suspense>
            <LazyLanguageSection className="mt-[30%]" />
          </Suspense>
        )}
      </div>
    </>
  );
};
