/**
 * Runs a callback when the browser is idle, without blocking first render.
 * Falls back to a short `setTimeout` where `requestIdleCallback` is unavailable
 * (Safari, React Native, Lynx).
 *
 * @param callback - Work to run once the main thread is free.
 *
 * @example
 * onIdle(() => attachVisibilityListeners());
 */
export const onIdle = (callback: () => void): void => {
  if (typeof window === 'undefined') return;

  const requestIdle = (
    window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    }
  ).requestIdleCallback;

  if (typeof requestIdle === 'function') {
    requestIdle(() => callback());
    return;
  }

  setTimeout(callback, 1);
};
