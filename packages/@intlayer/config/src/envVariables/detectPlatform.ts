export type Platform = 'next' | 'vite' | 'react_app' | 'unknown';

export const getPlatform = (): Platform => {
  if (
    typeof import.meta !== 'undefined' &&
    typeof import.meta.env !== 'undefined' &&
    typeof import.meta.env.VITE_INTLAYER_DEFAULT_LOCALE !== 'undefined'
  ) {
    // Likely Vite
    return 'vite';
  } else if (
    typeof process.env.NEXT_PUBLIC_INTLAYER_DEFAULT_LOCALE !== 'undefined'
  ) {
    // Likely Next.js
    return 'next';
  } else if (
    typeof process.env.REACT_APP_INTLAYER_DEFAULT_LOCALE !== 'undefined'
  ) {
    // Likely Create React App
    return 'react_app';
  }

  return 'unknown';
};

/**
 * Get the prefix for the environment variables to be used in the platform
 */
export const getPrefix = (platform: Platform): string => {
  switch (platform) {
    case 'next':
      return 'NEXT_PUBLIC_INTLAYER_';
    case 'vite':
      return 'VITE_INTLAYER_';
    case 'react_app':
      return 'REACT_APP_INTLAYER_';
    default:
      return 'INTLAYER_';
  }
};
