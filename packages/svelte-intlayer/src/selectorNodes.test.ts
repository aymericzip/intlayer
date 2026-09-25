import { cond, enu, insert, select } from '@intlayer/core/transpiler';
import { describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks – must be declared before any import that transitively loads them.
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

// Mock the Svelte wrapper component so vitest doesn't try to parse it.
vi.mock('./IntlayerNodeWrapper.svelte', () => ({
  default: () => null,
}));

// Mock the editor module (exports Svelte components).
vi.mock('./editor', () => ({
  ContentSelector: () => null,
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

const resolve = (node: unknown): any =>
  getDictionary({ key: 'selector-nodes', content: { node } } as any, 'en').node;

/**
 * Svelte nodes are components (functions exposing `.value`): selector nodes
 * must return them, never call them with the selector values.
 */
describe('selector nodes with object selectors', () => {
  it('should resolve an enumeration from { count }', () => {
    const node = resolve(enu({ '1': 'One item', '>1': 'Many items' }));

    expect(node({ count: 5 }).value).toBe('Many items');
  });

  it('should resolve a condition from { value }', () => {
    const node = resolve(cond({ true: 'On', false: 'Off' }));

    expect(node({ value: false }).value).toBe('Off');
  });

  it('should resolve a select from { value }', () => {
    const node = resolve(select({ a: 'A', fallback: 'F' }));

    expect(node({ value: 'a' }).value).toBe('A');
  });

  it('should resolve an inserted enumeration', () => {
    const node = resolve(insert(enu({ '>1': '{{count}} items' })));

    expect(node({ count: 5 })(5).value).toBe('5 items');
  });
});
