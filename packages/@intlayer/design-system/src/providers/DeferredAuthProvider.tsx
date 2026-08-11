'use client';

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * Whether the auth queries (`useSession`, `useOAuth2`) may run yet.
 *
 * Defaults to `true` so that apps which never mount {@link DeferredAuthProvider}
 * — the CMS dashboard, where a session is a precondition for rendering
 * anything useful — keep fetching immediately.
 */
const DeferredAuthContext = createContext<boolean>(true);

/**
 * Delays the auth queries until the page has finished loading.
 *
 * On a content site the session is not a precondition for rendering: nothing
 * above the fold depends on it, yet `useIntlayerAPI` pulls `useAuth` in
 * transitively, so an OAuth token request and a `get-session` request are
 * issued during hydration. Both compete with the route chunks for bandwidth and
 * main-thread time exactly when the page is trying to become interactive.
 *
 * Wrapping the tree in this provider keeps those queries disabled until the
 * `load` event has fired and the main thread is idle, so they run on a quiet
 * connection instead of the critical path. Anything that reads the session
 * simply sees `undefined` (its normal loading state) until then.
 *
 * @example
 * ```tsx
 * <ReactQueryProvider>
 *   <DeferredAuthProvider>{children}</DeferredAuthProvider>
 * </ReactQueryProvider>
 * ```
 */
export const DeferredAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthFetchEnabled, setIsAuthFetchEnabled] = useState(false);

  useEffect(() => {
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    /**
     * Waits for the first idle period after load, with a timeout so a page
     * that never goes idle still resolves its session.
     */
    const enableWhenIdle = (): void => {
      const requestIdle = window.requestIdleCallback;

      if (typeof requestIdle === 'function') {
        idleHandle = requestIdle(() => setIsAuthFetchEnabled(true), {
          timeout: 3000,
        });
        return;
      }

      timeoutHandle = setTimeout(() => setIsAuthFetchEnabled(true), 0);
    };

    // `readyState === 'complete'` means `load` already fired — which is the
    // common case here, since hydration can finish after it on a slow device.
    if (document.readyState === 'complete') {
      enableWhenIdle();
    } else {
      window.addEventListener('load', enableWhenIdle, { once: true });
    }

    return () => {
      window.removeEventListener('load', enableWhenIdle);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <DeferredAuthContext.Provider value={isAuthFetchEnabled}>
      {children}
    </DeferredAuthContext.Provider>
  );
};

/**
 * Returns whether auth queries are allowed to run.
 *
 * `true` unless a {@link DeferredAuthProvider} above is still holding them back.
 */
export const useIsAuthFetchEnabled = (): boolean =>
  useContext(DeferredAuthContext);
