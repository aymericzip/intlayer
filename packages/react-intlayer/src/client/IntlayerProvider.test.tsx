import { act, render } from '@testing-library/react';
import { type FC, memo } from 'react';
import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr', 'es'] },
}));

vi.mock('./useLocaleStorage', () => ({
  localeInStorage: undefined,
  setLocaleInStorage: () => undefined,
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

vi.mock('../editor/EditorProvider', () => ({
  EditorProvider: () => null,
}));

vi.mock('../analytics/AnalyticsProvider', () => ({
  AnalyticsProvider: () => null,
}));

import {
  IntlayerProviderContent,
  useIntlayerContext,
} from './IntlayerProvider';

/** Consumer that records the locale of every render it goes through. */
const createLocaleRecorder = () => {
  const renderedLocales: string[] = [];
  let setLocaleFromContext: (locale: string) => void = () => undefined;

  const LocaleRecorder: FC = () => {
    const { locale, setLocale } = useIntlayerContext();
    renderedLocales.push(String(locale));
    setLocaleFromContext = setLocale;
    return null;
  };

  return {
    LocaleRecorder: memo(LocaleRecorder),
    renderedLocales,
    setLocale: (locale: string) => setLocaleFromContext(locale),
  };
};

describe('IntlayerProviderContent', () => {
  it('renders consumers once with the new locale when the prop changes', () => {
    const { LocaleRecorder, renderedLocales } = createLocaleRecorder();

    const { rerender } = render(
      <IntlayerProviderContent locale="en">
        <LocaleRecorder />
      </IntlayerProviderContent>
    );
    renderedLocales.length = 0;

    rerender(
      <IntlayerProviderContent locale="fr">
        <LocaleRecorder />
      </IntlayerProviderContent>
    );

    expect(renderedLocales).toEqual(['fr']);
  });

  it('does not re-render memoized consumers when nothing changed', () => {
    const { LocaleRecorder, renderedLocales } = createLocaleRecorder();
    const consumer = <LocaleRecorder />;

    const { rerender } = render(
      <IntlayerProviderContent locale="en">{consumer}</IntlayerProviderContent>
    );
    renderedLocales.length = 0;

    rerender(
      <IntlayerProviderContent locale="en">{consumer}</IntlayerProviderContent>
    );

    expect(renderedLocales).toEqual([]);
  });

  it('keeps a locale set through the context until the prop changes', () => {
    const { LocaleRecorder, renderedLocales, setLocale } =
      createLocaleRecorder();

    const { rerender } = render(
      <IntlayerProviderContent locale="en">
        <LocaleRecorder />
      </IntlayerProviderContent>
    );

    act(() => setLocale('es'));
    expect(renderedLocales.at(-1)).toBe('es');

    rerender(
      <IntlayerProviderContent locale="en">
        <LocaleRecorder />
      </IntlayerProviderContent>
    );
    expect(renderedLocales.at(-1)).toBe('es');

    rerender(
      <IntlayerProviderContent locale="fr">
        <LocaleRecorder />
      </IntlayerProviderContent>
    );
    expect(renderedLocales.at(-1)).toBe('fr');
  });
});
