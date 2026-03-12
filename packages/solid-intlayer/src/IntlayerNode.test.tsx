import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderIntlayerNode } from './IntlayerNode';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({ editor: { enabled: false } }));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

vi.mock('./editor', () => ({
  ContentSelectorRenderer: () => null,
}));

vi.mock('./editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: () => null,
}));

import { getDictionary } from './getDictionary';

// ---------------------------------------------------------------------------
// Fixture dictionary
// ---------------------------------------------------------------------------

const dict = {
  key: 'test' as const,
  content: { greeting: 'Hello World', count: 42 },
} as const;

// ---------------------------------------------------------------------------
// renderIntlayerNode – unit tests
// ---------------------------------------------------------------------------

describe('renderIntlayerNode', () => {
  it('exposes .value with the raw string', () => {
    const node = renderIntlayerNode({
      children: 'Hello',
      value: 'Hello',
    }) as any;
    expect(node.value).toBe('Hello');
  });

  it('exposes .value with a raw number', () => {
    const node = renderIntlayerNode({ children: 42, value: 42 }) as any;
    expect(node.value).toBe(42);
  });

  it('toString() returns the string representation', () => {
    const node = renderIntlayerNode({
      children: 'Hello',
      value: 'Hello',
    }) as any;
    expect(node.toString()).toBe('Hello');
  });

  it('template literal coercion returns the raw string', () => {
    const node = renderIntlayerNode({
      children: 'World',
      value: 'World',
    });
    expect(`${node}`).toBe('World');
  });

  it('contains the children inside the internal array', () => {
    const node = renderIntlayerNode({
      children: 'Hello',
      value: 'Hello',
    });
    // Solid targets an array; the raw children should be the first item.
    expect(node[0]).toBe('Hello');
  });
});

// ---------------------------------------------------------------------------
// getDictionary – editor disabled (default)
// ---------------------------------------------------------------------------

describe('getDictionary – editor disabled', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = false;
  });

  it('field.value returns the raw string', () => {
    const result = getDictionary(dict, 'en');
    expect(result.greeting.value).toBe('Hello World');
  });

  it('field.value returns the raw number', () => {
    const result = getDictionary(dict, 'en');
    expect(result.count.value).toBe(42);
  });

  it('field.toString() returns the raw string', () => {
    const result = getDictionary(dict, 'en');
    expect(result.greeting.toString()).toBe('Hello World');
  });

  it('children is the raw string (no editor wrapper)', () => {
    const result = getDictionary(dict, 'en');
    // In Solid, the Proxy target is an array; first element is the children.
    expect(result.greeting[0]).toBe('Hello World');
  });
});

// ---------------------------------------------------------------------------
// getDictionary – editor enabled
// ---------------------------------------------------------------------------

describe('getDictionary – editor enabled', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = true;
  });

  it('field.value still returns the raw string', () => {
    const result = getDictionary(dict, 'en');
    expect(result.greeting.value).toBe('Hello World');
  });

  it('field.toString() still returns the raw string', () => {
    const result = getDictionary(dict, 'en');
    expect(result.greeting.toString()).toBe('Hello World');
  });
});
