import {
  computed,
  DestroyRef,
  inject,
  type Signal,
  signal,
} from '@angular/core';
import { getPathWithoutLocale } from '@intlayer/core/localization';

/**
 * Angular hook that returns a signal containing the current pathname with
 * the locale segment removed.
 *
 * Reacts to browser back/forward navigation via the `popstate` event.
 * Uses `DestroyRef` to clean up the event listener when the component is destroyed.
 * Falls back to an empty string during server-side rendering.
 *
 * @returns A signal containing the current pathname without the locale prefix.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 * import { usePathname } from 'angular-intlayer';
 *
 * @Component({
 *   standalone: true,
 *   selector: 'app-nav-item',
 *   template: `
 *     <a [class.active]="pathname() === '/dashboard'" href="/dashboard">
 *       Dashboard
 *     </a>
 *   `,
 * })
 * export class NavItem {
 *   readonly pathname = usePathname();
 * }
 * ```
 */
export const usePathname = (): Signal<string> => {
  const destroyRef = inject(DestroyRef);

  const rawPathname = signal<string>(
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  if (typeof window !== 'undefined') {
    const handleLocationChange = (): void => {
      rawPathname.set(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    destroyRef.onDestroy(() => {
      window.removeEventListener('popstate', handleLocationChange);
    });
  }

  return computed(() => getPathWithoutLocale(rawPathname()));
};
