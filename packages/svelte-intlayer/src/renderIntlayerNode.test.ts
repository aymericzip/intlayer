import { beforeEach, describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks – must be declared before any import that transitively loads them.
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({ editor: { enabled: false } }));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

// Mock the Svelte wrapper component so vitest doesn't try to parse it.
vi.mock('./IntlayerNodeWrapper.svelte', () => ({
  default: () => null,
}));

// Mock the editor module (exports Svelte components).
vi.mock('./editor', () => ({
  ContentSelectorWrapper: () => null,
}));

// Mock Svelte markdown components.
vi.mock('./markdown/MarkdownMetadataWithSelector.svelte', () => ({
  default: () => null,
}));
vi.mock('./markdown/MarkdownWithSelector.svelte', () => ({
  default: () => null,
}));
vi.mock('./markdown/runtime', () => ({
  svelteHtmlRuntime: {},
}));

import { getDictionary } from './getDictionary';
import { renderIntlayerNode } from './renderIntlayerNode';

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
      value: 'Hello',
      component: 'Hello',
      props: {},
    });
    expect(node.value).toBe('Hello');
  });

  it('exposes .value with a raw number', () => {
    const node = renderIntlayerNode({
      value: 42,
      component: 42,
      props: {},
    });
    expect(node.value).toBe(42);
  });

  it('toString() returns the string representation', () => {
    const node = renderIntlayerNode({
      value: 'Hello',
      component: 'Hello',
      props: {},
    });
    expect(node.toString()).toBe('Hello');
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
