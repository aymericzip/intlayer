import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  // Disable the fire-and-forget renderer imports at the top of plugins.tsx so
  // no module load can settle after the test environment is torn down.
  process.env['INTLAYER_NODE_TYPE_MARKDOWN'] = 'false';
  process.env['INTLAYER_NODE_TYPE_HTML'] = 'false';
});

const mockSolid = vi.hoisted(() => ({
  createMemo: vi.fn((fn: () => unknown) => fn),
  createResource: vi.fn(() => [vi.fn()] as const),
  useContext: vi.fn(() => undefined),
}));

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('solid-js', () => ({
  createMemo: mockSolid.createMemo,
  createResource: mockSolid.createResource,
  useContext: mockSolid.useContext,
  // plugins.tsx lazy-loads the editor ContentSelector at module scope.
  lazy: () => () => null,
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
  it('reserves a Solid resource slot and returns the static dictionary content', async () => {
    const { useDictionary } = await import('./useDictionary');

    const content = useDictionary(dictionary, 'en');

    expect(mockSolid.createResource).toHaveBeenCalledWith(
      expect.any(Function),
      {
        initialValue: dictionary,
        ssrLoadFrom: 'initial',
      }
    );
    expect(content.title.value).toBe('Title');
  });

  it('consumes exactly as many resource slots as the dynamic client helper', async () => {
    // Solid hydration ids are positional: both helpers must consume the same
    // number of resource slots per useIntlayer call site.
    const { useDictionary } = await import('./useDictionary');
    const { useDictionaryDynamic } = await import(
      '../client/useDictionaryDynamic'
    );
    const dictionaryLoaders = {
      en: () => Promise.resolve(dictionary),
    } satisfies StrictModeLocaleMap<() => Promise<typeof dictionary>>;

    mockSolid.createResource.mockClear();
    useDictionary(dictionary, 'en');
    const serverResourceCalls = mockSolid.createResource.mock.calls.length;

    mockSolid.createResource.mockClear();
    useDictionaryDynamic(dictionaryLoaders, 'landing', 'en');
    const dynamicResourceCalls = mockSolid.createResource.mock.calls.length;

    expect(serverResourceCalls).toBe(1);
    expect(dynamicResourceCalls).toBe(serverResourceCalls);
  });
});
