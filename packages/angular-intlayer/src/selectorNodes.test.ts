import { cond, enu, insert, select } from '@intlayer/core/transpiler';
import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  internationalization: mockConfig.internationalization,
  editor: mockConfig.editor,
}));

vi.mock('./editor/ContentSelector.component', () => ({
  ContentSelectorWrapperComponent: class {},
}));

import { getDictionary } from './getDictionary';

const resolve = (node: unknown): any =>
  getDictionary({ key: 'selector-nodes', content: { node } } as any, 'en').node;

/**
 * Angular text nodes are callable proxies exposing `.value`: selector nodes
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

    expect(String(node({ count: 5 })(5).value)).toBe('5 items');
  });
});
