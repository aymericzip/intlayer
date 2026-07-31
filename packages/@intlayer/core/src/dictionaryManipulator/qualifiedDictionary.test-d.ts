import type {
  DictionarySelectorForGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import { describe, expectTypeOf, it } from 'vitest';

/**
 * Compile-time counterpart of `qualifiedDictionary.test.ts`. The runtime
 * resolver and `ResolveQualifiedDictionaryContent` implement the same rules
 * twice — once in value space, once in type space — so a divergence between
 * them is invisible to the runtime suite. These assertions pin the type side.
 *
 * Groups are written the way `createTypes` emits them (`as const`, hence
 * readonly tuples of qualifier dimensions and literal composite-id keys).
 */

type LessonGroup = {
  key: 'lesson';
  qualifierTypes: readonly ['variant'];
  content: {
    default: { title: 'Lesson'; teacher: 'Teacher' };
    preschool: { title: 'Lesson'; teacher: 'Pedagogue' };
  };
};

type NoDefaultGroup = {
  key: 'promoOnly';
  qualifierTypes: readonly ['variant'];
  content: { promo: { title: 'Promo' } };
};

type BannerGroup = {
  key: 'banner';
  qualifierTypes: readonly ['variant', 'item'];
  content: {
    'default/1': { title: 'D1' };
    'promo/1': { title: 'P1' };
    'promo/2': { title: 'P2' };
  };
};

type FaqGroup = {
  key: 'faq';
  qualifierTypes: readonly ['item'];
  content: { '1': { question: 'Q1' }; '2': { question: 'Q2' } };
};

type ProductGroup = {
  key: 'product';
  qualifierTypes: readonly ['variant'];
  content: { 'id=abc&userId=123': { name: 'ABC' } };
};

describe('ResolveQualifiedDictionaryContent', () => {
  it('should resolve a plain dictionary to its content, ignoring the selector', () => {
    expectTypeOf<
      ResolveQualifiedDictionaryContent<{ key: 'home'; content: { a: 'b' } }>
    >().toEqualTypeOf<{ a: 'b' }>();
  });

  describe('variant', () => {
    it('should resolve to the default entry when no variant is selected', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<LessonGroup>
      >().toEqualTypeOf<{ title: 'Lesson'; teacher: 'Teacher' }>();
    });

    it('should resolve a locale-only selector like no selector', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<LessonGroup, { locale: 'sv' }>
      >().toEqualTypeOf<{ title: 'Lesson'; teacher: 'Teacher' }>();
    });

    it('should resolve a declared variant to its own entry', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<LessonGroup, { variant: 'preschool' }>
      >().toEqualTypeOf<{ title: 'Lesson'; teacher: 'Pedagogue' }>();
    });

    it('should fall back to the default entry for an undeclared variant', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<
          LessonGroup,
          { variant: 'upperSecondary' }
        >
      >().toEqualTypeOf<{ title: 'Lesson'; teacher: 'Teacher' }>();
    });

    it('should resolve to null when no default entry is declared', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<
          NoDefaultGroup,
          { variant: 'unknown' }
        >
      >().toEqualTypeOf<null>();
    });

    it('should resolve an object variant to its entry', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<
          ProductGroup,
          { variant: { id: 'abc'; userId: '123' } }
        >
      >().toEqualTypeOf<{ name: 'ABC' }>();
    });

    it('should resolve to null when an object-variant key has no default', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<ProductGroup>
      >().toEqualTypeOf<null>();
    });
  });

  describe('item', () => {
    it('should resolve to an array of every item when the axis is left open', () => {
      expectTypeOf<ResolveQualifiedDictionaryContent<FaqGroup>>().toEqualTypeOf<
        ({ question: 'Q1' } | { question: 'Q2' })[]
      >();
    });

    it('should narrow to the selected item', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<FaqGroup, { item: 2 }>
      >().toEqualTypeOf<{ question: 'Q2' }>();
    });
  });

  describe('composite (variant × item)', () => {
    it('should narrow to a single entry when both dimensions are pinned', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<
          BannerGroup,
          { variant: 'promo'; item: 2 }
        >
      >().toEqualTypeOf<{ title: 'P2' }>();
    });

    it('should fan the item axis out for the selected variant', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<BannerGroup, { variant: 'promo' }>
      >().toEqualTypeOf<({ title: 'P1' } | { title: 'P2' })[]>();
    });

    it('should fall back to the default variant then fan out its items', () => {
      expectTypeOf<
        ResolveQualifiedDictionaryContent<BannerGroup, { variant: 'unknown' }>
      >().toEqualTypeOf<{ title: 'D1' }[]>();
    });
  });
});

describe('DictionarySelectorForGroup', () => {
  /** Stands in for the project-wide variant vocabulary (`DeclaredVariants`). */
  type ProjectVariants = 'default' | 'preschool' | 'promo';

  type LessonSelector = DictionarySelectorForGroup<
    LessonGroup,
    ProjectVariants
  >;

  it('should accept a variant this key declares', () => {
    expectTypeOf<{ variant: 'preschool' }>().toExtend<LessonSelector>();
  });

  it('should accept a variant declared elsewhere in the project', () => {
    // `LessonGroup` has no `promo` entry — it resolves to `default` at runtime,
    // which is what makes one session-wide variant usable across every key.
    expectTypeOf<{ variant: 'promo' }>().toExtend<LessonSelector>();
  });

  it('should reject a variant no dictionary declares', () => {
    expectTypeOf<{ variant: 'promoo' }>().not.toExtend<LessonSelector>();
  });

  it('should reject an object variant on a key that declares none', () => {
    expectTypeOf<{ variant: { id: 'abc' } }>().not.toExtend<LessonSelector>();
  });

  describe('object variants', () => {
    // `ProductGroup` stores `'id=abc&userId=123'` — the serialized form of
    // `{ id: 'abc', userId: '123' }`.
    type ProductSelector = DictionarySelectorForGroup<
      ProductGroup,
      ProjectVariants
    >;

    it('should accept the object the key declares', () => {
      expectTypeOf<{
        variant: { id: 'abc'; userId: '123' };
      }>().toExtend<ProductSelector>();
    });

    it('should reject the serialized form as a string', () => {
      // `'id=abc&userId=123'` is a storage encoding, not part of the API.
      expectTypeOf<{
        variant: 'id=abc&userId=123';
      }>().not.toExtend<ProductSelector>();
    });

    it('should reject a partial or mismatched object', () => {
      expectTypeOf<{
        variant: { id: 'abc' };
      }>().not.toExtend<ProductSelector>();
      expectTypeOf<{
        variant: { id: 'abc'; userId: 'other' };
      }>().not.toExtend<ProductSelector>();
    });
  });

  it('should reject an undeclared locale', () => {
    expectTypeOf<{ locale: 'not-a-locale' }>().not.toExtend<LessonSelector>();
  });
});

describe('DictionarySelectorForGroup — keys without a default entry', () => {
  type ProjectVariants = 'default' | 'preschool' | 'promo';

  // Declares only object variants: an undeclared name resolves to `null`, so
  // the project vocabulary must not be accepted here.
  type ProductSelector = DictionarySelectorForGroup<
    ProductGroup,
    ProjectVariants
  >;

  // Declares `promo` but no `default` — same reasoning.
  type NoDefaultSelector = DictionarySelectorForGroup<
    NoDefaultGroup,
    ProjectVariants
  >;

  it('should reject a project variant on a key with no default entry', () => {
    expectTypeOf<{ variant: 'promo' }>().not.toExtend<ProductSelector>();
    expectTypeOf<{ variant: 'default' }>().not.toExtend<ProductSelector>();
    expectTypeOf<{ variant: 'preschool' }>().not.toExtend<NoDefaultSelector>();
  });

  it('should still accept the names such a key declares itself', () => {
    expectTypeOf<{ variant: 'promo' }>().toExtend<NoDefaultSelector>();
  });
});
