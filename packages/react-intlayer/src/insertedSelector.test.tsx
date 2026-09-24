import {
  cond,
  enu,
  gender,
  insert,
  plural,
  select,
} from '@intlayer/core/transpiler';
import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

vi.mock('./editor', () => ({
  ContentSelector: ({ children }: any) => children,
}));

vi.mock('./editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: any) => children,
}));

import { getDictionary } from './getDictionary';

const resolve = (node: unknown): any =>
  getDictionary({ key: 'inserted-selector', content: { node } } as any, 'en')
    .node;

/**
 * `insert()` wrapping a selector node resolves as
 * `(values) => (selector) => content` for every selector node type.
 */
describe('insert() wrapping a selector node', () => {
  it('should resolve an enumeration', () => {
    const node = resolve(insert(enu({ '>1': '{{count}} items' })));

    expect(String(node({ count: 5 })(5))).toBe('5 items');
  });

  it('should resolve a condition', () => {
    const node = resolve(insert(cond({ true: 'on {{name}}', false: 'off' })));

    expect(String(node({ name: 'Bo' })(true))).toBe('on Bo');
  });

  it('should resolve the selected gender branch', () => {
    const node = resolve(
      insert(gender({ male: 'he {{name}}', female: 'she', fallback: 'they' }))
    );

    expect(String(node({ name: 'Bo' })('male'))).toBe('he Bo');
  });

  it('should resolve a select', () => {
    const node = resolve(insert(select({ a: 'A {{name}}', fallback: 'F' })));

    expect(String(node({ name: 'Bo' })('a'))).toBe('A Bo');
    expect(String(node({ name: 'Bo' })({ value: 'a' }))).toBe('A Bo');
  });

  it('should resolve a plural with its count and the inserted values', () => {
    const node = resolve(
      insert(
        plural({
          one: '{{count}} item for {{name}}',
          other: '{{count}} items for {{name}}',
        })
      )
    );

    expect(String(node({ name: 'Bo' })(1))).toBe('1 item for Bo');
    expect(String(node({ name: 'Bo' })({ count: 5 }))).toBe('5 items for Bo');
  });
});
