import { getPathWithoutLocale } from '@intlayer/core/localization';
import { useEffect, useMemo, useState } from 'preact/hooks';

/**
 * Preact hook that returns the current pathname with the locale segment removed.
 *
 * Reacts to browser back/forward navigation via the `popstate` event.
 * Falls back to an empty string during server-side rendering.
 *
 * @returns The current pathname without the locale prefix.
 *
 * @example
 * ```tsx
 * import { usePathname } from 'preact-intlayer';
 *
 * const NavItem = ({ href }: { href: string }) => {
 *   const pathname = usePathname();
 *   return <a class={pathname === href ? 'active' : ''}>{href}</a>;
 * };
 * ```
 */
export const usePathname = (): string => {
  const [rawPathname, setRawPathname] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  useEffect(() => {
    const handleLocationChange = (): void => {
      setRawPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return useMemo(() => getPathWithoutLocale(rawPathname), [rawPathname]);
};
