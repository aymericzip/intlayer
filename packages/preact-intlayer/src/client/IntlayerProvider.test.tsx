import { type FunctionComponent, type h, render } from 'preact';
import { memo } from 'preact/compat';
import { act } from 'preact/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

  const LocaleRecorder: FunctionComponent = () => {
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
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
  });

  afterEach(() => {
    render(null, container);
  });

  const renderProvider = (
    locale: string | undefined,
    consumer: h.JSX.Element
  ) =>
    act(() => {
      render(
        <IntlayerProviderContent locale={locale}>
          {consumer}
        </IntlayerProviderContent>,
        container
      );
    });

  it('renders consumers once with the new locale when the prop changes', () => {
    const { LocaleRecorder, renderedLocales } = createLocaleRecorder();
    const consumer = <LocaleRecorder />;

    renderProvider('en', consumer);
    renderedLocales.length = 0;

    renderProvider('fr', consumer);

    expect(renderedLocales).toEqual(['fr']);
  });

  it('does not re-render memoized consumers when nothing changed', () => {
    const { LocaleRecorder, renderedLocales } = createLocaleRecorder();
    const consumer = <LocaleRecorder />;

    renderProvider('en', consumer);
    renderedLocales.length = 0;

    renderProvider('en', consumer);

    expect(renderedLocales).toEqual([]);
  });

  it('updates the locale through the context when no prop is given', () => {
    const { LocaleRecorder, renderedLocales, setLocale } =
      createLocaleRecorder();

    renderProvider(undefined, <LocaleRecorder />);
    expect(renderedLocales.at(-1)).toBe('en');

    act(() => setLocale('es'));
    expect(renderedLocales.at(-1)).toBe('es');
  });
});
