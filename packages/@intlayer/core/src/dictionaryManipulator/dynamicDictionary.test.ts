import { PRELOADED_DYNAMIC_KEY } from '@intlayer/config/defaultValues';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { describe, expect, it, vi } from 'vitest';
import {
  createChunkSuspenseCache,
  createDynamicContentStore,
  type DynamicChunkTransform,
  type DynamicLoaderMap,
  getDynamicChunkArgument,
  loadDynamicDictionary,
  loadingContentPlaceholder,
  resolveDictionaryRead,
  resolveDynamicContent,
  resolveDynamicContentAsync,
} from './dynamicDictionary';
import type { PlainDynamicLoaderMap } from './plainDynamicLoader';
import {
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
} from './qualifiedDynamicLoader';

vi.mock('@intlayer/config/built', () => {
  const config = {
    internationalization: {
      defaultLocale: 'en',
      locales: ['en', 'fr', 'fr-CA'],
      requiredLocales: ['en'],
    },
  };
  return { ...config, default: config };
});

/** One locale chunk of the `greeting` dictionary, as emitted by the build. */
const createChunk = (title: string, metadata?: object): Dictionary => ({
  key: 'greeting',
  content: { title },
  ...(metadata ? { metadata } : {}),
});

/** Plain loader map whose loaders count their calls. */
const createPlainLoaderMap = (
  chunks: Record<string, Dictionary>
): {
  loaderMap: PlainDynamicLoaderMap;
  loader: ReturnType<typeof vi.fn>;
} => {
  const loader = vi.fn((locale: string) => Promise.resolve(chunks[locale]!));

  const loaderMap = Object.fromEntries(
    Object.keys(chunks).map((locale) => [locale, () => loader(locale)])
  ) as PlainDynamicLoaderMap;

  return { loaderMap, loader };
};

/** Returns the raw content, ignoring the locale: interpretation is covered elsewhere. */
const readContent: DynamicChunkTransform<unknown> = (dictionary, argument) =>
  typeof argument === 'object' && argument.metadataOnly
    ? dictionary.metadata
    : dictionary.content;

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

const readSync = (
  loaderMap: DynamicLoaderMap,
  locale: LocalesValues,
  selector?: DictionarySelector
) =>
  resolveDynamicContent({
    loaderMap,
    key: 'greeting',
    locale,
    selector,
    loadChunk: () => {
      throw new Error('loadChunk should not be called');
    },
    transform: readContent,
  });

describe('resolveDictionaryRead', () => {
  it('should let the call-site locale win over the context locale', () => {
    expect(
      resolveDictionaryRead({
        localeOrSelector: 'fr',
        contextLocale: 'en',
        dictionaryKey: 'greeting',
      })
    ).toEqual({ locale: 'fr' });
  });

  it('should follow the context locale when the call pins none', () => {
    const resolveFor = (contextLocale: LocalesValues) =>
      resolveDictionaryRead({
        localeOrSelector: { metadataOnly: true },
        contextLocale,
        dictionaryKey: 'greeting',
      });

    expect(resolveFor('en').locale).toBe('en');
    expect(resolveFor('fr').locale).toBe('fr');
    expect(resolveFor('fr').selector).toMatchObject({ metadataOnly: true });
  });

  it('should layer the provider variant under the call-site selector', () => {
    expect(
      resolveDictionaryRead({
        localeOrSelector: { item: 2 },
        contextLocale: 'en',
        contextVariant: { greeting: 'promo' },
        dictionaryKey: 'greeting',
      }).selector
    ).toEqual({ item: 2, locale: 'en', variant: 'promo' });
  });

  it('should fall back to the default locale without any context', () => {
    expect(resolveDictionaryRead({ dictionaryKey: 'greeting' }).locale).toBe(
      'en'
    );
  });
});

describe('getDynamicChunkArgument', () => {
  it('should pass the bare locale unless metadata is requested', () => {
    expect(getDynamicChunkArgument('fr', { item: 1 })).toBe('fr');
    expect(getDynamicChunkArgument('fr', { metadataOnly: true })).toEqual({
      locale: 'fr',
      metadataOnly: true,
    });
  });
});

describe('plain loader maps', () => {
  it('should serve a missing locale through the static fallback chain', async () => {
    const { loaderMap, loader } = createPlainLoaderMap({
      en: createChunk('Hello'),
      fr: createChunk('Bonjour'),
    });

    const read = (locale: LocalesValues) =>
      resolveDynamicContentAsync({
        loaderMap,
        key: 'greeting',
        locale,
        transform: readContent,
      });

    expect(await read('fr-CA')).toEqual({ title: 'Bonjour' });
    expect(await read('de' as LocalesValues)).toEqual({ title: 'Hello' });
    expect(loader).toHaveBeenCalledWith('fr');
    expect(loader).toHaveBeenCalledWith('en');
  });

  it('should resolve to null when the map holds no chunk at all', async () => {
    expect(
      await resolveDynamicContentAsync({
        loaderMap: {},
        key: 'greeting',
        locale: 'fr',
        transform: readContent,
      })
    ).toBeNull();
  });

  it('should read a preloaded chunk synchronously, without suspending', () => {
    const { loaderMap, loader } = createPlainLoaderMap({
      en: createChunk('Hello'),
    });
    (loaderMap as Record<string, unknown>)[PRELOADED_DYNAMIC_KEY] = {
      locale: 'en',
      dictionary: createChunk('Preloaded'),
    };

    expect(readSync(loaderMap, 'en')).toEqual({ title: 'Preloaded' });
    expect(loader).not.toHaveBeenCalled();
  });

  it('should pass metadataOnly on to the transform', async () => {
    const { loaderMap } = createPlainLoaderMap({
      en: createChunk('Hello', { title: 'Meta' }),
    });

    expect(
      await resolveDynamicContentAsync({
        loaderMap,
        key: 'greeting',
        locale: 'en',
        selector: { metadataOnly: true },
        transform: readContent,
      })
    ).toEqual({ title: 'Meta' });
  });

  it('should load the raw chunk through the fallback chain', async () => {
    const { loaderMap } = createPlainLoaderMap({ en: createChunk('Hello') });

    expect(await loadDynamicDictionary(loaderMap, 'fr')).toEqual(
      createChunk('Hello')
    );
    expect(await loadDynamicDictionary({}, 'fr')).toBeUndefined();
  });
});

describe('qualified loader maps', () => {
  it('should transform every entry of a collection with the chunk argument', async () => {
    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['item'],
      en: {
        '2': () => Promise.resolve(createChunk('Second', { slug: 'second' })),
        '1': () => Promise.resolve(createChunk('First', { slug: 'first' })),
      },
    };

    expect(
      await resolveDynamicContentAsync({
        loaderMap,
        key: 'greeting',
        locale: 'en',
        selector: { metadataOnly: true },
        transform: readContent,
      })
    ).toEqual([{ slug: 'first' }, { slug: 'second' }]);
  });
});

describe('createDynamicContentStore', () => {
  const createStore = () => createDynamicContentStore(readContent);

  it('should answer synchronously once a read has loaded', async () => {
    const store = createStore();
    const { loaderMap } = createPlainLoaderMap({ en: createChunk('Hello') });
    const read = { loaderMap, key: 'greeting', locale: 'en' as const };

    expect(store.peek(read)).toBeUndefined();

    await store.load(read);

    expect(store.peek(read)).toEqual({ content: { title: 'Hello' } });
  });

  it('should share one load between concurrent reads', async () => {
    const store = createStore();
    const { loaderMap, loader } = createPlainLoaderMap({
      en: createChunk('Hello'),
    });
    const read = { loaderMap, key: 'greeting', locale: 'en' as const };

    await Promise.all([store.load(read), store.load({ ...read })]);

    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('should never serve a hot-reloaded entry point from the previous map', async () => {
    const store = createStore();
    const previous = createPlainLoaderMap({ en: createChunk('Before') });
    const next = createPlainLoaderMap({ en: createChunk('After') });

    await store.load({
      loaderMap: previous.loaderMap,
      key: 'greeting',
      locale: 'en',
    });

    expect(
      store.peek({ loaderMap: next.loaderMap, key: 'greeting', locale: 'en' })
    ).toBeUndefined();
  });

  it('should retry a read whose load failed', async () => {
    const store = createStore();
    const loader = vi
      .fn<() => Promise<Dictionary>>()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce(createChunk('Hello'));
    const read = {
      loaderMap: { en: loader } as PlainDynamicLoaderMap,
      key: 'greeting',
      locale: 'en' as const,
    };

    await expect(store.load(read)).rejects.toThrow('network');
    expect(await store.load(read)).toEqual({ title: 'Hello' });
  });

  it('should answer a missed coordinate without loading', () => {
    expect(
      createStore().peek({ loaderMap: {}, key: 'greeting', locale: 'en' })
    ).toEqual({ content: null });
  });
});

describe('createReader', () => {
  it('should answer synchronously once loaded, and report a load through onLoad', async () => {
    const store = createDynamicContentStore(readContent);
    const { loaderMap } = createPlainLoaderMap({ en: createChunk('Hello') });
    const read = store.createReader(loaderMap, 'greeting');
    const onLoad = vi.fn();

    expect(read({ contextLocale: 'en' }, onLoad)).toBeUndefined();
    await flushPromises();

    expect(onLoad).toHaveBeenCalledWith({ title: 'Hello' });
    expect(read({ contextLocale: 'en' }, onLoad)).toEqual({
      content: { title: 'Hello' },
    });
  });

  it('should drop a load superseded by a newer read', async () => {
    const store = createDynamicContentStore(readContent);
    const { loaderMap } = createPlainLoaderMap({
      en: createChunk('Hello'),
      fr: createChunk('Bonjour'),
    });
    const read = store.createReader(loaderMap, 'greeting');
    const onLoad = vi.fn();

    read({ contextLocale: 'en' }, onLoad);
    read({ contextLocale: 'fr' }, onLoad);
    await flushPromises();

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(onLoad).toHaveBeenCalledWith({ title: 'Bonjour' });
  });

  it('should keep a locale pinned at the call site', () => {
    const store = createDynamicContentStore(readContent);
    const { loaderMap, loader } = createPlainLoaderMap({
      en: createChunk('Hello'),
      fr: createChunk('Bonjour'),
    });

    const read = store.createReader(loaderMap, 'greeting');

    read({ localeOrSelector: 'en', contextLocale: 'fr' }, () => {});

    expect(loader).toHaveBeenCalledWith('en');
  });
});

describe('createChunkSuspenseCache', () => {
  it('should throw while pending, then return the value', async () => {
    const cache = createChunkSuspenseCache();
    const promise = Promise.resolve('chunk');

    expect(() => cache.read('key', promise)).toThrow();
    expect(cache.has('key')).toBe(true);

    await cache.preload('key', () => promise);

    expect(cache.read('key', promise)).toBe('chunk');
  });

  it('should throw the rejection once settled', async () => {
    const cache = createChunkSuspenseCache();

    await cache.preload('key', () => Promise.reject(new Error('network')));

    expect(() => cache.read('key', Promise.resolve('unused'))).toThrow(
      'network'
    );
  });
});

describe('loadingContentPlaceholder', () => {
  it('should render nothing and survive any access', () => {
    expect(`${loadingContentPlaceholder.title.nested}`).toBe('');
    expect(loadingContentPlaceholder.list.map(String)).toBe(
      loadingContentPlaceholder
    );
    expect(loadingContentPlaceholder.then).toBeUndefined();
    expect(loadingContentPlaceholder.nodeType).toBeUndefined();
  });
});
