'use client';

import { MessageKey } from '@intlayer/editor';
import { useEffect } from 'preact/hooks';
import {
  useCrossFrameState,
  type CrossFrameStateOptions,
} from './useCrossFrameState';

export const useCrossURLPathState = (
  initialState?: string,
  options?: CrossFrameStateOptions
) => useCrossFrameState(MessageKey.INTLAYER_URL_CHANGE, initialState, options);

export const useCrossURLPathSetter = (initialState?: string) => {
  const states = useCrossURLPathState(initialState, {
    emit: true,
    receive: false,
  });
  const [_state, setState] = states;

  useEffect(() => {
    /**
     * 1) Monkey patch history methods (pushState, replaceState)
     *    to dispatch a custom event whenever they are called.
     */
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const injectLocationChangeEvent = (method: (...args: any[]) => void) =>
      function (this: typeof history, ...args: [any, string, string?]) {
        method.apply(this, args);
        window.dispatchEvent(new Event('locationchange'));
      };

    history.pushState = injectLocationChangeEvent(originalPushState);
    history.replaceState = injectLocationChangeEvent(originalReplaceState);

    /**
     * 2) The callback to update our state whenever the URL changes.
     */
    const updateURLState = () => {
      setState(window.location.pathname);
    };

    /**
     * 3) Attach event listeners for locationchange, popstate, hashchange.
     *    - 'locationchange' is our custom event triggered by push/replaceState overrides.
     *    - 'popstate' is fired on back/forward navigation.
     *    - 'hashchange' is for URL hash (#) changes.
     *    - 'load' is when new page is loaded
     */
    window.addEventListener('locationchange', updateURLState);
    window.addEventListener('popstate', updateURLState);
    window.addEventListener('hashchange', updateURLState);
    window.addEventListener('load', updateURLState);

    // Initialize our state immediately on mount
    updateURLState();

    /**
     * 4) Cleanup when the component unmounts:
     *    - Remove event listeners.
     *    - Restore original pushState & replaceState to avoid side effects.
     */
    return () => {
      window.removeEventListener('locationchange', updateURLState);
      window.removeEventListener('popstate', updateURLState);
      window.removeEventListener('hashchange', updateURLState);
      window.removeEventListener('load', updateURLState);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return states;
};
