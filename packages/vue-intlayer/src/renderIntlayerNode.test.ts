import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderIntlayerNode } from './renderIntlayerNode';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({ editor: { enabled: false } }));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

// The editor module exports .vue components – mock the whole module.
vi.mock('./editor', () => ({
  ContentSelectorWrapper: {},
}));

// useMarkdown may have complex deps; mock it out.
vi.mock('./markdown/installIntlayerMarkdown', () => ({
  useMarkdown: () => null,
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
    const node = renderIntlayerNode({ value: 'Hello', children: 'Hello' });
    expect(node.value).toBe('Hello');
  });

  it('exposes .value with a raw number', () => {
    const node = renderIntlayerNode({ value: 42, children: 42 });
    expect(node.value).toBe(42);
  });

  it('toString() returns the string representation', () => {
    const node = renderIntlayerNode({ value: 'Hello', children: 'Hello' });
    expect(node.toString()).toBe('Hello');
  });

  it('String() coercion returns the raw string', () => {
    const node = renderIntlayerNode({ value: 'Hello', children: 'Hello' });
    expect(String(node)).toBe('Hello');
  });

  it('template literal coercion returns the raw string', () => {
    const node = renderIntlayerNode({ value: 'World', children: 'World' });
    expect(`${node}`).toBe('World');
  });

  it('.raw mirrors the reactive value', () => {
    const node = renderIntlayerNode({ value: 'Hello', children: 'Hello' });
    expect(node.raw).toBe('Hello');
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

  it('children is the raw value (not a Vue h() call) when editor is disabled', () => {
    const result = getDictionary(dict, 'en');
    // When editor disabled the node's render fn just returns the raw string, not a VNode.
    const rendered = result.greeting.render();
    expect(rendered).toBe('Hello World');
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
