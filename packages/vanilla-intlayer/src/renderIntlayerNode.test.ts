// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { renderIntlayerNode } from './renderIntlayerNode';

describe('renderIntlayerNode', () => {
  it('behaves like its value', () => {
    const node = renderIntlayerNode({ value: 'Hello' });

    expect(node.value).toBe('Hello');
    expect(`${node}!`).toBe('Hello!');
    expect(node.toUpperCase()).toBe('HELLO');
    expect('toUpperCase' in node).toBe(true);
    expect(node.length).toBe(5);
  });

  it('serves the updated value after __update', () => {
    const node = renderIntlayerNode({ value: 'Hello' });

    node.__update(renderIntlayerNode({ value: 'Bonjour' }));

    expect(node.value).toBe('Bonjour');
    expect(node.toUpperCase()).toBe('BONJOUR');
  });
});
