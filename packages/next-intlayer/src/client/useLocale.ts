'use client';

import { getLocalizedUrl, getPathWithoutLocale } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation.js';
import { useCallback, useMemo } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

type UseLocaleProps = {
  onChange?: 'replace' | 'push' | ((locale: LocalesValues) => void);
};

export const useLocale = ({ onChange }: UseLocaleProps = {}) => {
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathWithoutLocale = useMemo(() => {
    const fullUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    return getPathWithoutLocale(fullUrl);
  }, [pathname, searchParams]);

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
