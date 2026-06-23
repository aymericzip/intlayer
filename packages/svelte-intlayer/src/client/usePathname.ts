import { getPathWithoutLocale } from '@intlayer/core/localization';
import { type Readable, readable } from 'svelte/store';

/**
 * Svelte composable that returns a readable store containing the current
 * pathname with the locale segment removed.
 *
 * Reacts to browser back/forward navigation via the `popstate` event.
 * Falls back to an empty string during server-side rendering.
 *
 * @returns A readable store containing the current pathname without the locale prefix.
 *
 * @example
 * ```svelte
 * <script>
 *   import { usePathname } from 'svelte-intlayer';
 *   const pathname = usePathname();
 * </script>
 *
 * <a class:active={$pathname === '/dashboard'} href="/dashboard">
 *   Dashboard
 * </a>
 * ```
 */
export const usePathname = (): Readable<string> => {
  const initialPathname =
    typeof window !== 'undefined'
      ? getPathWithoutLocale(window.location.pathname)
      : '';

  return readable<string>(initialPathname, (set) => {
    if (typeof window === 'undefined') return;

    const handleLocationChange = (): void => {
      set(getPathWithoutLocale(window.location.pathname));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  });
};
