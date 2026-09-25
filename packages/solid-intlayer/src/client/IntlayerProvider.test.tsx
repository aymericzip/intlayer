import { render } from '@solidjs/testing-library';
import { createRenderEffect, createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

vi.mock('./useLocaleStorage', () => ({
  localeInStorage: undefined,
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

describe('IntlayerProviderContent', () => {
  it('never renders the previous locale once the prop has changed', () => {
    const [localeProp, setLocaleProp] = createSignal('en');
    const renderedPairs: string[] = [];

    const LocaleRecorder = () => {
      const context = useIntlayerContext();
      // Render effects run before user effects, which is where a stale
      // context locale would show up next to the new prop.
      createRenderEffect(() => {
        renderedPairs.push(`${localeProp()}:${context?.locale()}`);
      });
      return null;
    };

    render(() => (
      <IntlayerProviderContent locale={localeProp()}>
        <LocaleRecorder />
      </IntlayerProviderContent>
    ));
    renderedPairs.length = 0;

    setLocaleProp('fr');

    expect(renderedPairs).not.toContain('fr:en');
    expect(renderedPairs.at(-1)).toBe('fr:fr');
  });
});
