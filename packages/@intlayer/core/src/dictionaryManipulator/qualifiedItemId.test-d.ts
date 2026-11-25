import type {
  DictionarySelector,
  DictionarySelectorForGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import { describe, expectTypeOf, it } from 'vitest';

/**
 * Compile-time counterpart of `qualifiedItemId.test.ts`: string item ids
 * resolve the same way at the type level as numeric positions.
 */

type BlogGroup = {
  key: 'blog';
  qualifierTypes: readonly ['item'];
  content: {
    '2': { title: 'Pinned' };
    '65f1c0a2': { title: 'First post' };
    '65f1c0b7': { title: 'Second post' };
  };
};

describe('string item ids', () => {
  it('should narrow to the entry of a string id', () => {
    expectTypeOf<
      ResolveQualifiedDictionaryContent<BlogGroup, { item: '65f1c0a2' }>
    >().toEqualTypeOf<{ title: 'First post' }>();
  });

  it('should match a position against its digits', () => {
    expectTypeOf<
      ResolveQualifiedDictionaryContent<BlogGroup, { item: 2 }>
    >().toEqualTypeOf<{ title: 'Pinned' }>();
    expectTypeOf<
      ResolveQualifiedDictionaryContent<BlogGroup, { item: '2' }>
    >().toEqualTypeOf<{ title: 'Pinned' }>();
  });

  it('should resolve an undeclared string id to null', () => {
    expectTypeOf<
      ResolveQualifiedDictionaryContent<BlogGroup, { item: 'missing' }>
    >().toEqualTypeOf<null>();
  });

  it('should accept a string id in the selectors', () => {
    expectTypeOf<{ item: '65f1c0a2' }>().toExtend<
      DictionarySelectorForGroup<BlogGroup>
    >();
    expectTypeOf<{ item: string }>().toExtend<DictionarySelector>();
  });
});
