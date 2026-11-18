import { render } from '@solidjs/testing-library';
import * as Solid from 'solid-js';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { isSolidTwo } from '../solidCompat';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

vi.mock('./useLocaleStorage', () => ({
  localeInStorage: undefined,
  getLocaleInStorage: () => undefined,
  setLocaleInStorage: () => undefined,
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

import {
  IntlayerProviderContent,
  useIntlayerContext,
} from './IntlayerProvider';

/** Solid 2 runtime members missing from the Solid 1 declarations. */
type SolidTwoTestRuntime = {
  flush: () => void;
  createRenderEffect: <T>(compute: () => T, effect: (value: T) => void) => void;
};

/** Applies pending writes now: Solid 2 batches them until the next flush. */
const flushUpdates = (): void => {
  if (isSolidTwo) (Solid as unknown as SolidTwoTestRuntime).flush();
};

/** Calls `onRender` with `read()` in the render phase, on every change. */
const createRenderRecorder = <T,>(
  read: () => T,
  onRender: (value: T) => void
): void => {
  if (isSolidTwo) {
    (Solid as unknown as SolidTwoTestRuntime).createRenderEffect(
      read,
      onRender
    );
    return;
  }

  Solid.createRenderEffect(() => onRender(read()));
};

describe('IntlayerProviderContent', () => {
  it('never renders the previous locale once the prop has changed', () => {
    const [localeProp, setLocaleProp] = createSignal('en');
    const renderedPairs: string[] = [];

    const LocaleRecorder = () => {
      const context = useIntlayerContext();
      // Render effects run before user effects, which is where a stale
      // context locale would show up next to the new prop.
      createRenderRecorder(
        () => `${localeProp()}:${context?.locale()}`,
        (pair) => {
          renderedPairs.push(pair);
        }
      );
      return null;
    };

    render(() => (
      <IntlayerProviderContent locale={localeProp()}>
        <LocaleRecorder />
      </IntlayerProviderContent>
    ));
    renderedPairs.length = 0;

    setLocaleProp('fr');
    flushUpdates();

    expect(renderedPairs).not.toContain('fr:en');
    expect(renderedPairs.at(-1)).toBe('fr:fr');
  });
});
