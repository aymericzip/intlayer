import { describe, expect, it } from 'vitest';
import { delegateNativeMethods } from './delegateNativeMethods';

describe('delegateNativeMethods', () => {
  it('serves the native methods of a string value', () => {
    const node = delegateNativeMethods({}, () => 'hello') as {
      toUpperCase: () => string;
      split: (separator: string) => string[];
    };

    expect(node.toUpperCase()).toBe('HELLO');
    expect(node.split('l')).toEqual(['he', '', 'o']);
    expect('toUpperCase' in node).toBe(true);
  });

  it('serves the native methods of number and array values', () => {
    const numberNode = delegateNativeMethods({}, () => 3.14159) as {
      toFixed: (digits: number) => string;
    };
    const arrayNode = delegateNativeMethods({}, () => [1, 2, 3]) as {
      map: (callback: (item: number) => number) => number[];
    };

    expect(numberNode.toFixed(2)).toBe('3.14');
    expect(arrayNode.map((item) => item * 2)).toEqual([2, 4, 6]);
  });

  it('binds to the current value, not the initial one', () => {
    let currentValue = 'before';
    const node = delegateNativeMethods({}, () => currentValue) as {
      toUpperCase: () => string;
    };

    currentValue = 'after';

    expect(node.toUpperCase()).toBe('AFTER');
  });

  it('keeps members already reachable on the node', () => {
    const node = delegateNativeMethods(
      { toString: () => 'own', value: 'text' },
      () => 'text'
    );

    expect(node.toString()).toBe('own');
    expect(node.value).toBe('text');
    expect(Object.hasOwn(node, 'toUpperCase')).toBe(false);
  });

  it('ignores non-method, inherited and missing members', () => {
    const node = delegateNativeMethods({}, () => [1, 2]) as Record<
      string,
      unknown
    >;
    const emptyNode = delegateNativeMethods({}, () => null) as Record<
      string,
      unknown
    >;

    expect(node.length).toBeUndefined();
    expect(node.constructor).toBe(Object);
    expect(node.hasOwnProperty).toBe(Object.prototype.hasOwnProperty);
    expect(emptyNode.toUpperCase).toBeUndefined();
    expect('toUpperCase' in emptyNode).toBe(false);
  });

  it('keeps callable nodes callable', () => {
    const node = delegateNativeMethods(
      (name: string) => `hi ${name}`,
      () => 'value'
    );

    expect(node('bob')).toBe('hi bob');
    expect((node as unknown as { trim: () => string }).trim()).toBe('value');
  });
});
