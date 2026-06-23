import { getPathWithoutLocale } from '@intlayer/core/localization';

export type UsePathnameResult = {
  /** Current pathname without the locale prefix. */
  pathname: string;
  /**
   * Subscribe to pathname changes triggered by browser navigation.
   *
   * @param callback - Called with the new pathname on every `popstate` event.
   * @returns A cleanup function that removes the event listener.
   */
  subscribe: (callback: (pathname: string) => void) => () => void;
};

/**
 * Returns the current pathname with the locale segment removed, plus a
 * `subscribe` function to react to browser navigation changes.
 *
 * Falls back to an empty string during server-side rendering.
 *
 * @returns An object with the current pathname and a subscribe function.
 *
 * @example
 * ```ts
 * import { usePathname } from 'vanilla-intlayer';
 *
 * const { pathname, subscribe } = usePathname();
 *
 * const unsubscribe = subscribe((newPathname) => {
 *   document.querySelector('.active')?.classList.remove('active');
 *   document.querySelector(`[href="${newPathname}"]`)?.classList.add('active');
 * });
 * ```
 */
export const usePathname = (): UsePathnameResult => {
  const getPathname = (): string =>
    typeof window !== 'undefined'
      ? getPathWithoutLocale(window.location.pathname)
      : '';

  const subscribe = (callback: (pathname: string) => void): (() => void) => {
    const handleLocationChange = (): void => callback(getPathname());
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  };

  return {
    pathname: getPathname(),
    subscribe,
  };
};
