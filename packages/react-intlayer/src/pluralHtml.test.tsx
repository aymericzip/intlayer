import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it, vi } from 'vitest';

// HTML/Markdown rendering must stay enabled for this suite (unlike
// getDictionary.test.ts which disables them).
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

const html = (content: string) => ({
  tags: {},
  nodeType: NodeTypes.HTML,
  [NodeTypes.HTML]: content,
});

const md = (content: string) => ({
  nodeType: NodeTypes.MARKDOWN,
  [NodeTypes.MARKDOWN]: content,
});

/**
 * Regression: `{{count}}` was not interpolated when `plural()` (or `insert()`)
 * wrapped an `html()`/`markdown()` node — the placeholder rendered verbatim.
 * See GitHub issue reproduction with `t({ en: plural({ one: html(...) }) })`.
 */
describe('plural() wrapping html() – count interpolation', () => {
  const dict = {
    key: 'plural-html' as const,
    content: {
      myKey: {
        nodeType: NodeTypes.PLURAL,
        [NodeTypes.PLURAL]: {
          one: html('<b>{{count}}</b> day'),
          other: html('<b>{{count}}</b> days'),
        },
      },
    },
  };

  it('interpolates {{count}} for the "one" category', () => {
    const result = getDictionary(dict as any, 'en');
    // The html node exposes its (interpolated) raw string via `.value`.
    const node = result.myKey(1) as any;

    expect(node.value).toBe('<b>1</b> day');
    expect(node.value).not.toContain('{{count}}');
  });

  it('interpolates {{count}} for the "other" category', () => {
    const result = getDictionary(dict as any, 'en');
    const node = result.myKey(5) as any;

    expect(node.value).toBe('<b>5</b> days');
    expect(node.value).not.toContain('{{count}}');
  });
});

describe('insert() wrapping html() – value interpolation', () => {
  const dict = {
    key: 'insert-html' as const,
    content: {
      myKey: {
        nodeType: NodeTypes.INSERTION,
        [NodeTypes.INSERTION]: html('Hello <b>{{name}}</b>'),
        fields: ['name'],
      },
    },
  };

  it('interpolates {{name}} inside the html node', () => {
    const result = getDictionary(dict as any, 'en');
    const node = result.myKey({ name: 'World' }) as any;

    expect(node.value).toBe('Hello <b>World</b>');
    expect(node.value).not.toContain('{{name}}');
  });
});

describe('plural() wrapping md() – count interpolation', () => {
  const dict = {
    key: 'plural-md' as const,
    content: {
      myKey: {
        nodeType: NodeTypes.PLURAL,
        [NodeTypes.PLURAL]: {
          one: md('**{{count}}** day'),
          other: md('**{{count}}** days'),
        },
      },
    },
  };

  it('interpolates {{count}} for the "one" category', () => {
    const result = getDictionary(dict as any, 'en');
    // The markdown node exposes its (interpolated) raw string via `.value`.
    const node = result.myKey(1) as any;

    expect(node.value).toBe('**1** day');
    expect(node.value).not.toContain('{{count}}');
  });

  it('interpolates {{count}} for the "other" category', () => {
    const result = getDictionary(dict as any, 'en');
    const node = result.myKey(5) as any;

    expect(node.value).toBe('**5** days');
    expect(node.value).not.toContain('{{count}}');
  });
});

describe('insert() wrapping md() – value interpolation', () => {
  const dict = {
    key: 'insert-md' as const,
    content: {
      myKey: {
        nodeType: NodeTypes.INSERTION,
        [NodeTypes.INSERTION]: md('Hello **{{name}}**'),
        fields: ['name'],
      },
    },
  };

  it('interpolates {{name}} inside the markdown node', () => {
    const result = getDictionary(dict as any, 'en');
    const node = result.myKey({ name: 'World' }) as any;

    expect(node.value).toBe('Hello **World**');
    expect(node.value).not.toContain('{{name}}');
  });
});
