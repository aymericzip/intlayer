import { getPathWithoutLocale } from '@intlayer/core/localization';
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js';

/**
 * Solid hook that returns an accessor containing the current pathname with
 * the locale segment removed.
 *
 * Reacts to browser back/forward navigation via the `popstate` event.
 * Falls back to an empty string during server-side rendering.
 *
 * @returns An accessor containing the current pathname without the locale prefix.
 *
 * @example
 * ```tsx
 * import { usePathname } from 'solid-intlayer';
 *
 * const NavItem = ({ href }: { href: string }) => {
 *   const pathname = usePathname();
 *   return (
 *     <a class={pathname() === href ? 'active' : ''} href={href}>
 *       {href}
 *     </a>
 *   );
 * };
 * ```
 */
export const usePathname = (): Accessor<string> => {
  const [rawPathname, setRawPathname] = createSignal<string>(
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  createEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLocationChange = (): void => {
      setRawPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    onCleanup(() =>
      window.removeEventListener('popstate', handleLocationChange)
    );
  });

  return () => getPathWithoutLocale(rawPathname());
};
