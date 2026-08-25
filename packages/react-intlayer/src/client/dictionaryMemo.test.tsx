import type { Dictionary } from '@intlayer/types/dictionary';
import { renderHook } from '@testing-library/react';
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
  analytics: { enabled: false },
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

vi.mock('../editor', () => ({
  ContentSelector: ({ children }: any) => children,
}));

vi.mock('../editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: any) => children,
}));

// Imported after mocks so that plugin modules pick up the mocked config.
import { useDictionary } from './useDictionary';
import { useDictionaryDynamic } from './useDictionaryDynamic';
import { preloadDynamic } from './useLoadDynamic';

const createDictionary = (key: string): Dictionary =>
  ({
    key,
    content: {
      title: {
        nodeType: 'translation',
        translation: { en: 'Hello', fr: 'Bonjour' },
      },
    },
  }) as unknown as Dictionary;

/**
 * The build optimization rewrites `useIntlayer('key')` into
 * `useDictionary(dictionary)`, whose `useMemo` only ever spans one component
 * instance. Sharing the interpreted tree across instances — and across the
 * unmount a page switch causes — is what the memo in `getDictionary` adds.
 */
describe('useDictionary memoization', () => {
  it('shares one interpreted tree between two component instances', () => {
    const dictionary = createDictionary('shared-across-components');

    const first = renderHook(() => useDictionary(dictionary, 'en'));
    const second = renderHook(() => useDictionary(dictionary, 'en'));

    expect(first.result.current).toBe(second.result.current);
  });

  it('survives the unmount a page switch causes', () => {
    const dictionary = createDictionary('across-unmount');

    const before = renderHook(() => useDictionary(dictionary, 'en'));
    const interpreted = before.result.current;
    before.unmount();

    const after = renderHook(() => useDictionary(dictionary, 'en'));

    expect(after.result.current).toBe(interpreted);
  });

  it('keeps one tree per locale', () => {
    const dictionary = createDictionary('per-locale');

    const english = renderHook(() => useDictionary(dictionary, 'en'));
    const french = renderHook(() => useDictionary(dictionary, 'fr'));

    expect(String(english.result.current.title)).toBe('Hello');
    expect(String(french.result.current.title)).toBe('Bonjour');
    expect(english.result.current).not.toBe(french.result.current);
  });
});

/**
 * `useDictionaryDynamic` interprets the loaded chunk on every render — it holds
 * no `useMemo` of its own — so without the memo in `getDictionary` a re-render
 * walked the whole dictionary again.
 */
describe('useDictionaryDynamic memoization', () => {
  it('does not re-interpret the chunk on re-render', async () => {
    const dictionary = createDictionary('dynamic-rerender');
    const loaders = { en: () => Promise.resolve(dictionary) } as any;

    // Fills the suspender cache so the read below never suspends.
    await preloadDynamic('dynamic-rerender.en', loaders.en);

    const { result, rerender } = renderHook(() =>
      useDictionaryDynamic(loaders, 'dynamic-rerender' as never, 'en')
    );
    const interpreted = result.current;

    rerender();

    expect(result.current).toBe(interpreted);
    expect(String(result.current.title)).toBe('Hello');
  });

  it('shares the interpreted chunk with a static read of the same dictionary', async () => {
    const dictionary = createDictionary('dynamic-and-static');
    const loaders = { en: () => Promise.resolve(dictionary) } as any;

    await preloadDynamic('dynamic-and-static.en', loaders.en);

    const dynamic = renderHook(() =>
      useDictionaryDynamic(loaders, 'dynamic-and-static' as never, 'en')
    );
    const staticRead = renderHook(() => useDictionary(dictionary, 'en'));

    expect(dynamic.result.current).toBe(staticRead.result.current);
  });
});
