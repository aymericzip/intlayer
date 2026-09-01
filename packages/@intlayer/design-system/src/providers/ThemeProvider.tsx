'use client';

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

/** Theme actually painted — the OS preference once `system` is resolved. */
export type ResolvedTheme = 'light' | 'dark';

/** Theme stored as the user preference. `system` follows the OS setting. */
export type Theme = ResolvedTheme | 'system';

/** Attribute mirrored on `<html>`; the Tailwind dark variant keys on it. */
const THEME_ATTRIBUTE = 'data-theme';

/** Media query resolving the OS colour scheme. */
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const isServer = typeof window === 'undefined';

/**
 * Inline bootstrap applying the persisted theme before the first paint.
 *
 * Held as source text rather than serialized from a real function through
 * `Function.prototype.toString()`: that echoes whatever formatting the bundler
 * emitted, and the SSR and browser bundles do not agree on it (tabs versus
 * spaces), so the two renders produced different script bodies and hydration
 * failed. A string literal is copied verbatim by every bundler.
 *
 * It runs before hydration, so it must stay self-contained: no import, no
 * module-scope binding. Every value it needs is passed as an argument.
 */
const THEME_SCRIPT_SOURCE = `(function (storageKey, themeAttribute, darkMediaQuery) {
  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    /* Storage can throw (private mode, blocked cookies) — fall back to the OS. */
  }
  var theme =
    storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : window.matchMedia(darkMediaQuery).matches
        ? 'dark'
        : 'light';
  var element = document.documentElement;
  element.setAttribute(themeAttribute, theme);
  element.style.colorScheme = theme;
})`;

/** Serializes the bootstrap and its arguments into inline script source. */
const buildBootstrap = (storageKey: string): string =>
  `${THEME_SCRIPT_SOURCE}(${JSON.stringify(storageKey)},${JSON.stringify(THEME_ATTRIBUTE)},${JSON.stringify(DARK_MEDIA_QUERY)})`;

/** Reads the persisted preference, discarding unknown values. */
const getStoredTheme = (storageKey: string): Theme => {
  try {
    const storedTheme = localStorage.getItem(storageKey);

    if (
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'system'
    ) {
      return storedTheme;
    }
  } catch {
    // Storage can throw (private mode, blocked cookies).
  }

  return 'system';
};

/**
 * Suppresses CSS transitions while the theme attribute flips, so every themed
 * element repaints at once instead of animating between palettes.
 *
 * @returns Callback restoring transitions, to call once the theme is applied.
 */
const suppressTransitions = (nonce?: string): (() => void) => {
  const style = document.createElement('style');

  if (nonce) style.setAttribute('nonce', nonce);

  style.appendChild(
    document.createTextNode('*,*::before,*::after{transition:none!important}')
  );
  document.head.appendChild(style);

  return () => {
    // Reading a computed value forces a synchronous style recalculation, so
    // the new theme is committed while transitions are still suppressed.
    getComputedStyle(document.body).getPropertyValue('transition');
    style.remove();
  };
};

const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

type ThemeContextValue = {
  /** Persisted preference — `system` while following the OS. */
  theme: Theme;
  /** Theme applied to `<html>`. `undefined` until the client resolves it. */
  resolvedTheme: ResolvedTheme | undefined;
  /** Persists a preference and applies it. */
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/** Served outside of a provider, so consumers render light instead of crashing. */
const fallbackThemeContext: ThemeContextValue = {
  theme: 'system',
  resolvedTheme: undefined,
  setTheme: () => undefined,
};

/**
 * Reads and updates the current theme.
 *
 * @example
 * ```tsx
 * const { resolvedTheme, setTheme } = useTheme();
 * ```
 */
export const useTheme = (): ThemeContextValue =>
  useContext(ThemeContext) ?? fallbackThemeContext;

export type ThemeProviderProps = {
  /** `localStorage` key holding the preference. Defaults to `theme`. */
  storageKey?: string;
  /** CSP nonce, required when the page forbids unsafe inline scripts. */
  nonce?: string;
};

const Theme: FC<PropsWithChildren<ThemeProviderProps>> = ({
  storageKey = 'theme',
  nonce,
  children,
}) => {
  // Both the server render and the first client one start from `system`, so
  // the hydrated markup matches; the browser state is read back before paint.
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme | undefined>(
    undefined
  );

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Read the browser state back before the first paint, then keep following
  // the OS preference and the other tabs.
  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY);

    setThemeState(getStoredTheme(storageKey));
    setSystemTheme(media.matches ? 'dark' : 'light');

    const handleSystemChange = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? 'dark' : 'light');

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== storageKey) return;

      setThemeState(getStoredTheme(storageKey));
    };

    media.addEventListener('change', handleSystemChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      media.removeEventListener('change', handleSystemChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey]);

  // Mirror the resolved theme onto `<html>`.
  useIsomorphicLayoutEffect(() => {
    if (!resolvedTheme) return;

    const element = document.documentElement;

    // The inline bootstrap already applied it on the initial load.
    if (element.getAttribute(THEME_ATTRIBUTE) === resolvedTheme) return;

    const restoreTransitions = suppressTransitions(nonce);

    element.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
    element.style.colorScheme = resolvedTheme;

    restoreTransitions();
  }, [resolvedTheme, nonce]);

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Storage can throw — the choice then only lasts for this page.
      }
    },
    [storageKey]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <script
        // Browsers hide the nonce value from the DOM API, so echoing it while
        // hydrating would mismatch the server markup — hence the suppression.
        // The script has already run by then; React never patches it.
        suppressHydrationWarning
        nonce={isServer ? nonce : ''}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: the bootstrap has to run before hydration, and its content is built from literals
        dangerouslySetInnerHTML={{ __html: buildBootstrap(storageKey) }}
      />
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Applies the persisted theme to `<html>` before the first paint, keeps it in
 * sync with the OS preference and with the other tabs, and exposes it through
 * {@link useTheme}.
 *
 * Nested providers pass through, so a layout can mount one without fighting an
 * outer provider over the `<html>` attribute.
 */
export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  ...props
}) => {
  const parentTheme = useContext(ThemeContext);

  if (parentTheme) return <>{children}</>;

  return <Theme {...props}>{children}</Theme>;
};
