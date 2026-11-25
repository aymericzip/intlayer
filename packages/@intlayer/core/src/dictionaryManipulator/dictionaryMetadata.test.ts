import { QUALIFIER_DYNAMIC_METADATA_KEY } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { describe, expect, it, vi } from 'vitest';
import { getPerLocaleDictionary } from '../deepTransformPlugins';
import type { Plugins } from '../interpreter/getContent';
import { getDictionary } from '../interpreter/getDictionary';
import { t } from '../transpiler';
import {
  getDynamicChunkArgument,
  resolveDynamicContentAsync,
} from './dynamicDictionary';
import { mergeQualifiedDictionaries } from './mergeQualifiedDictionaries';
import { normalizeDictionary } from './normalizeDictionary';
import { reconstructQualifiedEntry } from './qualifiedDictionary';
import {
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
} from './qualifiedDynamicLoader';

vi.mock('@intlayer/config/built', () => {
  const config = {
    log: { mode: 'disabled' },
    internationalization: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
      requiredLocales: ['en'],
    },
  };
  return { ...config, default: config };
});

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({}),
}));

const configuration = {
  internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
} as unknown as IntlayerConfig;

/**
 * The blog of the example project: item 1 declared per locale (as two
 * `.content.md` files would be), item 2 multilingual with one metadata for
 * every locale, item 3 without metadata.
 */
const createBlogGroup = (): QualifiedDictionaryGroup =>
  mergeQualifiedDictionaries(
    [
      {
        key: 'blog',
        locale: 'en',
        item: 1,
        metadata: { title: 'My meta title', slug: 'hello' },
        content: { body: '# My title' },
      },
      {
        key: 'blog',
        locale: 'fr',
        item: 1,
        metadata: { title: 'Mon meta titre', slug: 'bonjour' },
        content: { body: '# Mon titre' },
      },
      {
        key: 'blog',
        item: 2,
        metadata: { title: 'Second post', tags: ['news', 'release'] },
        content: { body: t({ en: '# Second', fr: '# Deuxième' }) },
      },
      {
        key: 'blog',
        item: 3,
        content: { body: t({ en: '# Third', fr: '# Troisième' }) },
      },
    ].map((dictionary) =>
      normalizeDictionary(dictionary as Dictionary, configuration)
    )
  ) as QualifiedDictionaryGroup;

/**
 * Builds the dynamic loader map the engine emits for a group: one chunk per
 * `(entry, locale)` plus a per-locale metadata index, each behind a spy.
 */
const createBlogLoaderMap = (group: QualifiedDictionaryGroup) => {
  const entryIds = Object.keys(group.content);

  const entryLoader = vi.fn(
    async (entryId: string, locale: string): Promise<Dictionary> =>
      getPerLocaleDictionary(
        reconstructQualifiedEntry(group, entryId),
        locale,
        'en'
      )
  );

  const indexLoader = vi.fn(
    async (locale: string): Promise<Dictionary> =>
      ({
        key: group.key,
        locale,
        qualifierTypes: group.qualifierTypes,
        content: {},
        metadata: Object.fromEntries(
          entryIds.map((entryId) => [
            entryId,
            getPerLocaleDictionary(
              reconstructQualifiedEntry(group, entryId),
              locale,
              'en'
            ).metadata ?? {},
          ])
        ),
      }) as Dictionary
  );

  const buildLocaleTree = (locale: string) =>
    Object.fromEntries(
      entryIds.map((entryId) => [entryId, () => entryLoader(entryId, locale)])
    );

  const loaderMap = {
    [QUALIFIER_DYNAMIC_TYPES_KEY]: group.qualifierTypes,
    [QUALIFIER_DYNAMIC_METADATA_KEY]: {
      en: () => indexLoader('en'),
      fr: () => indexLoader('fr'),
    },
    en: buildLocaleTree('en'),
    fr: buildLocaleTree('fr'),
  } as QualifiedDynamicLoaderMap;

  return { loaderMap, entryLoader, indexLoader };
};

describe('dictionary metadata — build', () => {
  it('should merge per-locale and multilingual metadata per entry', () => {
    const group = createBlogGroup();

    expect(Object.keys(group.metadata ?? {}).sort()).toEqual(['1', '2']);
    expect(group.metadata?.['1']).toEqual(
      t({
        en: { title: 'My meta title', slug: 'hello' },
        fr: { title: 'Mon meta titre', slug: 'bonjour' },
      })
    );
  });

  it('should localize the metadata of a per-locale chunk', () => {
    const group = createBlogGroup();

    const frenchEntry = getPerLocaleDictionary(
      reconstructQualifiedEntry(group, '1'),
      'fr',
      'en'
    );

    expect(frenchEntry.metadata).toEqual({
      title: 'Mon meta titre',
      slug: 'bonjour',
    });
  });
});

describe('dictionary metadata — static (getDictionary)', () => {
  it('should list every item metadata, ordered, with {} when undeclared', () => {
    const group = createBlogGroup();

    expect(getDictionary(group, { metadataOnly: true, locale: 'fr' })).toEqual([
      { title: 'Mon meta titre', slug: 'bonjour' },
      { title: 'Second post', tags: ['news', 'release'] },
      {},
    ]);
  });

  it('should return the metadata as declared, without running the plugins', () => {
    const group = createBlogGroup();
    const upperCasePlugin: Plugins = {
      id: 'upper-case',
      canHandle: (node) => typeof node === 'string',
      transform: (node: string) => node.toUpperCase(),
    };

    expect(
      getDictionary(group, { item: 1, metadataOnly: true, locale: 'en' }, [
        upperCasePlugin,
      ])
    ).toEqual({ title: 'My meta title', slug: 'hello' });
  });

  it('should resolve the metadata of a pinned item, leaving content reads intact', () => {
    const group = createBlogGroup();

    expect(
      getDictionary(group, { item: 2, metadataOnly: true, locale: 'en' })
    ).toEqual({ title: 'Second post', tags: ['news', 'release'] });
    expect(getDictionary(group, { item: 2, locale: 'fr' })).toEqual({
      body: '# Deuxième',
    });
  });

  it('should read the metadata of a plain dictionary', () => {
    const dictionary = normalizeDictionary(
      {
        key: 'about',
        locale: 'fr',
        metadata: { title: 'À propos' },
        content: { heading: 'Bonjour' },
      },
      configuration
    );

    expect(
      getDictionary(dictionary, { metadataOnly: true, locale: 'fr' })
    ).toEqual({ title: 'À propos' });
  });
});

describe('dictionary metadata — dynamic', () => {
  it('should list metadata from the index without loading any entry', async () => {
    const group = createBlogGroup();
    const { loaderMap, entryLoader, indexLoader } = createBlogLoaderMap(group);

    const resolved = await resolveDynamicContentAsync({
      loaderMap,
      key: 'blog',
      locale: 'fr',
      selector: { metadataOnly: true },
      transform: (dictionary, argument) => getDictionary(dictionary, argument),
    });

    expect(resolved).toEqual(
      getDictionary(group, { metadataOnly: true, locale: 'fr' })
    );
    expect(indexLoader).toHaveBeenCalledTimes(1);
    expect(entryLoader).not.toHaveBeenCalled();
  });

  it('should read a pinned item metadata from its own chunk', async () => {
    const group = createBlogGroup();
    const { loaderMap, entryLoader, indexLoader } = createBlogLoaderMap(group);

    const resolved = await resolveDynamicContentAsync({
      loaderMap,
      key: 'blog',
      locale: 'en',
      selector: { item: 1, metadataOnly: true },
      transform: (dictionary, argument) => getDictionary(dictionary, argument),
    });

    expect(resolved).toEqual(
      getDictionary(group, { item: 1, metadataOnly: true, locale: 'en' })
    );
    expect(entryLoader).toHaveBeenCalledTimes(1);
    expect(entryLoader).toHaveBeenCalledWith('1', 'en');
    expect(indexLoader).not.toHaveBeenCalled();
  });

  it('should fall back to the entry chunks when the build emitted no index', async () => {
    const group = createBlogGroup();
    const { loaderMap, entryLoader } = createBlogLoaderMap(group);
    const {
      [QUALIFIER_DYNAMIC_METADATA_KEY]: _metadataIndexLoaders,
      ...loaderMapWithoutIndex
    } = loaderMap;

    const resolved = await resolveDynamicContentAsync({
      loaderMap: loaderMapWithoutIndex as QualifiedDynamicLoaderMap,
      key: 'blog',
      locale: 'en',
      selector: { metadataOnly: true },
      transform: (dictionary, argument) => getDictionary(dictionary, argument),
    });

    expect(resolved).toEqual(
      getDictionary(group, { metadataOnly: true, locale: 'en' })
    );
    expect(entryLoader).toHaveBeenCalledTimes(3);
  });

  it('should read a plain chunk metadata through getDynamicChunkArgument', () => {
    const chunk = getPerLocaleDictionary(
      normalizeDictionary(
        {
          key: 'about',
          locale: 'fr',
          metadata: { title: 'À propos' },
          content: { heading: 'Bonjour' },
        },
        configuration
      ),
      'fr',
      'en'
    );

    expect(
      getDictionary(
        chunk,
        getDynamicChunkArgument('fr', { metadataOnly: true })
      )
    ).toEqual({ title: 'À propos' });
    expect(
      getDictionary(chunk, getDynamicChunkArgument('fr', undefined))
    ).toEqual({ heading: 'Bonjour' });
  });
});
