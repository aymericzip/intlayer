import { describe, expect, it } from 'vitest';
import {
  getNestedDictionaryGraph,
  getNestedDictionaryKeys,
  getNestedDictionaryReferences,
} from './getNestedDictionaryReferences';

/** Builds a compiled `nest()` node as emitted by the transpiler. */
const nestedNode = (dictionaryKey: string, path?: string) => ({
  nodeType: 'nested',
  nested: { dictionaryKey, ...(path ? { path } : {}) },
});

describe('getNestedDictionaryReferences', () => {
  it('should collect the top-level field of a pathed reference', () => {
    const dashboard = {
      key: 'dashboard',
      content: { period: nestedNode('common', 'period') },
    };

    expect(getNestedDictionaryReferences([dashboard])).toEqual(
      new Map([['common', new Set(['period'])]])
    );
  });

  it('should collect the root segment of a deep path', () => {
    const dashboard = {
      key: 'dashboard',
      content: { count: nestedNode('common', 'subContent.contentNumber') },
    };

    expect(getNestedDictionaryReferences([dashboard])).toEqual(
      new Map([['common', new Set(['subContent'])]])
    );
  });

  it('should widen to "all" when a reference has no path', () => {
    const dashboard = {
      key: 'dashboard',
      content: {
        period: nestedNode('common', 'period'),
        whole: nestedNode('common'),
      },
    };

    expect(getNestedDictionaryReferences([dashboard])).toEqual(
      new Map([['common', 'all']])
    );
  });

  it('should keep "all" when a pathed reference follows a pathless one', () => {
    const dashboard = {
      key: 'dashboard',
      content: {
        whole: nestedNode('common'),
        period: nestedNode('common', 'period'),
      },
    };

    expect(getNestedDictionaryReferences([dashboard])).toEqual(
      new Map([['common', 'all']])
    );
  });

  it('should find references nested inside arrays and translation nodes', () => {
    const dashboard = {
      key: 'dashboard',
      content: {
        list: [{ label: nestedNode('common', 'submit') }],
        translated: {
          nodeType: 'translation',
          translation: { en: nestedNode('labels', 'save') },
        },
      },
    };

    expect(getNestedDictionaryReferences([dashboard])).toEqual(
      new Map([
        ['common', new Set(['submit'])],
        ['labels', new Set(['save'])],
      ])
    );
  });

  it('should merge references coming from several dictionaries', () => {
    const dashboard = {
      key: 'dashboard',
      content: { period: nestedNode('common', 'period') },
    };
    const settings = {
      key: 'settings',
      content: { submit: nestedNode('common', 'submit') },
    };

    expect(getNestedDictionaryReferences([dashboard, settings])).toEqual(
      new Map([['common', new Set(['period', 'submit'])]])
    );
  });

  it('should terminate on circular references', () => {
    const dictionary: Record<string, unknown> = { key: 'looping' };
    dictionary.content = { self: dictionary, nested: nestedNode('common') };

    expect(getNestedDictionaryKeys([dictionary])).toEqual(new Set(['common']));
  });

  it('should return no reference for a dictionary without nesting', () => {
    const dictionary = { key: 'plain', content: { title: 'Hello' } };

    expect(getNestedDictionaryKeys([dictionary]).size).toBe(0);
  });

  it('should ignore a nested node without a dictionary key', () => {
    const dictionary = {
      key: 'broken',
      content: { ref: { nodeType: 'nested', nested: {} } },
    };

    expect(getNestedDictionaryKeys([dictionary]).size).toBe(0);
  });
});

describe('getNestedDictionaryGraph', () => {
  it('should map a consumer to the dictionary it nests', () => {
    const dashboard = {
      key: 'dashboard',
      content: { period: nestedNode('common', 'period') },
    };

    expect(getNestedDictionaryGraph([dashboard])).toEqual(
      new Map([['dashboard', new Set(['common'])]])
    );
  });

  it('should close transitively over chained references', () => {
    const dashboard = {
      key: 'dashboard',
      content: { period: nestedNode('common', 'period') },
    };
    const common = {
      key: 'common',
      content: { label: nestedNode('labels', 'save') },
    };

    expect(getNestedDictionaryGraph([dashboard, common])).toEqual(
      new Map([
        ['dashboard', new Set(['common', 'labels'])],
        ['common', new Set(['labels'])],
      ])
    );
  });

  it('should terminate on a reference cycle', () => {
    const a = { key: 'a', content: { b: nestedNode('b') } };
    const b = { key: 'b', content: { a: nestedNode('a') } };

    expect(getNestedDictionaryGraph([a, b])).toEqual(
      new Map([
        ['a', new Set(['b'])],
        ['b', new Set(['a'])],
      ])
    );
  });

  it('should ignore a dictionary nesting itself', () => {
    const selfish = { key: 'selfish', content: { own: nestedNode('selfish') } };

    expect(getNestedDictionaryGraph([selfish]).size).toBe(0);
  });

  it('should omit dictionaries without nested nodes', () => {
    const plain = { key: 'plain', content: { title: 'Hello' } };

    expect(getNestedDictionaryGraph([plain]).size).toBe(0);
  });
});
