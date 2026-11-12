import type { ContentNode } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { reorderChildNodes } from './reorderChildNodes';

describe('reorderChildNodes', () => {
  it('reorders object keys and keeps their values', () => {
    const node = { title: 'a', subtitle: 'b', footer: 'c' } as ContentNode;
    const reordered = reorderChildNodes(node, 'footer', 'title');

    expect(Object.keys(reordered as object)).toEqual([
      'footer',
      'title',
      'subtitle',
    ]);
    expect(reordered).toEqual(node);
  });

  it('moves array items', () => {
    const node = ['a', 'b', 'c'] as unknown as ContentNode;

    expect(reorderChildNodes(node, 0, 2)).toEqual(['b', 'c', 'a']);
  });

  it('leaves non-container nodes unchanged', () => {
    expect(reorderChildNodes('text' as ContentNode, 'a', 'b')).toBe('text');
  });
});
