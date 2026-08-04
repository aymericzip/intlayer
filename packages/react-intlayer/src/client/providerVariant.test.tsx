import type { QualifiedDictionaryGroup } from '@intlayer/types/dictionary';
import { renderHook } from '@testing-library/react';
import type { FC, PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  process.env.INTLAYER_NODE_TYPE_MARKDOWN = 'false';
  process.env.INTLAYER_NODE_TYPE_HTML = 'false';
});

// ---------------------------------------------------------------------------
// Mocks – must be declared before any imports that transitively load them.
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

// The provider reads persisted locale at module scope; the variant resolution
// under test is independent of it, so it is stubbed out entirely.
vi.mock('./useLocaleStorage', () => ({
  localeInStorage: undefined,
  setLocaleInStorage: () => undefined,
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

vi.mock('../editor', () => ({
  ContentSelector: ({ children }: any) => children,
}));

vi.mock('../editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: any) => children,
}));

vi.mock('../editor/EditorProvider', () => ({
  EditorProvider: () => null,
}));

vi.mock('../analytics/AnalyticsProvider', () => ({
  AnalyticsProvider: () => null,
}));

// Imported after mocks so that plugin modules pick up the mocked config.
import { IntlayerProviderContent } from './IntlayerProvider';
import { useDictionary } from './useDictionary';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/**
 * A key that overrides only `school2` — `school1` is intentionally absent so
 * the sparse-override fallback to `default` is exercised.
 */
const heroGroup = {
  key: 'hero',
  qualifierTypes: ['variant'],
  content: {
    default: { title: 'Generic' },
    school2: { title: 'School 2' },
  },
} satisfies QualifiedDictionaryGroup;

/** A second key, used to check that a per-key map addresses keys separately. */
const footerGroup = {
  key: 'footer',
  qualifierTypes: ['variant'],
  content: {
    default: { title: 'Generic footer' },
    school1: { title: 'School 1 footer' },
  },
} satisfies QualifiedDictionaryGroup;

const makeWrapper = (
  providerProps: Parameters<typeof IntlayerProviderContent>[0]
): FC<PropsWithChildren> => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <IntlayerProviderContent {...providerProps}>
      {children}
    </IntlayerProviderContent>
  );

  return Wrapper;
};

/**
 * Renders the hook under a provider and returns the resolved `title` as a
 * plain string — the interpreter wraps leaves in an `IntlayerNode`.
 */
const readTitle = (
  group: QualifiedDictionaryGroup,
  providerProps: Parameters<typeof IntlayerProviderContent>[0],
  selector?: any
): string => {
  const { result } = renderHook(() => useDictionary(group as any, selector), {
    wrapper: makeWrapper(providerProps),
  });

  return String((result.current as unknown as { title: unknown }).title);
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('IntlayerProvider variant', () => {
  it('should resolve the default entry when the provider pins no variant', () => {
    expect(readTitle(heroGroup, { locale: 'en' })).toBe('Generic');
  });

  it('should apply a bare provider variant to a call that passes nothing', () => {
    expect(readTitle(heroGroup, { locale: 'en', variant: 'school2' })).toBe(
      'School 2'
    );
  });

  it('should fall back to default for a key that does not declare the variant', () => {
    // `hero` declares no `school1` entry, so it falls back to its `default`.
    expect(readTitle(heroGroup, { locale: 'en', variant: 'school1' })).toBe(
      'Generic'
    );
  });

  it('should walk a provider chain and pick the first declared entry', () => {
    expect(
      readTitle(heroGroup, { locale: 'en', variant: ['school1', 'school2'] })
    ).toBe('School 2');
  });

  it('should resolve a per-key map against each key independently', () => {
    const variant = { hero: 'school2', footer: 'school1' };

    expect(readTitle(heroGroup, { locale: 'en', variant })).toBe('School 2');
    expect(readTitle(footerGroup, { locale: 'en', variant })).toBe(
      'School 1 footer'
    );
  });

  it('should cover unlisted keys with the reserved default entry of the map', () => {
    const variant = { footer: 'school1', default: 'school2' };

    expect(readTitle(heroGroup, { locale: 'en', variant })).toBe('School 2');
  });

  it('should let a call-site variant override the provider one', () => {
    expect(
      readTitle(
        heroGroup,
        { locale: 'en', variant: 'school2' },
        { variant: 'school1' }
      )
    ).toBe('Generic');
  });

  it('should keep applying the provider variant alongside an unrelated selector', () => {
    // The selector pins a locale but no variant, so the provider still applies.
    expect(
      readTitle(
        heroGroup,
        { locale: 'en', variant: 'school2' },
        { locale: 'en' }
      )
    ).toBe('School 2');
  });
});
