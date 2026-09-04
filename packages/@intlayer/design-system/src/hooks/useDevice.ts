'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Tailwind's breakpoints, in pixels. */
const BREAKPOINT_WIDTHS: Readonly<Record<SizeType, number>> = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const getBreakpointFromSize = (breakpoint: SizeType | number): number =>
  typeof breakpoint === 'number'
    ? breakpoint
    : (BREAKPOINT_WIDTHS[breakpoint] ?? BREAKPOINT_WIDTHS.md);

export const checkIsMobileUserAgent = (): boolean | undefined => {
  if (typeof window === 'undefined') return;

  const userAgent = window.navigator?.userAgent;

  if (typeof userAgent === 'undefined') return;

  return /android|bb\d+|meego|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(?:hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(?:ob|in)i|palm(?: os)?|phone|p(?:ixi|re)\/|plucker|pocket|psp|series(?:4|6)0|symbian|treo|up\.(?:browser|link)|vodafone|wap|windows ce|windows phone|xda|xiino|zte-/i.test(
    userAgent
  );
};

export const checkIsIphoneOrSafariDevice = (): boolean | undefined => {
  if (typeof window === 'undefined') return;

  const userAgent = window.navigator?.userAgent;

  /* 1 . is it Safari?  (Chrome & co. also contain “Safari/…”, so exclude them) */
  const isSafari =
    /Safari\/\d/i.test(userAgent) && // has “Safari/xxx”
    !/Chrome|CriOS|FxiOS|Edg|OPR/i.test(userAgent); // …but not the other browsers

  /* 2. is it an Apple device? (macOS or iOS/iPadOS) */
  const isAppleDevice = /Macintosh|iP(?:hone|ad|od)/.test(userAgent);

  return isSafari && isAppleDevice; // true for mac-Safari & iOS-Safari
};

export const checkIsIOS = (): boolean | undefined => {
  if (typeof window === 'undefined') return;

  const userAgent = window.navigator?.userAgent;

  if (typeof userAgent === 'undefined') return;

  // Check for iOS devices: iPhone, iPad, iPod
  return /iP(?:hone|ad|od)/.test(userAgent);
};

export const checkIsMac = (): boolean | undefined => {
  if (typeof window === 'undefined') return;

  const userAgent = window.navigator?.userAgent;

  if (typeof userAgent === 'undefined') return;

  // Check for macOS/Mac devices
  return /Macintosh|MacIntel|Mac OS X/.test(userAgent);
};

export const checkIsMobileScreen = (
  breakpoint: number
): boolean | undefined => {
  if (typeof window === 'undefined') return;

  return (window?.innerWidth ?? 0) <= breakpoint;
};

export type DeviceState = {
  /** Is the screen width within a mobile breakpoint. */
  isMobileScreen: boolean | undefined;
  /** Is the user agent indicative of a mobile device. */
  isMobileUserAgent: boolean | undefined;
  /** Combines both checks to determine if the device is mobile. */
  isMobile: boolean | undefined;
  /** Is the device running iOS (iPhone, iPad, iPod). */
  isIOS: boolean | undefined;
  /** Is the device a Mac computer (macOS). */
  isMac: boolean | undefined;
};

export const calculateIsMobile = (
  breakpoint: SizeType | number = 'md'
): DeviceState => {
  const breakpointValue = getBreakpointFromSize(breakpoint);

  const isMobileUserAgent = checkIsMobileUserAgent();
  const isMobileScreen = checkIsMobileScreen(breakpointValue);
  const isMobile = isMobileScreen ?? isMobileUserAgent;
  const isIOS = checkIsIOS();
  const isMac = checkIsMac();

  return { isMobileScreen, isMobileUserAgent, isMobile, isIOS, isMac };
};

/**
 * Snapshot served while rendering on the server and while hydrating, where no
 * viewport exists. Frozen and shared so every consumer reads the very same
 * reference — `useSyncExternalStore` compares snapshots by identity.
 */
const SERVER_SNAPSHOT: DeviceState = Object.freeze({
  isMobileScreen: undefined,
  isMobileUserAgent: undefined,
  isMobile: undefined,
  isIOS: undefined,
  isMac: undefined,
});

type UserAgentFlags = Pick<
  DeviceState,
  'isMobileUserAgent' | 'isIOS' | 'isMac'
>;

/** The user agent never changes within a document, so parse it once. */
let userAgentFlags: UserAgentFlags | undefined;

const getUserAgentFlags = (): UserAgentFlags => {
  userAgentFlags ??= {
    isMobileUserAgent: checkIsMobileUserAgent(),
    isIOS: checkIsIOS(),
    isMac: checkIsMac(),
  };

  return userAgentFlags;
};

type BreakpointStore = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => DeviceState;
};

/**
 * One store per breakpoint, shared by every component asking for it.
 *
 * A page mounts this hook from a dozen components; giving each its own
 * `MediaQueryList`, state and effect made the browser evaluate the same query a
 * dozen times and React commit a dozen separate post-hydration renders. Reading
 * from a single store collapses those into one subscription and one commit.
 */
const breakpointStores = new Map<number, BreakpointStore>();

const createBreakpointStore = (breakpointValue: number): BreakpointStore => {
  const mediaQuery = window.matchMedia(`(max-width: ${breakpointValue}px)`);
  const listeners = new Set<() => void>();

  const buildSnapshot = (isMobileScreen: boolean): DeviceState => ({
    ...getUserAgentFlags(),
    isMobileScreen,
    isMobile: isMobileScreen,
  });

  let snapshot = buildSnapshot(mediaQuery.matches);

  /**
   * Replaces the snapshot only when the viewport actually crossed the
   * breakpoint. `useSyncExternalStore` compares snapshots by identity, so
   * rebuilding an equal object would schedule a render for nothing.
   *
   * @returns Whether the snapshot changed.
   */
  const refreshSnapshot = (isMobileScreen: boolean): boolean => {
    if (snapshot.isMobileScreen === isMobileScreen) return false;

    snapshot = buildSnapshot(isMobileScreen);

    return true;
  };

  const handleChange = (event: MediaQueryListEvent) => {
    if (!refreshSnapshot(event.matches)) return;

    for (const listener of listeners) listener();
  };

  return {
    subscribe: (onStoreChange) => {
      if (listeners.size === 0) {
        // The viewport may have moved while nothing was listening; React reads
        // the snapshot again right after subscribing, so refreshing it here is
        // what keeps a remounted consumer from rendering a stale width.
        refreshSnapshot(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
      }

      listeners.add(onStoreChange);

      return () => {
        listeners.delete(onStoreChange);

        if (listeners.size === 0) {
          mediaQuery.removeEventListener('change', handleChange);
        }
      };
    },
    getSnapshot: () => snapshot,
  };
};

const getBreakpointStore = (breakpointValue: number): BreakpointStore => {
  const existingStore = breakpointStores.get(breakpointValue);

  if (existingStore) return existingStore;

  const store = createBreakpointStore(breakpointValue);

  breakpointStores.set(breakpointValue, store);

  return store;
};

const getServerSnapshot = (): DeviceState => SERVER_SNAPSHOT;

/**
 * Reports whether the current device is mobile, and which platform it runs.
 *
 * Server renders — including the prerendered HTML both apps ship — resolve to
 * `undefined`, then settle to the real values in a single commit once the
 * browser takes over.
 *
 * @example
 * ```tsx
 * const { isMobile } = useDevice('lg');
 * ```
 */
export const useDevice = (
  breakpoint: SizeType | number = 'md'
): DeviceState => {
  const breakpointValue = getBreakpointFromSize(breakpoint);

  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      getBreakpointStore(breakpointValue).subscribe(onStoreChange),
    [breakpointValue]
  );

  const getSnapshot = useCallback(
    () => getBreakpointStore(breakpointValue).getSnapshot(),
    [breakpointValue]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
