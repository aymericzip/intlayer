import { describe, expect, it } from 'vitest';
import { getIntlayerNodePrototype } from './intlayerNodePrototype';

/** Builds a node the way framework packages do: own fields, shared prototype. */
const createNode = <Value>(value: Value) =>
  ({ __proto__: getIntlayerNodePrototype(value), value }) as unknown as Record<
    string,
    any
  > & { value: Value };

describe('getIntlayerNodePrototype', () => {
  it('makes a node behave like its string value', () => {
    const node = createNode('hello');

    expect(node.toUpperCase()).toBe('HELLO');
    expect(node.split('l')).toEqual(['he', '', 'o']);
    expect(node.length).toBe(5);
    expect(node[1]).toBe('e');
    expect(`${node}!`).toBe('hello!');
    expect(String(node)).toBe('hello');
    expect('toUpperCase' in node).toBe(true);
    expect('toFixed' in node).toBe(false);
  });

  it('serves number and array members', () => {
    const numberNode = createNode(4.5);
    const arrayNode = createNode([1, 2, 3]);

    expect(numberNode.toFixed(2)).toBe('4.50');
    expect(+numberNode).toBe(4.5);
    expect(arrayNode.map((item: number) => item * 2)).toEqual([2, 4, 6]);
  });

  it('keeps bound methods usable once detached', () => {
    const { trim } = createNode('  padded  ');

    expect(trim()).toBe('padded');
  });

  it('reads the current value, not the initial one', () => {
    const node = createNode('before');

    node.value = 'after';

    expect(node.toUpperCase()).toBe('AFTER');
  });

  it('keeps own fields and base prototype members first', () => {
    const node = {
      __proto__: getIntlayerNodePrototype('text', Function.prototype),
      value: 'text',
      toString: () => 'own',
    } as unknown as Record<string, any>;

    expect(node.toString()).toBe('own');
    expect(node.call).toBe(Function.prototype.call);
    expect(node.constructor).toBe(Function);
  });

  it('serves nothing for an empty value', () => {
    const node = createNode(null);

    expect(node.toUpperCase).toBeUndefined();
    expect('toUpperCase' in node).toBe(false);
    expect(`${node}`).toBe('');
  });

  it('shares one prototype per base and value type', () => {
    expect(getIntlayerNodePrototype('a')).toBe(getIntlayerNodePrototype('b'));
    expect(getIntlayerNodePrototype('a')).not.toBe(getIntlayerNodePrototype(1));
  });
});
