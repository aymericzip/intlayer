import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  internationalization: { defaultLocale: 'en' },
}));

const mockSolid = vi.hoisted(() => ({
  currentLocale: 'en',
  useContext: vi.fn(() => ({
    locale: () => mockSolid.currentLocale,
  })),
}));

const mockHooks = vi.hoisted(() => ({
  useDictionary: vi.fn(),
  useLoadDynamic: vi.fn(),
  getDictionary: vi.fn((dictionary: Dictionary) => dictionary.content),
}));

vi.mock('@intlayer/config/built', () => ({
  internationalization: mockConfig.internationalization,
}));

vi.mock('solid-js', () => ({
  useContext: mockSolid.useContext,
}));

vi.mock('./IntlayerProvider', () => ({
  IntlayerClientContext: {},
}));

vi.mock('./useDictionary', () => ({
  useDictionary: mockHooks.useDictionary,
}));

vi.mock('./useLoadDynamic', () => ({
  useLoadDynamic: mockHooks.useLoadDynamic,
}));

// Mocked to keep the import graph free of `../plugins` (which pulls the Solid
// `lazy`/`Suspense` runtime that the `solid-js` mock above does not provide).
vi.mock('../getDictionary', () => ({
  getDictionary: mockHooks.getDictionary,
}));

const dictionary: Dictionary = {
  key: 'dictionary',
  content: { message: 'Loaded' },
};

const frenchDictionary: Dictionary = {
  key: 'dictionary',
  content: { message: 'Chargé' },
};

describe('useDictionaryDynamic', () => {
  beforeEach(() => {
    vi.resetModules();
    mockSolid.currentLocale = 'en';
    mockSolid.useContext.mockClear();
    mockHooks.useDictionary.mockReset();
    mockHooks.useLoadDynamic.mockReset();
    mockHooks.getDictionary.mockReset();
    mockHooks.getDictionary.mockImplementation(
      (dict: Dictionary) => dict.content
    );
    mockHooks.useLoadDynamic.mockReturnValue(dictionary);
    mockHooks.useDictionary.mockReturnValue({ message: { value: 'Loaded' } });
  });

  it('passes a reactive cache key and lazy dictionary loader to useLoadDynamic', async () => {
    const englishDictionaryLoader = vi.fn(() => Promise.resolve(dictionary));
    const frenchDictionaryLoader = vi.fn(() =>
      Promise.resolve(frenchDictionary)
    );
    const dictionaryLoaders = {
      en: englishDictionaryLoader,
      fr: frenchDictionaryLoader,
    } satisfies StrictModeLocaleMap<() => Promise<typeof dictionary>>;
    const { useDictionaryDynamic } = await import('./useDictionaryDynamic');

    useDictionaryDynamic(dictionaryLoaders, 'dictionary');

    expect(englishDictionaryLoader).not.toHaveBeenCalled();
    expect(frenchDictionaryLoader).not.toHaveBeenCalled();
    expect(mockHooks.useLoadDynamic).toHaveBeenCalledTimes(1);
    expect(mockHooks.useLoadDynamic).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function)
    );

    const dictionarySourceAccessor = mockHooks.useLoadDynamic.mock
      .calls[0]?.[0] as
      | (() => { cacheKey: string; locale: string })
      | undefined;
    const loadDictionary = mockHooks.useLoadDynamic.mock.calls[0]?.[1] as
      | ((source: { cacheKey: string; locale: string }) => Promise<Dictionary>)
      | undefined;

    expect(dictionarySourceAccessor?.()).toEqual({
      cacheKey: 'dictionary.en',
      locale: 'en',
    });
    await expect(
      loadDictionary?.(
        dictionarySourceAccessor?.() ?? { cacheKey: '', locale: '' }
      )
    ).resolves.toBe(dictionary);
    expect(englishDictionaryLoader).toHaveBeenCalledTimes(1);

    mockSolid.currentLocale = 'fr';

    expect(dictionarySourceAccessor?.()).toEqual({
      cacheKey: 'dictionary.fr',
      locale: 'fr',
    });
    await expect(
      loadDictionary?.(
        dictionarySourceAccessor?.() ?? { cacheKey: '', locale: '' }
      )
    ).resolves.toBe(frenchDictionary);
    expect(frenchDictionaryLoader).toHaveBeenCalledTimes(1);
    expect(mockHooks.useDictionary).toHaveBeenCalledWith(dictionary, undefined);
  });

  it('keeps an explicit locale fixed', async () => {
    const dictionaryLoader = vi.fn(() => Promise.resolve(dictionary));
    const dictionaryLoaders = {
      en: dictionaryLoader,
    } satisfies StrictModeLocaleMap<() => Promise<typeof dictionary>>;
    const { useDictionaryDynamic } = await import('./useDictionaryDynamic');

    useDictionaryDynamic(dictionaryLoaders, 'dictionary', 'en');

    const dictionarySourceAccessor = mockHooks.useLoadDynamic.mock
      .calls[0]?.[0] as
      | (() => { cacheKey: string; locale: string })
      | undefined;

    mockSolid.currentLocale = 'fr';

    expect(dictionarySourceAccessor?.()).toEqual({
      cacheKey: 'dictionary.en',
      locale: 'en',
    });
    expect(mockHooks.useDictionary).toHaveBeenCalledWith(dictionary, 'en');
  });

  it('rejects with context when a locale loader is missing', async () => {
    const dictionaryLoaders = {
      en: vi.fn(() => Promise.resolve(dictionary)),
    } satisfies StrictModeLocaleMap<() => Promise<typeof dictionary>>;
    const { useDictionaryDynamic } = await import('./useDictionaryDynamic');

    useDictionaryDynamic(dictionaryLoaders, 'dictionary');

    const loadDictionary = mockHooks.useLoadDynamic.mock.calls[0]?.[1] as
      | ((source: { cacheKey: string; locale: string }) => Promise<Dictionary>)
      | undefined;

    await expect(
      loadDictionary?.({ cacheKey: 'dictionary.fr', locale: 'fr' })
    ).rejects.toThrow(
      'No dynamic dictionary loader found for key "dictionary" and locale "fr".'
    );
  });

  // The qualified-loader-map path (collections / variants / meta records) uses
  // the real Solid resource + memo and is covered end-to-end in
  // `useDictionaryDynamic.integration.test.tsx`.
});
