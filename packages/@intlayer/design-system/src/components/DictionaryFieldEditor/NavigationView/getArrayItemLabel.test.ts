import type { ContentNode } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { getArrayItemLabel } from './getArrayItemLabel';

/** Casts a plain fixture to a content node. */
const asNode = (value: unknown): ContentNode => value as ContentNode;

const translation = (translations: Record<string, string>): ContentNode =>
  ({
    nodeType: NodeTypes.TRANSLATION,
    [NodeTypes.TRANSLATION]: translations,
  }) as unknown as ContentNode;

describe('getArrayItemLabel', () => {
  it('prefers title over id', () => {
    expect(
      getArrayItemLabel(asNode({ id: 'codebase', title: 'Codebase' }))
    ).toBe('Codebase');
  });

  it('falls back to id when no title-like field exists', () => {
    expect(
      getArrayItemLabel(asNode({ id: 'compiler', description: 'x' }))
    ).toBe('compiler');
  });

  it('resolves translated fields for the requested locale', () => {
    const item = asNode({
      title: translation({ en: 'Compiler', fr: 'Compilateur' }),
    });

    expect(getArrayItemLabel(item, 'fr')).toBe('Compilateur');
    expect(getArrayItemLabel(item)).toBe('Compiler');
  });

  it('skips empty strings and uses the next field', () => {
    expect(getArrayItemLabel(asNode({ title: '  ', name: 'Fallback' }))).toBe(
      'Fallback'
    );
  });

  it('truncates long labels', () => {
    const label = getArrayItemLabel(asNode({ title: 'a'.repeat(100) }));

    expect(label?.length).toBe(60);
    expect(label?.endsWith('…')).toBe(true);
  });

  it('returns undefined for primitives, arrays and typed nodes', () => {
    expect(getArrayItemLabel(asNode('text'))).toBeUndefined();
    expect(getArrayItemLabel(asNode([]))).toBeUndefined();
    expect(getArrayItemLabel(translation({ en: 'x' }))).toBeUndefined();
    expect(getArrayItemLabel(asNode({ description: 'x' }))).toBe(undefined);
  });
});
