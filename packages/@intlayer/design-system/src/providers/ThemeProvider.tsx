'use client';

import {
  createContext,
  type FC,
  memo,
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

/** `localStorage` key holding the preference when none is provided. */
const DEFAULT_STORAGE_KEY = 'theme';

const isServer = typeof window === 'undefined';

/**
 * Inline bootstrap applying the persisted theme before the first paint.
 *
 * Serialized through `Function.prototype.toString()` and injected as an inline
 * `<script>`, so it must stay self-contained: no import, no module-scope
 * binding, no reference the bundler could rewrite into a helper call. Every
 * value it needs is passed as an argument.
 */
const themeScript = (
  storageKey: string,
  themeAttribute: string,
  darkMediaQuery: string
): void => {
  let storedTheme: string | null = null;

  try {
    storedTheme = localStorage.getItem(storageKey);
  } catch {
    // Storage can throw (private mode, blocked cookies) — fall back to the OS.
  }

  const theme =
    storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : window.matchMedia(darkMediaQuery).matches
        ? 'dark'
        : 'light';

  const element = document.documentElement;

  element.setAttribute(themeAttribute, theme);
  element.style.colorScheme = theme;
};

/** Reads the persisted preference, discarding unknown values. */
const getStoredTheme = (storageKey: string): Theme | undefined => {
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

  return undefined;
};

/** Resolves the OS colour scheme. */
const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light';

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
  /** OS colour scheme. `undefined` until the client resolves it. */
  systemTheme: ResolvedTheme | undefined;
  /** Persists a preference and applies it. */
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/** Served outside of a provider, so consumers render light instead of crashing. */
const fallbackThemeContext: ThemeContextValue = {
  theme: 'system',
  resolvedTheme: undefined,
  systemTheme: undefined,
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

type ThemeScriptProps = {
  storageKey: string;
  nonce?: string;
};

const ThemeScript: FC<ThemeScriptProps> = memo(({ storageKey, nonce }) => (
  <script
    suppressHydrationWarning
    // Browsers hide the nonce value from the DOM API, so echoing it while
    // hydrating would mismatch the server markup.
    nonce={isServer ? nonce : ''}
    // biome-ignore lint/security/noDangerouslySetInnerHtml: the bootstrap has to run before hydration, and its content is built from literals
    dangerouslySetInnerHTML={{
      __html: `(${themeScript})(${JSON.stringify(storageKey)},${JSON.stringify(THEME_ATTRIBUTE)},${JSON.stringify(DARK_MEDIA_QUERY)})`,
    }}
  />
));

const Theme: FC<PropsWithChildren<ThemeProviderProps>> = ({
  storageKey = DEFAULT_STORAGE_KEY,
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

  useIsomorphicLayoutEffect(() => {
    setThemeState(getStoredTheme(storageKey) ?? 'system');
    setSystemTheme(getSystemTheme());
  }, [storageKey]);

  // Follow the OS colour scheme.
  useEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? 'dark' : 'light');

    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Keep every tab of the app on the same theme.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;

      setThemeState(getStoredTheme(storageKey) ?? 'system');
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey]);

  // Mirror the resolved theme onto `<html>`.
  useIsomorphicLayoutEffect(() => {
    if (!resolvedTheme) return;

    const element = document.documentElement;

    // The inline script already applied it on the initial load.
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
    () => ({ theme, resolvedTheme, systemTheme, setTheme }),
    [theme, resolvedTheme, systemTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeScript storageKey={storageKey} nonce={nonce} />
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
