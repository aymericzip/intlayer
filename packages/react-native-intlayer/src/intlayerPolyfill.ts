/**
 * Applies necessary polyfills for React Native to support Intlayer.
 *
 * This includes:
 * - Polyfilling `structuredClone` if it is missing.
 * - Providing no-op implementations for standard DOM `window` methods
 *   (`addEventListener`, `removeEventListener`, `postMessage`) and a stub
 *   `window.location`, which React Native leaves undefined.
 * - Providing in-memory stubs for `document.cookie`, `localStorage`, and
 *   `sessionStorage` so that `@intlayer/core`'s locale-storage helpers work
 *   without crashing in a React Native environment.
 *
 * Note: These stubs are in-memory only. The locale selection will survive
 * hot-reloads but not full app restarts. To persist across restarts, pass a
 * custom `setLocale` to `<IntlayerProvider>` backed by AsyncStorage.
 */
const createStorage = () => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      for (const key in store) {
        delete store[key];
      }
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
};

export const intlayerPolyfill = () => {
  if (typeof global.structuredClone !== 'function') {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
  }

  if (typeof window !== 'undefined') {
    const noop = () => null;
    if (typeof window.addEventListener !== 'function') {
      window.addEventListener = noop;
    }
    if (typeof window.removeEventListener !== 'function') {
      window.removeEventListener = noop;
    }
    if (typeof window.postMessage !== 'function') {
      window.postMessage = noop;
    }

    // React Native defines `window` (aliased to `global`) but leaves
    // `window.location` undefined. Any library reading `window.location.href`
    // — a very common `typeof window !== 'undefined'` guard pattern — then
    // crashes with `Cannot read property 'href' of undefined`, often at module
    // evaluation time, before any component renders.
    if (typeof window.location === 'undefined') {
      const appOrigin = 'http://localhost';

      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
          href: `${appOrigin}/`,
          origin: appOrigin,
          protocol: 'http:',
          host: 'localhost',
          hostname: 'localhost',
          port: '',
          pathname: '/',
          search: '',
          hash: '',
          assign: noop,
          replace: noop,
          reload: noop,
          toString: () => `${appOrigin}/`,
        },
      });
    }
  }

  // `@intlayer/core`'s localeStorageOptions accesses document.cookie directly.
  // In React Native native, `document` is undefined — we provide a minimal
  // in-memory cookie jar so reads/writes work without throwing.
  //
  // We guard with `navigator.product === 'ReactNative'` to avoid installing
  // the stub in SSR / Expo Web pre-render contexts where `document` is also
  // undefined (Node.js) but browser code will later need the real DOM object
  // (e.g. document.createElement called by third-party RN libraries on web).
  const isNativeReactNative =
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { product?: string }).product === 'ReactNative';

  if (typeof document === 'undefined' && isNativeReactNative) {
    let cookieJar = '';
    Object.defineProperty(global, 'document', {
      configurable: true,
      get: () => ({
        get cookie() {
          return cookieJar;
        },
        set cookie(value: string) {
          // Simplified cookie setter: just append/overwrite the key
          const [pair] = value.split(';');
          const [key, val] = pair?.split('=') ?? [];
          const name = key?.trim();
          const existing = cookieJar
            .split(';')
            .filter((c) => !c.trim().startsWith(`${name}=`))
            .filter(Boolean);
          cookieJar = [...existing, `${name}=${val ?? ''}`].join('; ');
        },
        documentElement: { lang: '', dir: 'ltr', style: {} },
        createElement: () => null,
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }),
    });
  }

  if (typeof localStorage === 'undefined') {
    Object.defineProperty(global, 'localStorage', {
      configurable: true,
      value: createStorage(),
    });
  }

  if (typeof sessionStorage === 'undefined') {
    Object.defineProperty(global, 'sessionStorage', {
      configurable: true,
      value: createStorage(),
    });
  }
};
