import { describe, expect, it } from 'vitest';
import { enu, select } from '../../transpiler';
import { deepTransformNode } from './deepTransform';
import { enumerationPlugin, type NodeProps, selectPlugin } from './plugins';

const nodeProps: NodeProps = {
  dictionaryKey: 'test',
  keyPath: [],
};

const transform = (node: unknown, plugins = [selectPlugin]) =>
  deepTransformNode(node, { ...nodeProps, plugins });

describe('selectPlugin', () => {
  const publishStatus = select({
    draft: 'This post is a draft',
    published: 'This post is live',
    scheduled: 'This post is scheduled',
    fallback: 'Unknown status',
  });

  it('should resolve a declared case from a string selector', () => {
    const resolve = transform(publishStatus);

    expect(resolve('draft')).toBe('This post is a draft');
    expect(resolve('scheduled')).toBe('This post is scheduled');
  });

  it('should resolve a declared case from an object selector', () => {
    const resolve = transform(publishStatus);

    expect(resolve({ value: 'published' })).toBe('This post is live');
  });

  it('should resolve the fallback for an unknown case', () => {
    const resolve = transform(publishStatus);

    expect(resolve('Archived')).toBe('Unknown status');
  });

  it('should keep the variable name declared on the node', () => {
    expect(select({ a: 'A' }, 'publishType').variable).toBe('publishType');
  });
});

describe('enumerationPlugin', () => {
  it('should resolve numeric quantities', () => {
    const resolve = transform(
      enu({ '0': 'No items', '1': 'One item', '>1': 'Many items' }),
      [enumerationPlugin]
    );

    expect(resolve(0)).toBe('No items');
    expect(resolve(5)).toBe('Many items');
    expect(resolve({ count: 1 })).toBe('One item');
  });
});
