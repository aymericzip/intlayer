import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { mergeQualifiedDictionaries } from './mergeQualifiedDictionaries';
import {
  getDictionaryCompositeId,
  getDictionaryQualifierId,
  getDictionaryQualifierTypes,
  getDictionarySelectorCacheKey,
  isQualifiedDictionaryGroup,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDictionary,
  resolveQualifiedDynamicContent,
  resolveQualifiedDynamicContentAsync,
} from './qualifiedDictionary';

describe('getDictionaryQualifierTypes', () => {
  it('should return an empty array for an unqualified dictionary', () => {
    const dictionary = { key: 'home', content: {} } satisfies Dictionary;

    expect(getDictionaryQualifierTypes(dictionary)).toEqual([]);
  });

  it('should detect each qualifier dimension', () => {
    expect(
      getDictionaryQualifierTypes({ key: 'faq', item: 1, content: {} })
    ).toEqual(['item']);
    expect(
      getDictionaryQualifierTypes({
        key: 'hero',
        variant: 'default',
        content: {},
      })
    ).toEqual(['variant']);
    expect(
      getDictionaryQualifierTypes({
        key: 'product',
        variant: { id: 'abc' },
        content: {},
      })
    ).toEqual(['variant']);
  });

  it('should return both dimensions in canonical order (variant → item)', () => {
    expect(
      getDictionaryQualifierTypes({
        key: 'hero',
        item: 1,
        variant: 'promo',
        content: {},
      })
    ).toEqual(['variant', 'item']);
  });
});

describe('getDictionaryQualifierId', () => {
  it('should return the entry identifier per qualifier dimension', () => {
    expect(
      getDictionaryQualifierId({ key: 'faq', item: 2, content: {} }, 'item')
    ).toBe('2');
    expect(
      getDictionaryQualifierId(
        { key: 'hero', variant: 'black-friday', content: {} },
        'variant'
      )
    ).toBe('black-friday');
    expect(
      getDictionaryQualifierId(
        { key: 'product', variant: { id: 'abc', userId: 'u1' }, content: {} },
        'variant'
      )
    ).toBe('id=abc&userId=u1');
  });
});

describe('getDictionaryCompositeId', () => {
  it('should join per-dimension ids in the given order', () => {
    expect(
      getDictionaryCompositeId(
        { key: 'x', variant: 'promo', item: 2, content: {} },
        ['variant', 'item']
      )
    ).toBe('promo/2');
  });

  it('should return undefined when a dimension is missing', () => {
    expect(
      getDictionaryCompositeId({ key: 'x', item: 2, content: {} }, [
        'variant',
        'item',
      ])
    ).toBeUndefined();
  });
});

describe('mergeQualifiedDictionaries', () => {
  it('should behave like mergeDictionaries when no qualifier is declared', () => {
    const first = {
      key: 'home',
      content: { title: 'first' },
      localId: 'home::local::a',
    } satisfies Dictionary;
    const second = {
      key: 'home',
      content: { title: 'second', subtitle: 'kept' },
      localId: 'home::local::b',
    } satisfies Dictionary;

    const merged = mergeQualifiedDictionaries([first, second]);

    expect(isQualifiedDictionaryGroup(merged)).toBe(false);
    expect((merged as Dictionary).content).toEqual({
      title: 'first',
      subtitle: 'kept',
    });
  });

  it('should group collection items into a qualified group', () => {
    const item1 = {
      key: 'faq',
      item: 1,
      content: { question: t({ en: 'Q1', fr: 'Q1-fr' }) },
      localId: 'faq::local::1',
    } satisfies Dictionary;
    const item2 = {
      key: 'faq',
      item: 2,
      content: { question: t({ en: 'Q2', fr: 'Q2-fr' }) },
      localId: 'faq::local::2',
    } satisfies Dictionary;

    const merged = mergeQualifiedDictionaries([item1, item2]);

    expect(isQualifiedDictionaryGroup(merged)).toBe(true);

    const group = merged as QualifiedDictionaryGroup;

    expect(group.key).toBe('faq');
    expect(group.qualifierTypes).toEqual(['item']);
    expect(Object.keys(group.content)).toEqual(['1', '2']);
    expect(group.content['1']).toEqual({
      question: t({ en: 'Q1', fr: 'Q1-fr' }),
    });
    expect(group.localIds).toEqual(['faq::local::1', 'faq::local::2']);
  });

  it('should merge sibling dictionaries sharing the same qualifier id', () => {
    const firstVariant = {
      key: 'hero',
      variant: 'default',
      content: { title: t({ en: 'Hello', fr: 'Bonjour' }) },
      localId: 'hero::local::a',
    } satisfies Dictionary;
    const secondVariant = {
      key: 'hero',
      variant: 'default',
      content: { subtitle: t({ en: 'World', fr: 'Monde' }) },
      localId: 'hero::local::b',
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      firstVariant,
      secondVariant,
    ]) as QualifiedDictionaryGroup;

    expect(group.qualifierTypes).toEqual(['variant']);
    expect(Object.keys(group.content)).toEqual(['default']);
    expect(group.content.default).toEqual({
      title: t({ en: 'Hello', fr: 'Bonjour' }),
      subtitle: t({ en: 'World', fr: 'Monde' }),
    });
  });

  it('should merge unqualified siblings as shared base content of every entry', () => {
    const base = {
      key: 'hero',
      content: { shared: 'base-value', title: 'base-title' },
      localId: 'hero::local::base',
    } satisfies Dictionary;
    const variantA = {
      key: 'hero',
      variant: 'a',
      content: { title: 'title-a' },
      localId: 'hero::local::a',
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      base,
      variantA,
    ]) as QualifiedDictionaryGroup;

    expect(group.content.a).toEqual({
      shared: 'base-value',
      title: 'title-a',
    });
  });

  it('should build a composite group when an entry declares several dimensions', () => {
    const promoItem1 = {
      key: 'product',
      variant: 'promo',
      item: 1,
      content: { title: 'promo-1' },
    } satisfies Dictionary;
    const promoItem2 = {
      key: 'product',
      variant: 'promo',
      item: 2,
      content: { title: 'promo-2' },
    } satisfies Dictionary;
    const defaultItem1 = {
      key: 'product',
      variant: 'default',
      item: 1,
      content: { title: 'default-1' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      promoItem1,
      promoItem2,
      defaultItem1,
    ]) as QualifiedDictionaryGroup;

    expect(group.qualifierTypes).toEqual(['variant', 'item']);
    expect(Object.keys(group.content).sort()).toEqual([
      'default/1',
      'promo/1',
      'promo/2',
    ]);
    // Coordinates live in the composite key; the value is the content node.
    expect(group.content['promo/2']).toEqual({ title: 'promo-2' });
  });

  it('should reject an entry that does not declare every group dimension', () => {
    const variantOnly = {
      key: 'x',
      variant: 'promo',
      content: { title: 'partial' },
    } satisfies Dictionary;
    const composite = {
      key: 'x',
      variant: 'promo',
      item: 1,
      content: { title: 'full' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      variantOnly,
      composite,
    ]) as QualifiedDictionaryGroup;

    // The group dimension set is the union (variant + item); the partial entry
    // is dropped because it lacks an item segment.
    expect(group.qualifierTypes).toEqual(['variant', 'item']);
    expect(Object.keys(group.content)).toEqual(['promo/1']);
  });

  it('should group object variants by their serialized identity', () => {
    const productA = {
      key: 'product',
      variant: { id: 'abc', category: 'audio' },
      content: { name: 'A' },
    } satisfies Dictionary;
    const productB = {
      key: 'product',
      variant: { id: 'def', category: 'video' },
      content: { name: 'B' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      productA,
      productB,
    ]) as QualifiedDictionaryGroup;

    expect(group.qualifierTypes).toEqual(['variant']);
    expect(Object.keys(group.content).sort()).toEqual([
      'category=audio&id=abc',
      'category=video&id=def',
    ]);
    expect(group.content['category=audio&id=abc']).toEqual({ name: 'A' });
  });
});

describe('resolveQualifiedDictionary', () => {
  const faqGroup: QualifiedDictionaryGroup = {
    key: 'faq',
    qualifierTypes: ['item'],
    content: {
      '2': { question: 'Q2' },
      '1': { question: 'Q1' },
      '10': { question: 'Q10' },
    },
  };

  const heroGroup: QualifiedDictionaryGroup = {
    key: 'hero',
    qualifierTypes: ['variant'],
    content: {
      default: { title: 'Hi' },
      'black-friday': { title: '-50%' },
    },
  };

  const productGroup: QualifiedDictionaryGroup = {
    key: 'product',
    qualifierTypes: ['variant'],
    content: {
      'id=abc&userId=123': { name: 'Product ABC' },
    },
  };

  // variant × item composite
  const bannerGroup: QualifiedDictionaryGroup = {
    key: 'banner',
    qualifierTypes: ['variant', 'item'],
    content: {
      'promo/1': { title: 'promo-1' },
      'promo/2': { title: 'promo-2' },
      'default/1': { title: 'default-1' },
    },
  };

  it('should return a plain dictionary as-is', () => {
    const dictionary: Dictionary = { key: 'home', content: { title: 'Hi' } };

    expect(resolveQualifiedDictionary(dictionary)).toBe(dictionary);
    expect(resolveQualifiedDictionary(dictionary, { item: 5 })).toBe(
      dictionary
    );
  });

  it('should return every collection item ordered by index when no item is selected', () => {
    const resolved = resolveQualifiedDictionary(faqGroup);

    expect(Array.isArray(resolved)).toBe(true);
    expect((resolved as Dictionary[]).map((entry) => entry.item)).toEqual([
      1, 2, 10,
    ]);
  });

  it('should return the matching collection item', () => {
    const resolved = resolveQualifiedDictionary(faqGroup, { item: 2 });

    expect((resolved as Dictionary).content).toEqual({ question: 'Q2' });
  });

  it('should return null for a missing collection item', () => {
    expect(resolveQualifiedDictionary(faqGroup, { item: 99 })).toBeNull();
  });

  it('should return the default variant when no variant is selected', () => {
    const resolved = resolveQualifiedDictionary(heroGroup);

    expect((resolved as Dictionary).variant).toBe('default');
  });

  it('should return the matching variant', () => {
    const resolved = resolveQualifiedDictionary(heroGroup, {
      variant: 'black-friday',
    });

    expect((resolved as Dictionary).content).toEqual({ title: '-50%' });
  });

  it('should return null for a missing variant', () => {
    expect(
      resolveQualifiedDictionary(heroGroup, { variant: 'unknown' })
    ).toBeNull();
  });

  it('should resolve an object variant when the whole object matches', () => {
    const resolved = resolveQualifiedDictionary(productGroup, {
      variant: { id: 'abc', userId: '123' },
    });

    expect((resolved as Dictionary).content).toEqual({ name: 'Product ABC' });
  });

  it('should match an object variant regardless of field order', () => {
    const resolved = resolveQualifiedDictionary(productGroup, {
      variant: { userId: '123', id: 'abc' },
    });

    expect((resolved as Dictionary).content).toEqual({ name: 'Product ABC' });
  });

  it('should return null when no object variant is selected', () => {
    expect(resolveQualifiedDictionary(productGroup)).toBeNull();
    expect(resolveQualifiedDictionary(productGroup, {})).toBeNull();
  });

  it('should return null when an object variant field is missing or mismatched', () => {
    expect(
      resolveQualifiedDictionary(productGroup, { variant: { id: 'abc' } })
    ).toBeNull();
    expect(
      resolveQualifiedDictionary(productGroup, {
        variant: { id: 'abc', userId: 'other' },
      })
    ).toBeNull();
  });

  describe('composite (variant × item)', () => {
    it('should return every item of the default variant when nothing is selected', () => {
      const resolved = resolveQualifiedDictionary(bannerGroup);

      expect(Array.isArray(resolved)).toBe(true);
      expect((resolved as Dictionary[]).map((entry) => entry.content)).toEqual([
        { title: 'default-1' },
      ]);
    });

    it('should return every item of the selected variant as an array', () => {
      const resolved = resolveQualifiedDictionary(bannerGroup, {
        variant: 'promo',
      });

      expect((resolved as Dictionary[]).map((entry) => entry.item)).toEqual([
        1, 2,
      ]);
    });

    it('should narrow to a single entry when both dimensions are selected', () => {
      const resolved = resolveQualifiedDictionary(bannerGroup, {
        variant: 'promo',
        item: 2,
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'promo-2' });
    });

    it('should return null when the composite coordinates do not exist', () => {
      expect(
        resolveQualifiedDictionary(bannerGroup, { variant: 'default', item: 2 })
      ).toBeNull();
    });
  });
});

describe('parseDictionarySelector', () => {
  it('should treat a string as a locale', () => {
    expect(parseDictionarySelector('fr')).toEqual({ locale: 'fr' });
  });

  it('should extract the locale from a selector object', () => {
    const selector = { item: 2, locale: 'fr' };

    expect(parseDictionarySelector(selector)).toEqual({
      locale: 'fr',
      selector,
    });
  });

  it('should handle undefined', () => {
    expect(parseDictionarySelector()).toEqual({ locale: undefined });
  });
});

describe('getDictionarySelectorCacheKey', () => {
  it('should build a stable identity excluding locale', () => {
    expect(
      getDictionarySelectorCacheKey({
        variant: { userId: '1', id: 'abc' },
        locale: 'fr',
      })
    ).toBe('variant:id=abc&userId=1');
    expect(getDictionarySelectorCacheKey({ item: 2 })).toBe('item:2');
    expect(getDictionarySelectorCacheKey()).toBe('');
  });
});

describe('isQualifiedDynamicLoaderMap', () => {
  it('should detect a qualified dynamic loader map by its marker', () => {
    const qualified = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['item'],
      en: { '1': () => Promise.resolve({ key: 'faq', content: {} }) },
    };

    expect(isQualifiedDynamicLoaderMap(qualified)).toBe(true);
  });

  it('should reject a plain dynamic loader map', () => {
    const plain = {
      en: () => Promise.resolve({ key: 'app', content: {} }),
      fr: () => Promise.resolve({ key: 'app', content: {} }),
    };

    expect(isQualifiedDynamicLoaderMap(plain)).toBe(false);
    expect(isQualifiedDynamicLoaderMap(null)).toBe(false);
  });
});

describe('resolveQualifiedDynamicContent', () => {
  // Reconstructs a dictionary from the chunk cache key's trailing segments
  // (`key.locale.<seg>/<seg>`) — the real client/server inject a Suspense
  // reader; here we resolve inline to test the chunk-selection logic.
  const reconstructFromCacheKey = (
    cacheKey: string,
    base: (segments: string[]) => Dictionary
  ): Dictionary => {
    const segments = cacheKey.split('.').at(-1)!.split('/');
    return base(segments);
  };

  const makeItemMap = (): {
    loaderMap: QualifiedDynamicLoaderMap;
    loaded: string[];
  } => {
    const loaded: string[] = [];
    const entry = (id: string): Dictionary => ({
      key: 'faq',
      item: Number(id),
      content: { question: `Q${id}` },
    });

    const makeLoader = (id: string) => () => {
      loaded.push(id);
      return Promise.resolve(entry(id));
    };

    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['item'],
      en: {
        '2': makeLoader('2'),
        '1': makeLoader('1'),
        '10': makeLoader('10'),
      },
    };

    return { loaderMap, loaded };
  };

  const unusedLoadChunk = (): Dictionary => {
    throw new Error('loadChunk should not be called');
  };

  it('should load every collection chunk ordered by index when no item is selected', () => {
    const { loaderMap } = makeItemMap();
    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'faq',
      locale: 'en',
      selector: undefined,
      loadChunk: (cacheKey) =>
        reconstructFromCacheKey(cacheKey, ([id]) => ({
          key: 'faq',
          item: Number(id),
          content: { question: `Q${id}` },
        })),
      transform: (dictionary) => dictionary,
    });

    expect(Array.isArray(resolved)).toBe(true);
    expect((resolved as Dictionary[]).map((entry) => entry.item)).toEqual([
      1, 2, 10,
    ]);
  });

  it('should load only the targeted collection chunk', () => {
    const { loaderMap, loaded } = makeItemMap();
    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'faq',
      locale: 'en',
      selector: { item: 2 },
      loadChunk: (_cacheKey, _promise) => ({
        key: 'faq',
        item: 2,
        content: { question: 'Q2' },
      }),
      transform: (dictionary) => dictionary,
    });

    expect((resolved as Dictionary).item).toBe(2);
    expect(loaded).toEqual(['2']);
  });

  it('should return null for a missing collection chunk', () => {
    const { loaderMap } = makeItemMap();
    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'faq',
      locale: 'en',
      selector: { item: 99 },
      loadChunk: unusedLoadChunk,
      transform: (dictionary) => dictionary,
    });

    expect(resolved).toBeNull();
  });

  it('should default to the `default` variant chunk', () => {
    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant'],
      en: {
        default: () =>
          Promise.resolve({
            key: 'hero',
            variant: 'default',
            content: { title: 'Hi' },
          }),
        promo: () =>
          Promise.resolve({
            key: 'hero',
            variant: 'promo',
            content: { title: '-50%' },
          }),
      },
    };

    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'hero',
      locale: 'en',
      selector: undefined,
      loadChunk: (cacheKey) =>
        reconstructFromCacheKey(cacheKey, ([variant]) => ({
          key: 'hero',
          variant,
          content: { title: variant },
        })),
      transform: (dictionary) => dictionary,
    });

    expect((resolved as Dictionary).variant).toBe('default');
  });

  it('should return null when an object variant selector is missing', () => {
    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant'],
      en: {
        'id=abc&userId=123': () =>
          Promise.resolve({
            key: 'product',
            variant: { id: 'abc', userId: '123' },
            content: { name: 'ABC' },
          }),
      },
    };

    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'product',
      locale: 'en',
      selector: { variant: { id: 'unknown' } },
      loadChunk: unusedLoadChunk,
      transform: (dictionary) => dictionary,
    });

    expect(resolved).toBeNull();
  });

  it('should load the object variant chunk identified by its serialized id', () => {
    const chunk: Dictionary = {
      key: 'product',
      variant: { id: 'abc', userId: '123' },
      content: { name: 'ABC' },
    };
    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant'],
      en: { 'id=abc&userId=123': () => Promise.resolve(chunk) },
    };

    const matched = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'product',
      locale: 'en',
      selector: { variant: { id: 'abc', userId: '123' } },
      loadChunk: () => chunk,
      transform: (dictionary) => dictionary,
    });

    expect((matched as Dictionary).content).toEqual({ name: 'ABC' });

    const mismatched = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'product',
      locale: 'en',
      selector: { variant: { id: 'abc', userId: 'other' } },
      loadChunk: unusedLoadChunk,
      transform: (dictionary) => dictionary,
    });

    expect(mismatched).toBeNull();
  });

  it('should return an empty array for a missing locale on a collection', () => {
    const { loaderMap } = makeItemMap();
    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'faq',
      locale: 'de',
      selector: undefined,
      loadChunk: unusedLoadChunk,
      transform: (dictionary) => dictionary,
    });

    expect(resolved).toEqual([]);
  });

  describe('composite (variant × item)', () => {
    const makeBannerMap = (): {
      loaderMap: QualifiedDynamicLoaderMap;
      loaded: string[];
    } => {
      const loaded: string[] = [];
      const makeLoader =
        (variant: string, item: string) => (): Promise<Dictionary> => {
          loaded.push(`${variant}/${item}`);
          return Promise.resolve({
            key: 'banner',
            variant,
            item: Number(item),
            content: { title: `${variant}-${item}` },
          });
        };

      const loaderMap: QualifiedDynamicLoaderMap = {
        [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant', 'item'],
        en: {
          promo: {
            '1': makeLoader('promo', '1'),
            '2': makeLoader('promo', '2'),
          },
          default: { '1': makeLoader('default', '1') },
        },
      };

      return { loaderMap, loaded };
    };

    const loadFromCacheKey = (cacheKey: string): Dictionary =>
      reconstructFromCacheKey(cacheKey, ([variant, item]) => ({
        key: 'banner',
        variant,
        item: Number(item),
        content: { title: `${variant}-${item}` },
      }));

    it('should fan out into every item of the selected variant', () => {
      const { loaderMap, loaded } = makeBannerMap();
      const resolved = resolveQualifiedDynamicContent<Dictionary>({
        loaderMap,
        key: 'banner',
        locale: 'en',
        selector: { variant: 'promo' },
        loadChunk: loadFromCacheKey,
        transform: (dictionary) => dictionary,
      });

      expect((resolved as Dictionary[]).map((entry) => entry.content)).toEqual([
        { title: 'promo-1' },
        { title: 'promo-2' },
      ]);
      // Only promo chunks were started — not the default variant.
      expect(loaded.sort()).toEqual(['promo/1', 'promo/2']);
    });

    it('should narrow to a single chunk when both dimensions are selected', () => {
      const { loaderMap, loaded } = makeBannerMap();
      const resolved = resolveQualifiedDynamicContent<Dictionary>({
        loaderMap,
        key: 'banner',
        locale: 'en',
        selector: { variant: 'promo', item: 2 },
        loadChunk: loadFromCacheKey,
        transform: (dictionary) => dictionary,
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'promo-2' });
      expect(loaded).toEqual(['promo/2']);
    });

    it('should default the variant and fan out items when nothing is selected', () => {
      const { loaderMap } = makeBannerMap();
      const resolved = resolveQualifiedDynamicContent<Dictionary>({
        loaderMap,
        key: 'banner',
        locale: 'en',
        selector: undefined,
        loadChunk: loadFromCacheKey,
        transform: (dictionary) => dictionary,
      });

      expect((resolved as Dictionary[]).map((entry) => entry.content)).toEqual([
        { title: 'default-1' },
      ]);
    });

    it('should return null when the composite coordinates do not exist', () => {
      const { loaderMap } = makeBannerMap();
      const resolved = resolveQualifiedDynamicContent<Dictionary>({
        loaderMap,
        key: 'banner',
        locale: 'en',
        selector: { variant: 'default', item: 2 },
        loadChunk: loadFromCacheKey,
        transform: (dictionary) => dictionary,
      });

      expect(resolved).toBeNull();
    });
  });
});

describe('resolveQualifiedDynamicContentAsync', () => {
  const makeBannerMap = (): QualifiedDynamicLoaderMap => {
    const makeLoader =
      (variant: string, item: string) => (): Promise<Dictionary> =>
        Promise.resolve({
          key: 'banner',
          variant,
          item: Number(item),
          content: { title: `${variant}-${item}` },
        });

    return {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant', 'item'],
      en: {
        promo: { '1': makeLoader('promo', '1'), '2': makeLoader('promo', '2') },
        default: { '1': makeLoader('default', '1') },
      },
    };
  };

  it('should await every item of the selected variant', async () => {
    const resolved = await resolveQualifiedDynamicContentAsync<Dictionary>({
      loaderMap: makeBannerMap(),
      key: 'banner',
      locale: 'en',
      selector: { variant: 'promo' },
      transform: (dictionary) => dictionary,
    });

    expect((resolved as Dictionary[]).map((entry) => entry.content)).toEqual([
      { title: 'promo-1' },
      { title: 'promo-2' },
    ]);
  });

  it('should await a single chunk when both dimensions are selected', async () => {
    const resolved = await resolveQualifiedDynamicContentAsync<Dictionary>({
      loaderMap: makeBannerMap(),
      key: 'banner',
      locale: 'en',
      selector: { variant: 'promo', item: 2 },
      transform: (dictionary) => dictionary,
    });

    expect((resolved as Dictionary).content).toEqual({ title: 'promo-2' });
  });

  it('should return null when coordinates are missing and [] for an open item axis on a missing locale', async () => {
    const missing = await resolveQualifiedDynamicContentAsync<Dictionary>({
      loaderMap: makeBannerMap(),
      key: 'banner',
      locale: 'en',
      selector: { variant: 'default', item: 2 },
      transform: (dictionary) => dictionary,
    });
    expect(missing).toBeNull();

    const missingLocale = await resolveQualifiedDynamicContentAsync<Dictionary>(
      {
        loaderMap: makeBannerMap(),
        key: 'banner',
        locale: 'de',
        selector: { variant: 'promo' },
        transform: (dictionary) => dictionary,
      }
    );
    expect(missingLocale).toEqual([]);
  });
});
