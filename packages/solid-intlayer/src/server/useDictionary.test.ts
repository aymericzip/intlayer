import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  // Disable the fire-and-forget renderer imports at the top of plugins.tsx so
  // no module load can settle after the test environment is torn down.
  process.env.INTLAYER_NODE_TYPE_MARKDOWN = 'false';
  process.env.INTLAYER_NODE_TYPE_HTML = 'false';
});

const mockSolid = vi.hoisted(() => ({
  createMemo: vi.fn((fn: () => unknown) => fn),
  useContext: vi.fn(() => undefined),
}));

const mockCompat = vi.hoisted(() => ({
  createAsyncValue: vi.fn(() => () => undefined),
  trackAsyncValue: vi.fn(),
}));

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('solid-js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('solid-js')>();

  return {
    // Compiled JSX in the module graph needs the rest of the real runtime.
    ...actual,
    // Read by the compat layer's version check; absent (undefined) in Solid 2.
    createResource: actual.createResource,
    createMemo: mockSolid.createMemo,
    useContext: mockSolid.useContext,
    // plugins.tsx lazy-loads the editor ContentSelector at module scope.
    lazy: () => () => null,
  };
});

vi.mock('../solidCompat', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../solidCompat')>()),
  ...mockCompat,
}));

vi.mock('../client/IntlayerProvider', () => ({
  IntlayerClientContext: {},
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

const dictionary = {
  key: 'landing',
  content: { title: 'Title' },
} as const satisfies Dictionary;

describe('server useDictionary', () => {
  it('reserves a Solid async slot and returns the static dictionary content', async () => {
    const { useDictionary } = await import('./useDictionary');

    const content = useDictionary(dictionary, 'en');

    expect(mockCompat.createAsyncValue).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        initialValue: dictionary,
        ssrLoadFrom: 'initial',
      }
    );
    expect(content.title.value).toBe('Title');
  });

  it('consumes exactly as many async slots as the dynamic client helper', async () => {
    // Solid hydration ids are positional: both helpers must consume the same
    // number of async slots per useIntlayer call site.
    const { useDictionary } = await import('./useDictionary');
    const { useDictionaryDynamic } =
      await import('../client/useDictionaryDynamic');
    const dictionaryLoaders = {
      en: () => Promise.resolve(dictionary),
    } satisfies StrictModeLocaleMap<() => Promise<typeof dictionary>>;

    mockCompat.createAsyncValue.mockClear();
    mockCompat.trackAsyncValue.mockClear();
    useDictionary(dictionary, 'en');
    const serverAsyncCalls = mockCompat.createAsyncValue.mock.calls.length;
    const serverTrackCalls = mockCompat.trackAsyncValue.mock.calls.length;

    mockCompat.createAsyncValue.mockClear();
    mockCompat.trackAsyncValue.mockClear();
    useDictionaryDynamic(dictionaryLoaders, 'landing', 'en');
    const dynamicAsyncCalls = mockCompat.createAsyncValue.mock.calls.length;
    const dynamicTrackCalls = mockCompat.trackAsyncValue.mock.calls.length;

    expect(serverAsyncCalls).toBe(1);
    expect(dynamicAsyncCalls).toBe(serverAsyncCalls);
    expect(dynamicTrackCalls).toBe(serverTrackCalls);
  });
});
