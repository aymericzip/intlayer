import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { enu, insert, plural } from '../../transpiler';
import { deepTransformNode } from './deepTransform';
import {
  enumerationPlugin,
  insertionPlugin,
  type NodeProps,
  pluralPlugin,
  resolveInsertedSelector,
} from './plugins';

const nodeProps: NodeProps = {
  dictionaryKey: 'test',
  keyPath: [],
};

const transform = (node: unknown) =>
  deepTransformNode(node, {
    ...nodeProps,
    plugins: [pluralPlugin('en'), enumerationPlugin, insertionPlugin],
  });

describe('pluralPlugin', () => {
  it('should interpolate {{count}} in plain string branches', () => {
    const resolve = transform(
      plural({ one: '{{count}} item', other: '{{count}} items' })
    );

    expect(resolve(1)).toBe('1 item');
    expect(resolve(5)).toBe('5 items');
  });

  // `contentAutoTransformation.insertion` wraps every `{{count}}` branch in
  // an insertion node; the plural string plugin must not reach inside it.
  it('should interpolate {{count}} in auto-transformed insertion branches', () => {
    const resolve = transform({
      nodeType: NodeTypes.PLURAL,
      [NodeTypes.PLURAL]: {
        one: insert('{{count}} item'),
        other: insert('{{count}} items'),
      },
    });

    expect(resolve(1)).toBe('1 item');
    expect(resolve({ count: 5 })).toBe('5 items');
  });

  // The plural interpolates its own branches: the enclosing `insert()` string
  // plugin must not turn them into functions first.
  it('should interpolate branches when wrapped in insert()', () => {
    const resolve = transform(
      insert(
        plural({
          one: '{{count}} item for {{name}}',
          other: '{{count}} items for {{name}}',
        })
      )
    );

    expect(resolve({ name: 'Bo' })(5)).toBe('5 items for Bo');
    expect(resolve({ name: 'Bo' })({ count: 5 })).toBe('5 items for Bo');
  });
});

describe('resolveInsertedSelector', () => {
  const echoSelector = (selector: unknown) => selector;

  it('should return the result unchanged for non-selector children', () => {
    expect(resolveInsertedSelector('text', 'text')).toBe('text');
    expect(
      resolveInsertedSelector({ nodeType: NodeTypes.TRANSLATION }, echoSelector)
    ).toBe(echoSelector);
  });

  it('should apply the values to the selected branch', () => {
    const resolveSelector = (selector: unknown) =>
      selector === 'male'
        ? (values: { name: string }) => `he ${values.name}`
        : 'they';
    const resolve = resolveInsertedSelector(
      { nodeType: NodeTypes.GENDER },
      resolveSelector
    ) as (values: object) => (selector: unknown) => unknown;

    expect(resolve({ name: 'Bo' })('male')).toBe('he Bo');
    expect(resolve({ name: 'Bo' })('female')).toBe('they');
  });

  it('should merge the values into an object selector', () => {
    const resolve = resolveInsertedSelector(
      { nodeType: NodeTypes.SELECT },
      echoSelector
    ) as (values: object) => (selector: unknown) => unknown;

    expect(resolve({ name: 'Bo' })({ value: 'a' })).toEqual({
      name: 'Bo',
      value: 'a',
    });
  });

  it('should pass a plural count along with the values', () => {
    const resolve = resolveInsertedSelector(
      { nodeType: NodeTypes.PLURAL },
      echoSelector
    ) as (values: object) => (selector: unknown) => unknown;

    expect(resolve({ name: 'Bo' })(5)).toEqual({ name: 'Bo', count: 5 });
  });

  it.each([NodeTypes.PLURAL, NodeTypes.ENUMERATION])(
    'should let the %s selector win over a count in the values',
    (nodeType) => {
      const resolve = resolveInsertedSelector({ nodeType }, echoSelector) as (
        values: object
      ) => (selector: unknown) => unknown;

      expect(resolve({ count: 1, name: 'Bo' })(5)).toEqual({
        name: 'Bo',
        count: 5,
      });
    }
  );

  it('should select and interpolate an inserted enumeration by its count', () => {
    const resolve = transform(
      insert(enu({ '1': '{{count}} item', '>1': '{{count}} items' }))
    ) as (values: object) => (selector: number) => unknown;

    expect(resolve({ count: 1 })(5)).toBe('5 items');
  });
});
