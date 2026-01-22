/**
 * Applies necessary polyfills for React Native to support Intlayer.
 *
 * This includes polyfilling `structuredClone` if it is missing,
 * and providing no-op implementations for standard DOM `window` methods
 * (`addEventListener`, `removeEventListener`, `postMessage`)
 * to ensure compatibility with libraries that expect a browser-like environment.
 */
export const intlayerPolyfill = () => {
  if (typeof global.structuredClone !== 'function') {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
  }

  if (typeof window !== 'undefined') {
    if (typeof window.addEventListener !== 'function') {
      window.addEventListener = () => null;
    }
    if (typeof window.removeEventListener !== 'function') {
      window.removeEventListener = () => null;
    }
    if (typeof window.postMessage !== 'function') {
      window.postMessage = () => null;
    }
  }
};
