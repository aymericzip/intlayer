'use client';

import { getPathWithoutLocale } from '@intlayer/core/localization';
import { usePathname as useNextPathname } from 'next/navigation.js';
import { useEffect, useMemo, useState } from 'react';

/**
 * Next.js hook that returns the current pathname with the locale segment removed.
 *
 * Wraps Next.js `usePathname()` so it re-renders on client navigations and
 * appends any search parameters before stripping the locale prefix.
 *
 * @returns The current pathname without the locale prefix.
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { usePathname } from 'next-intlayer';
 *
 * const NavItem = ({ href }: { href: string }) => {
 *   const pathname = usePathname();
 *   return <a className={pathname === href ? 'active' : ''}>{href}</a>;
 * };
 * ```
 */
export const usePathname = (): string => {
  const nextPathname = useNextPathname();
  const [searchParams, setSearchParams] = useState<string>('');

  useEffect(() => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    setSearchParams(search);
  }, [nextPathname]);

  const fullPath = searchParams
    ? `${nextPathname}${searchParams}`
    : nextPathname;

  return useMemo(() => getPathWithoutLocale(fullPath), [fullPath]);
};
