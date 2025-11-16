'use client';

import { useEffect, useState } from 'react';

export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const getBreakpointFromSize = (breakpoint: SizeType | number) => {
  switch (breakpoint) {
    case 'xs':
      return 480;
    case 'sm':
      return 640;
    case 'md':
      return 768;
    case 'lg':
      return 1024;
    case 'xl':
      return 1280;
    case '2xl':
      return 1536;
    default:
      return breakpoint;
  }
};

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

  /* 1 . is it Safari?  (Chrome & co. also contain “Safari/…”, so exclude them) */
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

type UseDeviceState = {
  isMobileScreen: boolean | undefined;
  isMobileUserAgent: boolean | undefined;
  isMobile: boolean | undefined;
  isIOS: boolean | undefined;
  isMac: boolean | undefined;
};

export const calculateIsMobile = (breakpoint: SizeType | number = 'md') => {
  const breakpointValue = getBreakpointFromSize(breakpoint);

  const isMobileUserAgent = checkIsMobileUserAgent();
  const isMobileScreen = checkIsMobileScreen(breakpointValue);
  const isMobile = isMobileScreen ?? isMobileUserAgent;
  const isIOS = checkIsIOS();
  const isMac = checkIsMac();

  return {
    isMobileScreen, // Is the screen width within a mobile breakpoint.
    isMobileUserAgent, // Is the user agent indicative of a mobile device.
    isMobile, // Combines both checks to determine if the device is mobile.
    isIOS, // Is the device running iOS (iPhone, iPad, iPod).
    isMac, // Is the device a Mac computer (macOS).
  };
};

export const useDevice = (breakpoint: SizeType | number = 'md') => {
  const [result, setResult] = useState<UseDeviceState>(
    calculateIsMobile(breakpoint)
  );

  useEffect(() => {
    const handleResize = () => {
      setResult(calculateIsMobile(breakpoint));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]); // Empty dependency array ensures this effect runs only once on mount

  return result;
};
