import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { mergeQualifiedDictionaries } from './mergeQualifiedDictionaries';
import {
  getDictionaryCompositeIds,
  getDictionaryQualifierIds,
  getDictionaryQualifierTypes,
  getDictionarySelectorCacheKey,
  getVariantIds,
  isQualifiedDictionaryGroup,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
  resolveDictionaryArgument,
  resolveProviderVariant,
  resolveQualifiedDictionary,
  resolveQualifiedDynamicContent,
  resolveQualifiedDynamicContentAsync,
  serializeVariant,
  serializeVariantChain,
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

describe('serializeVariant', () => {
  it('should keep common variant names untouched', () => {
    expect(serializeVariant('black-friday')).toBe('black-friday');
    expect(serializeVariant('promo_2026.v1')).toBe('promo_2026.v1');
    expect(serializeVariant(undefined)).toBe('default');
  });

  it('should percent-encode path-hostile and code-breaking characters', () => {
    expect(serializeVariant('summer/2026')).toBe('summer%002F2026');
    expect(serializeVariant("it's")).toBe('it%0027s');
    expect(serializeVariant('a\\b')).toBe('a%005Cb');
    expect(serializeVariant('50% off')).toBe('50%0025%0020off');
  });

  it('should encode pathological segments (dot navigation, empty string)', () => {
    expect(serializeVariant('..')).toBe('%002E%002E');
    expect(serializeVariant('.')).toBe('%002E');
    expect(serializeVariant('')).toBe('%');
  });

  it('should serialize object variants with encoded components', () => {
    expect(serializeVariant({ userId: 'u1', id: 'abc' })).toBe(
      'id=abc&userId=u1'
    );
    // '=' and '&' inside a component are encoded so the pairs stay unambiguous.
    expect(serializeVariant({ id: 'a&b=c' })).toBe('id=a%0026b%003Dc');
  });
});

describe('getVariantIds', () => {
  it('should return undefined when the variant dimension is not declared', () => {
    expect(getVariantIds(undefined)).toBeUndefined();
    expect(getVariantIds([])).toBeUndefined();
  });

  it('should return one id for a single value', () => {
    expect(getVariantIds('promo')).toEqual(['promo']);
    expect(getVariantIds({ id: 'abc' })).toEqual(['id=abc']);
  });

  it('should fan an array out into one id per element, deduplicated', () => {
    expect(getVariantIds(['black-friday', 'cyber-monday'])).toEqual([
      'black-friday',
      'cyber-monday',
    ]);
    expect(getVariantIds(['promo', 'promo'])).toEqual(['promo']);
    expect(getVariantIds([{ id: 'abc' }, 'promo'])).toEqual([
      'id=abc',
      'promo',
    ]);
  });
});

describe('getDictionaryQualifierIds', () => {
  it('should return the entry identifiers per qualifier dimension', () => {
    expect(
      getDictionaryQualifierIds({ key: 'faq', item: 2, content: {} }, 'item')
    ).toEqual(['2']);
    expect(
      getDictionaryQualifierIds(
        { key: 'hero', variant: 'black-friday', content: {} },
        'variant'
      )
    ).toEqual(['black-friday']);
    expect(
      getDictionaryQualifierIds(
        { key: 'product', variant: { id: 'abc', userId: 'u1' }, content: {} },
        'variant'
      )
    ).toEqual(['id=abc&userId=u1']);
  });
});

describe('getDictionaryCompositeIds', () => {
  it('should join per-dimension ids in the given order', () => {
    expect(
      getDictionaryCompositeIds(
        { key: 'x', variant: 'promo', item: 2, content: {} },
        ['variant', 'item']
      )
    ).toEqual(['promo/2']);
  });

  it('should return undefined when a dimension is missing', () => {
    expect(
      getDictionaryCompositeIds({ key: 'x', item: 2, content: {} }, [
        'variant',
        'item',
      ])
    ).toBeUndefined();
  });

  it('should fan an array variant out into one composite id per element', () => {
    expect(
      getDictionaryCompositeIds(
        { key: 'x', variant: ['black-friday', 'cyber-monday'], content: {} },
        ['variant']
      )
    ).toEqual(['black-friday', 'cyber-monday']);

    expect(
      getDictionaryCompositeIds(
        { key: 'x', variant: ['a', 'b'], item: 1, content: {} },
        ['variant', 'item']
      )
    ).toEqual(['a/1', 'b/1']);
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

  it('should register an array variant under every listed id', () => {
    const sales = {
      key: 'hero',
      variant: ['black-friday', 'cyber-monday'],
      content: { title: 'Sales!' },
    } satisfies Dictionary;
    const control = {
      key: 'hero',
      variant: 'default',
      content: { title: 'Welcome' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      sales,
      control,
    ]) as QualifiedDictionaryGroup;

    expect(group.qualifierTypes).toEqual(['variant']);
    expect(Object.keys(group.content).sort()).toEqual([
      'black-friday',
      'cyber-monday',
      'default',
    ]);
    expect(group.content['black-friday']).toEqual({ title: 'Sales!' });
    expect(group.content['cyber-monday']).toEqual({ title: 'Sales!' });
    expect(group.content.default).toEqual({ title: 'Welcome' });
  });

  it('should let a sibling override one id of an array variant fan-out', () => {
    const shared = {
      key: 'hero',
      variant: ['a', 'b'],
      content: { title: 'shared', extra: 'kept' },
      localId: 'hero::local::shared',
    } satisfies Dictionary;
    const overrideA = {
      key: 'hero',
      variant: 'a',
      content: { title: 'a-specific' },
      localId: 'hero::local::a',
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      overrideA,
      shared,
    ]) as QualifiedDictionaryGroup;

    // 'a' merges the override with the shared fan-out; 'b' only gets the shared.
    expect(group.content.a).toEqual({ title: 'a-specific', extra: 'kept' });
    expect(group.content.b).toEqual({ title: 'shared', extra: 'kept' });
  });

  it('should treat an empty variant array as an unqualified sibling', () => {
    const base = {
      key: 'hero',
      variant: [],
      content: { shared: 'base' },
    } satisfies Dictionary;
    const named = {
      key: 'hero',
      variant: 'promo',
      content: { title: 'promo' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      base,
      named,
    ]) as QualifiedDictionaryGroup;

    // The base is shared content of every entry, and also materializes the
    // `default` entry no declaration claims.
    expect(Object.keys(group.content).sort()).toEqual(['default', 'promo']);
    expect(group.content.promo).toEqual({ title: 'promo', shared: 'base' });
    expect(group.content.default).toEqual({ shared: 'base' });
  });

  it('should materialize the default entry from unqualified base content', () => {
    const base = {
      key: 'lesson',
      content: { title: 'Lesson', teacher: 'Teacher' },
      localId: 'lesson::local::base',
    } satisfies Dictionary;
    const preschool = {
      key: 'lesson',
      variant: 'preschool',
      content: { teacher: 'Pedagogue' },
      localId: 'lesson::local::preschool',
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      base,
      preschool,
    ]) as QualifiedDictionaryGroup;

    expect(Object.keys(group.content).sort()).toEqual(['default', 'preschool']);
    expect(group.content.default).toEqual({
      title: 'Lesson',
      teacher: 'Teacher',
    });
    // The partial variant keeps inheriting every key it does not override.
    expect(group.content.preschool).toEqual({
      title: 'Lesson',
      teacher: 'Pedagogue',
    });
  });

  it('should let a partial variant inherit from an explicitly declared default', () => {
    const fallback = {
      key: 'lesson',
      variant: 'default',
      content: { title: 'Lesson', teacher: 'Teacher' },
    } satisfies Dictionary;
    const preschool = {
      key: 'lesson',
      variant: 'preschool',
      content: { teacher: 'Pedagogue' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      fallback,
      preschool,
    ]) as QualifiedDictionaryGroup;

    // Declaring the base as `variant: 'default'` behaves exactly like leaving
    // the variant field out: the partial variant still completes from it.
    expect(group.content.preschool).toEqual({
      title: 'Lesson',
      teacher: 'Pedagogue',
    });
  });

  it('should inherit from the default entry of the same item on a composite key', () => {
    const defaultItem1 = {
      key: 'banner',
      variant: 'default',
      item: 1,
      content: { title: 'Title', subtitle: 'Subtitle' },
    } satisfies Dictionary;
    const promoItem1 = {
      key: 'banner',
      variant: 'promo',
      item: 1,
      content: { title: 'Promo title' },
    } satisfies Dictionary;
    const promoItem2 = {
      key: 'banner',
      variant: 'promo',
      item: 2,
      content: { title: 'Promo title 2' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      defaultItem1,
      promoItem1,
      promoItem2,
    ]) as QualifiedDictionaryGroup;

    // 'promo/1' completes from 'default/1' — the same position on the item axis.
    expect(group.content['promo/1']).toEqual({
      title: 'Promo title',
      subtitle: 'Subtitle',
    });
    // 'promo/2' has no 'default/2' counterpart to inherit from.
    expect(group.content['promo/2']).toEqual({ title: 'Promo title 2' });
  });

  it('should encode unsafe variant names in composite ids', () => {
    const seasonal = {
      key: 'hero',
      variant: 'summer/2026',
      content: { title: 'Summer' },
    } satisfies Dictionary;

    const group = mergeQualifiedDictionaries([
      seasonal,
    ]) as QualifiedDictionaryGroup;

    // '/' would collide with the composite-id separator — encoded instead.
    expect(Object.keys(group.content)).toEqual(['summer%002F2026']);
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

  it('should fall back to the default variant when the selected one is not declared', () => {
    const resolved = resolveQualifiedDictionary(heroGroup, {
      variant: 'unknown',
    });

    expect((resolved as Dictionary).content).toEqual({ title: 'Hi' });
  });

  it('should return null for a missing variant when no default is declared', () => {
    const withoutDefault: QualifiedDictionaryGroup = {
      key: 'hero',
      qualifierTypes: ['variant'],
      content: { 'black-friday': { title: '-50%' } },
    };

    expect(
      resolveQualifiedDictionary(withoutDefault, { variant: 'unknown' })
    ).toBeNull();
    expect(resolveQualifiedDictionary(withoutDefault)).toBeNull();
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

    it('should fall back to the default variant then fan out its items', () => {
      const resolved = resolveQualifiedDictionary(bannerGroup, {
        variant: 'unknown',
      });

      expect((resolved as Dictionary[]).map((entry) => entry.content)).toEqual([
        { title: 'default-1' },
      ]);
    });
  });

  describe('array variant fan-out', () => {
    const salesGroup = mergeQualifiedDictionaries([
      {
        key: 'hero',
        variant: ['black-friday', 'cyber-monday'],
        content: { title: 'Sales!' },
      },
      { key: 'hero', variant: 'default', content: { title: 'Welcome' } },
    ]) as QualifiedDictionaryGroup;

    it('should resolve every id an array variant registered', () => {
      const blackFriday = resolveQualifiedDictionary(salesGroup, {
        variant: 'black-friday',
      });
      const cyberMonday = resolveQualifiedDictionary(salesGroup, {
        variant: 'cyber-monday',
      });

      expect((blackFriday as Dictionary).content).toEqual({ title: 'Sales!' });
      expect((cyberMonday as Dictionary).content).toEqual({ title: 'Sales!' });
      expect(
        (resolveQualifiedDictionary(salesGroup) as Dictionary).content
      ).toEqual({ title: 'Welcome' });
    });
  });

  describe('variant chain', () => {
    // `school1` overrides nothing here, `school2` overrides the title.
    const schoolGroup = mergeQualifiedDictionaries([
      { key: 'hero', variant: 'school2', content: { title: 'School 2' } },
      { key: 'hero', variant: 'default', content: { title: 'Generic' } },
    ]) as QualifiedDictionaryGroup;

    it('should pick the first chain entry the key declares', () => {
      const resolved = resolveQualifiedDictionary(schoolGroup, {
        variant: ['school2', 'default'],
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'School 2' });
    });

    it('should skip chain entries the key does not declare', () => {
      const resolved = resolveQualifiedDictionary(schoolGroup, {
        variant: ['school1', 'school2'],
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'School 2' });
    });

    it('should fall back to the default entry when no chain entry is declared', () => {
      const resolved = resolveQualifiedDictionary(schoolGroup, {
        variant: ['school1', 'school3'],
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'Generic' });
    });

    it('should behave like the bare value for a single-entry chain', () => {
      expect(
        (
          resolveQualifiedDictionary(schoolGroup, {
            variant: ['school2'],
          }) as Dictionary
        ).content
      ).toEqual(
        (
          resolveQualifiedDictionary(schoolGroup, {
            variant: 'school2',
          }) as Dictionary
        ).content
      );
    });

    it('should resolve to the default entry for an empty chain', () => {
      const resolved = resolveQualifiedDictionary(schoolGroup, {
        variant: [],
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'Generic' });
    });

    it('should return null when the chain misses and the key declares no default', () => {
      const noDefaultGroup = mergeQualifiedDictionaries([
        { key: 'hero', variant: 'school2', content: { title: 'School 2' } },
      ]) as QualifiedDictionaryGroup;

      expect(
        resolveQualifiedDictionary(noDefaultGroup, {
          variant: ['school1', 'school3'],
        })
      ).toBeNull();
    });
  });

  describe('encoded variant names', () => {
    const seasonalGroup = mergeQualifiedDictionaries([
      { key: 'hero', variant: 'summer/2026', content: { title: 'Summer' } },
      { key: 'hero', variant: 'default', content: { title: 'Control' } },
    ]) as QualifiedDictionaryGroup;

    it('should match a selector against an encoded variant name', () => {
      const resolved = resolveQualifiedDictionary(seasonalGroup, {
        variant: 'summer/2026',
      });

      expect((resolved as Dictionary).content).toEqual({ title: 'Summer' });
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

  it('should distinguish chains that differ only by order', () => {
    expect(getDictionarySelectorCacheKey({ variant: ['a', 'b'] })).toBe(
      'variant:a,b'
    );
    expect(getDictionarySelectorCacheKey({ variant: ['b', 'a'] })).toBe(
      'variant:b,a'
    );
  });

  it('should give a single-entry chain the same identity as the bare value', () => {
    expect(getDictionarySelectorCacheKey({ variant: ['a'] })).toBe(
      getDictionarySelectorCacheKey({ variant: 'a' })
    );
  });
});

describe('serializeVariantChain', () => {
  it('should wrap a single value into a one-element candidate list', () => {
    expect(serializeVariantChain('promo')).toEqual(['promo']);
    expect(serializeVariantChain({ id: 'abc', userId: '1' })).toEqual([
      'id=abc&userId=1',
    ]);
  });

  it('should preserve chain order', () => {
    expect(serializeVariantChain(['school1', 'default'])).toEqual([
      'school1',
      'default',
    ]);
  });

  it('should treat undefined and an empty chain as no variant pinned', () => {
    expect(serializeVariantChain(undefined)).toEqual(['default']);
    expect(serializeVariantChain([])).toEqual(['default']);
  });
});

describe('resolveProviderVariant', () => {
  it('should apply a bare name and a chain to every key', () => {
    expect(resolveProviderVariant('school1', 'anyKey')).toBe('school1');
    expect(resolveProviderVariant(['school1', 'default'], 'anyKey')).toEqual([
      'school1',
      'default',
    ]);
  });

  it('should read a plain object as the per-key map', () => {
    const map = { key1: 'school1', key2: ['school1', 'default'] };

    expect(resolveProviderVariant(map, 'key1')).toBe('school1');
    expect(resolveProviderVariant(map, 'key2')).toEqual(['school1', 'default']);
  });

  it('should fall back to the reserved default entry for unlisted keys', () => {
    const map = { key1: 'school1', default: 'base' };

    expect(resolveProviderVariant(map, 'unlisted')).toBe('base');
  });

  it('should return undefined when neither the key nor default is listed', () => {
    expect(
      resolveProviderVariant({ key1: 'school1' }, 'unlisted')
    ).toBeUndefined();
    expect(resolveProviderVariant(undefined, 'key1')).toBeUndefined();
  });

  it('should pin a structured variant globally when nested under default', () => {
    expect(
      resolveProviderVariant({ default: { id: 'prod_abc' } }, 'anyKey')
    ).toEqual({ id: 'prod_abc' });
  });
});

describe('resolveDictionaryArgument', () => {
  it('should return a bare locale when no variant is in play', () => {
    expect(
      resolveDictionaryArgument({
        localeOrSelector: 'fr',
        contextLocale: 'en',
        dictionaryKey: 'home',
      })
    ).toBe('fr');

    expect(
      resolveDictionaryArgument({
        contextLocale: 'en',
        dictionaryKey: 'home',
      })
    ).toBe('en');
  });

  it('should apply the provider variant when the call pins none', () => {
    expect(
      resolveDictionaryArgument({
        contextLocale: 'en',
        contextVariant: 'school1',
        dictionaryKey: 'home',
      })
    ).toEqual({ locale: 'en', variant: 'school1' });
  });

  it('should let a call-site variant replace the provider chain entirely', () => {
    expect(
      resolveDictionaryArgument({
        localeOrSelector: { variant: 'school2' },
        contextLocale: 'en',
        contextVariant: ['school1', 'default'],
        dictionaryKey: 'home',
      })
    ).toEqual({ locale: 'en', variant: 'school2' });
  });

  it('should compose the provider variant with an unrelated call-site selector', () => {
    expect(
      resolveDictionaryArgument({
        localeOrSelector: { item: 2 },
        contextLocale: 'en',
        contextVariant: 'school1',
        dictionaryKey: 'faq',
      })
    ).toEqual({ item: 2, locale: 'en', variant: 'school1' });
  });

  it('should resolve the per-key map against the key being read', () => {
    const contextVariant = { faq: 'school1', default: 'base' };

    expect(
      resolveDictionaryArgument({
        contextLocale: 'en',
        contextVariant,
        dictionaryKey: 'faq',
      })
    ).toEqual({ locale: 'en', variant: 'school1' });

    expect(
      resolveDictionaryArgument({
        contextLocale: 'en',
        contextVariant,
        dictionaryKey: 'hero',
      })
    ).toEqual({ locale: 'en', variant: 'base' });
  });

  it('should let a call-site locale override the provider locale', () => {
    expect(
      resolveDictionaryArgument({
        localeOrSelector: { locale: 'fr' },
        contextLocale: 'en',
        contextVariant: 'school1',
        dictionaryKey: 'home',
      })
    ).toEqual({ locale: 'fr', variant: 'school1' });
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

  it('should load only the first chain chunk the key actually ships', () => {
    const loaded: string[] = [];
    const makeLoader = (variant: string) => () => {
      loaded.push(variant);
      return Promise.resolve({
        key: 'lesson',
        variant,
        content: { title: variant },
      });
    };

    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant'],
      en: {
        default: makeLoader('default'),
        school2: makeLoader('school2'),
      },
    };

    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'lesson',
      locale: 'en',
      // `school1` ships no chunk for this key, so the chain moves on.
      selector: { variant: ['school1', 'school2'] },
      loadChunk: (cacheKey) =>
        reconstructFromCacheKey(cacheKey, ([variant]) => ({
          key: 'lesson',
          variant,
          content: { title: variant },
        })),
      transform: (dictionary) => dictionary,
    });

    expect((resolved as Dictionary).variant).toBe('school2');
    // The point of the chain: the skipped entry is never fetched.
    expect(loaded).not.toContain('school1');
    expect(loaded).not.toContain('default');
  });

  it('should fall back to the default variant chunk when the selected one has none', () => {
    const loaded: string[] = [];
    const makeLoader = (variant: string) => () => {
      loaded.push(variant);
      return Promise.resolve({
        key: 'lesson',
        variant,
        content: { title: variant },
      });
    };

    const loaderMap: QualifiedDynamicLoaderMap = {
      [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant'],
      en: {
        default: makeLoader('default'),
        preschool: makeLoader('preschool'),
      },
    };

    const resolved = resolveQualifiedDynamicContent<Dictionary>({
      loaderMap,
      key: 'lesson',
      locale: 'en',
      selector: { variant: 'upper-secondary' },
      loadChunk: (cacheKey) =>
        reconstructFromCacheKey(cacheKey, ([variant]) => ({
          key: 'lesson',
          variant,
          content: { title: variant },
        })),
      transform: (dictionary) => dictionary,
    });

    expect((resolved as Dictionary).variant).toBe('default');
    // Only the fallback chunk is downloaded — not the sibling variants.
    expect(loaded).toEqual(['default']);
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
