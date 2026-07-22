import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import type { NodeProps } from './getContent/plugins';
import {
  getInterpolableContent,
  isInterpolableWrapperNode,
  rebuildInterpolableContent,
  transformInterpolableNode,
} from './interpolableNode';

const htmlNode = {
  nodeType: NodeTypes.HTML,
  [NodeTypes.HTML]: '<b>{{count}}</b> day',
  tags: { b: true },
};

const markdownNode = {
  nodeType: NodeTypes.MARKDOWN,
  [NodeTypes.MARKDOWN]: '**{{count}}** days',
};

describe('isInterpolableWrapperNode', () => {
  it('detects html and markdown wrapper nodes', () => {
    expect(isInterpolableWrapperNode(htmlNode)).toBe(true);
    expect(isInterpolableWrapperNode(markdownNode)).toBe(true);
  });

  it('rejects strings, plain objects and nullish values', () => {
    expect(isInterpolableWrapperNode('{{count}} day')).toBe(false);
    expect(isInterpolableWrapperNode({ nodeType: NodeTypes.TRANSLATION })).toBe(
      false
    );
    expect(isInterpolableWrapperNode(null)).toBe(false);
    expect(isInterpolableWrapperNode(undefined)).toBe(false);
  });
});

describe('getInterpolableContent', () => {
  it('returns the raw string for a plain string', () => {
    expect(getInterpolableContent('{{count}} day')).toBe('{{count}} day');
  });

  it('returns the inner raw string for html and markdown nodes', () => {
    expect(getInterpolableContent(htmlNode)).toBe('<b>{{count}}</b> day');
    expect(getInterpolableContent(markdownNode)).toBe('**{{count}}** days');
  });

  it('returns undefined for non-interpolable nodes', () => {
    expect(
      getInterpolableContent({ nodeType: NodeTypes.TRANSLATION })
    ).toBeUndefined();
    expect(getInterpolableContent(42)).toBeUndefined();
  });
});

describe('rebuildInterpolableContent', () => {
  it('returns the interpolated string for a plain string', () => {
    expect(rebuildInterpolableContent('{{count}} day', '1 day')).toBe('1 day');
  });

  it('preserves html node shape while swapping the inner string', () => {
    const rebuilt = rebuildInterpolableContent(htmlNode, '<b>1</b> day');

    expect(rebuilt).toEqual({
      nodeType: NodeTypes.HTML,
      [NodeTypes.HTML]: '<b>1</b> day',
      tags: { b: true },
    });
    // Original node stays untouched.
    expect(htmlNode[NodeTypes.HTML]).toBe('<b>{{count}}</b> day');
  });

  it('preserves markdown node shape while swapping the inner string', () => {
    const rebuilt = rebuildInterpolableContent(markdownNode, '**1** days');

    expect(rebuilt).toEqual({
      nodeType: NodeTypes.MARKDOWN,
      [NodeTypes.MARKDOWN]: '**1** days',
    });
  });

  it('returns non-interpolable nodes unchanged', () => {
    const node = { nodeType: NodeTypes.TRANSLATION };
    expect(rebuildInterpolableContent(node, 'ignored')).toBe(node);
  });
});

describe('transformInterpolableNode', () => {
  const nodeProps: NodeProps = { dictionaryKey: 'test', keyPath: [] };

  it('interpolates values into an html node and re-runs the transform', () => {
    const result = transformInterpolableNode(
      htmlNode,
      { count: 3 },
      nodeProps,
      undefined,
      (transformedNode) => transformedNode
    );

    expect(result).toEqual({
      nodeType: NodeTypes.HTML,
      [NodeTypes.HTML]: '<b>3</b> day',
      tags: { b: true },
    });
  });

  it('interpolates values into a markdown node and passes parent plugins', () => {
    const receivedProps: NodeProps[] = [];
    const parentPlugins = [
      { id: 'parent-plugin', canHandle: () => false, transform: (n: any) => n },
    ];

    transformInterpolableNode(
      markdownNode,
      { count: 7 },
      nodeProps,
      parentPlugins,
      (transformedNode, props) => {
        receivedProps.push(props);
        return transformedNode;
      }
    );

    expect(receivedProps[0]?.plugins).toBe(parentPlugins);
    expect(receivedProps[0]?.children).toEqual({
      nodeType: NodeTypes.MARKDOWN,
      [NodeTypes.MARKDOWN]: '**7** days',
    });
  });
});
