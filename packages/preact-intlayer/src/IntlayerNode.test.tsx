import { Fragment, h } from 'preact';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderIntlayerNode } from './IntlayerNode';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

// isEnabled is a module-level constant in @intlayer/editor/isEnabled that is
// evaluated once at import time.  We need a getter so its value can change
// between test cases.
const mockIsEnabled = vi.hoisted(() => ({ value: false }));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

// Make isEnabled a live getter so beforeEach can flip it.
vi.mock('@intlayer/editor/isEnabled', () => ({
  get isEnabled() {
    return mockIsEnabled.value;
  },
}));

// plugins.tsx imports ContentSelector from './editor/ContentSelector' (not './editor').
vi.mock('./editor/ContentSelector', () => ({
  ContentSelector: vi.fn(({ children }: any) => children),
}));

vi.mock('./editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: any) => children,
}));

// MarkdownRendererPlugin imports ../client/useLocale which reads config at
// module-load time.  Mock the whole markdown module to keep tests isolated.
vi.mock('./markdown', () => ({
  MarkdownMetadataRenderer: () => null,
  MarkdownRendererPlugin: () => null,
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
    const node = renderIntlayerNode({ children: 42 as any, value: 42 }) as any;
    expect(node.value).toBe(42);
  });

  it('wraps a plain string child in a Preact Fragment', () => {
    const node = renderIntlayerNode({
      children: 'Hello',
      value: 'Hello',
    }) as any;
    expect((node as any).type).toBe(Fragment);
  });

  it('preserves a valid VNode child as-is', () => {
    const el = h('span', {}, 'test');
    const node = renderIntlayerNode({ children: el, value: 'test' });
    expect((node as any).type).toBe('span');
  });

  it('exposes additionalProps through the Proxy', () => {
    const node = renderIntlayerNode({
      children: 'Hello',
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
    mockIsEnabled.value = false;
  });

  it('field.value returns the raw string', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.value).toBe('Hello World');
  });

  it('field.value returns the raw number', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).count.value).toBe(42);
  });

  it('field renders as a plain Fragment (no editor wrapper)', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.type).toBe(Fragment);
  });
});

// ---------------------------------------------------------------------------
// getDictionary – editor enabled
// ---------------------------------------------------------------------------

describe('getDictionary – editor enabled', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = true;
    mockIsEnabled.value = true;
  });

  afterEach(() => {
    mockIsEnabled.value = false;
  });

  it('field.value still returns the raw string', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.value).toBe('Hello World');
  });

  it('field renders through the (mocked) editor wrapper', () => {
    const result = getDictionary(dict, 'en' as any);
    expect((result as any).greeting.type).not.toBe(Fragment);
  });
});
