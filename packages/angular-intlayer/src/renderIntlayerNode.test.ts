import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderIntlayerNode } from './renderIntlayerNode';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

// Mock the editor module (exports Angular components).
vi.mock('./editor', () => ({
  ContentSelectorWrapperComponent: class {},
}));

// Angular markdown helpers may have complex deps.
vi.mock('./markdown/installIntlayerMarkdown', () => ({
  htmlRuntime: {},
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
//
// In Angular, children is always a function (component accessor), never a
// plain string – passing a plain string would throw "Proxy target must be an
// object".
// ---------------------------------------------------------------------------

const fn = () => 'stub';

describe('renderIntlayerNode', () => {
  it('exposes .value with the raw string', () => {
    const node = renderIntlayerNode({ children: fn, value: 'Hello' });
    expect(node.value).toBe('Hello');
  });

  it('exposes .value with a raw number', () => {
    const node = renderIntlayerNode({ children: fn as any, value: 42 });
    expect(node.value).toBe(42);
  });

  it('toString() returns the string representation', () => {
    const node = renderIntlayerNode({ children: fn, value: 'Hello' });
    expect(node.toString()).toBe('Hello');
  });

  it('template literal coercion returns the raw string', () => {
    const node = renderIntlayerNode({ children: fn, value: 'World' });
    expect(`${node}`).toBe('World');
  });

  it('exposes additionalProps through the Proxy', () => {
    const node = renderIntlayerNode({
      children: fn,
      value: 'Hello',
      additionalProps: { 'data-custom': 'bar' },
    });
    expect((node as any)['data-custom']).toBe('bar');
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
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.value).toBe('Hello World');
  });

  it('field.value returns the raw number', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).count.value).toBe(42);
  });

  it('field.toString() returns the raw string', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.toString()).toBe('Hello World');
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
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.value).toBe('Hello World');
  });

  it('field.toString() still returns the raw string', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.toString()).toBe('Hello World');
  });
});
