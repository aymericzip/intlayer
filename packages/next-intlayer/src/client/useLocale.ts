'use client';

import { getLocalizedUrl, getPathWithoutLocale } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

type UseLocaleProps = {
  onChange?: 'replace' | 'push' | ((locale: LocalesValues) => void);
};

const usePathWithoutLocale = () => {
  const pathname = usePathname(); // updates on client navigations
  const [fullPath, setFullPath] = useState(pathname);

  useEffect(() => {
    // Runs only on client; avoids suspense.
    const search = typeof window !== 'undefined' ? window.location.search : '';
    setFullPath(search ? `${pathname}${search}` : pathname);
  }, [pathname]);

  // Your own helper
  return useMemo(() => getPathWithoutLocale(fullPath), [fullPath]);
};

export const useLocale = ({ onChange }: UseLocaleProps = {}) => {
  const { replace, push } = useRouter();
  const pathWithoutLocale = usePathWithoutLocale();

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      if (!onChange) return;

      if (typeof onChange === 'function') {
        onChange(locale);
        return;
      }

      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale);

      if (onChange === 'replace') {
        replace(pathWithLocale);
      }
      if (onChange === 'push') {
        push(pathWithLocale);
      }
    },
    [replace, push, pathWithoutLocale, onChange]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  };
};
