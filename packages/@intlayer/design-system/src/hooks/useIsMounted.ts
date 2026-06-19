'use client';

import { startTransition, useEffect, useState } from 'react';

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // startTransition defers the background as a low-priority update so the
    // sign-in form paints before React starts loading the flag section chunk.
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  return isMounted;
};
