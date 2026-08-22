import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { FC } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

/** jsdom ships no `matchMedia`, and the provider follows the OS preference. */
class MediaQueryListMock extends EventTarget {
  matches = false;
  media = '';
}

const mediaQueryList = new MediaQueryListMock();

/** Flips the OS preference and notifies the provider. */
const setSystemPreference = (isDark: boolean) => {
  mediaQueryList.matches = isDark;

  const changeEvent = new Event('change');

  Object.defineProperty(changeEvent, 'matches', { value: isDark });
  mediaQueryList.dispatchEvent(changeEvent);
};

const getAppliedTheme = () =>
  document.documentElement.getAttribute('data-theme');

const getProbeValue = (testId: string) =>
  screen.getByTestId(testId).textContent;

const ThemeProbe: FC = () => {
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme ?? 'none'}</span>
      <span data-testid="system-theme">{systemTheme ?? 'none'}</span>
      <button type="button" onClick={() => setTheme('light')}>
        pick light
      </button>
      <button type="button" onClick={() => setTheme('system')}>
        pick system
      </button>
    </div>
  );
};

beforeEach(() => {
  mediaQueryList.matches = false;
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.colorScheme = '';

  window.matchMedia = ((query: string) => {
    mediaQueryList.media = query;

    return mediaQueryList;
  }) as unknown as typeof window.matchMedia;
});

describe('ThemeProvider', () => {
  test('applies the persisted theme to <html>', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(getAppliedTheme()).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(getProbeValue('theme')).toBe('dark');
    expect(getProbeValue('resolved-theme')).toBe('dark');
  });

  test('falls back to the OS preference when nothing is persisted', () => {
    mediaQueryList.matches = true;

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(getAppliedTheme()).toBe('dark');
    expect(getProbeValue('theme')).toBe('system');
    expect(getProbeValue('system-theme')).toBe('dark');
  });

  test('discards an unknown persisted value', () => {
    localStorage.setItem('theme', 'sepia');

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(getProbeValue('theme')).toBe('system');
    expect(getAppliedTheme()).toBe('light');
  });

  test('persists and applies the theme picked by the user', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'pick light' }));

    expect(getAppliedTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('follows the OS preference while set to system', async () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(getAppliedTheme()).toBe('light');

    setSystemPreference(true);

    await waitFor(() => expect(getAppliedTheme()).toBe('dark'));
    expect(getProbeValue('resolved-theme')).toBe('dark');
  });

  test('ignores the OS preference while set to an explicit theme', async () => {
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    setSystemPreference(true);

    await waitFor(() => expect(getProbeValue('system-theme')).toBe('dark'));
    expect(getAppliedTheme()).toBe('light');
  });

  test('reads the theme back from the storage key it was given', () => {
    localStorage.setItem('intlayer-theme', 'dark');

    render(
      <ThemeProvider storageKey="intlayer-theme">
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(getAppliedTheme()).toBe('dark');
  });

  test('picks up a theme changed by another tab', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    localStorage.setItem('theme', 'dark');
    fireEvent(window, new StorageEvent('storage', { key: 'theme' }));

    expect(getAppliedTheme()).toBe('dark');
  });

  test('passes nested providers through, emitting a single bootstrap', () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeProvider storageKey="ignored">
          <ThemeProbe />
        </ThemeProvider>
      </ThemeProvider>
    );

    expect(container.querySelectorAll('script')).toHaveLength(1);
  });

  test('drops the CSP nonce from the hydrated markup', () => {
    const { container } = render(
      <ThemeProvider nonce="test-nonce">
        <ThemeProbe />
      </ThemeProvider>
    );

    // Browsers hide the nonce value from the DOM, so only the server emits it.
    expect(container.querySelector('script')?.getAttribute('nonce')).toBe('');
  });
});

describe('theme bootstrap script', () => {
  /** Runs the serialized bootstrap the way the browser would, before hydration. */
  const runBootstrap = (container: HTMLElement) => {
    const source = container.querySelector('script')?.innerHTML ?? '';

    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';

    new Function(source)();
  };

  test('applies the persisted theme', () => {
    localStorage.setItem('theme', 'dark');

    const { container } = render(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );

    runBootstrap(container);

    expect(getAppliedTheme()).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  test('applies the OS preference when nothing is persisted', () => {
    mediaQueryList.matches = true;

    const { container } = render(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );

    runBootstrap(container);

    expect(getAppliedTheme()).toBe('dark');
  });

  test('reads the storage key it was given', () => {
    localStorage.setItem('intlayer-theme', 'dark');

    const { container } = render(
      <ThemeProvider storageKey="intlayer-theme">
        <div />
      </ThemeProvider>
    );

    runBootstrap(container);

    expect(getAppliedTheme()).toBe('dark');
  });
});
