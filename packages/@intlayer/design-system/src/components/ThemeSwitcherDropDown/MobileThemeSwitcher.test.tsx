import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { MobileThemeSwitcher } from './MobileThemeSwitcher';
import type { Modes } from './types';

/** Taps the button, whichever icon currently shows through. */
const tap = (container: HTMLElement) => {
  const icon = container.querySelector('svg');

  if (!icon) throw new Error('no icon rendered');

  fireEvent.click(icon);
};

describe('MobileThemeSwitcher', () => {
  test.each<[Modes, Modes]>([
    ['system', 'light'],
    ['light', 'dark'],
    ['dark', 'system'],
  ])('cycles %s to %s', (theme, expected) => {
    const setTheme = vi.fn();
    const { container } = render(
      <MobileThemeSwitcher theme={theme} setTheme={setTheme} />
    );

    tap(container);

    expect(setTheme).toHaveBeenCalledWith(expected);
  });

  test('shows the icon of the current mode', () => {
    const { container } = render(
      <MobileThemeSwitcher theme="dark" setTheme={vi.fn()} />
    );

    const currentIcon = container.querySelector('[data-mode="dark"]');

    expect(currentIcon?.getAttribute('class')).toContain('opacity-100');
  });
});
