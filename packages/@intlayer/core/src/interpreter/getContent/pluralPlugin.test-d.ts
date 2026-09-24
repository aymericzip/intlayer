import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expectTypeOf, it } from 'vitest';
import type { DeepTransformContent } from './plugins';

type PluralNode<Branch> = {
  nodeType: typeof NodeTypes.PLURAL;
  [NodeTypes.PLURAL]: { one: Branch; other: Branch };
};

type InsertionBranch = {
  nodeType: typeof NodeTypes.INSERTION;
  [NodeTypes.INSERTION]: string;
  fields: ['count'];
};

describe('PluralCond', () => {
  it('should resolve a string branch to a string', () => {
    expectTypeOf<
      ReturnType<DeepTransformContent<PluralNode<string>>>
    >().toEqualTypeOf<string>();
  });

  // Auto-transformed `{{count}}` branches: the plural already applies the
  // values, so a single call must yield the content.
  it('should unwrap an insertion branch to its inner content', () => {
    expectTypeOf<
      ReturnType<DeepTransformContent<PluralNode<InsertionBranch>>>
    >().toEqualTypeOf<string>();
  });
});
