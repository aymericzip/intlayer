import * as NodeTypes from '@intlayer/types/nodeType';
import { html } from 'remix/html-template';
import { describe, expect, it, vi } from 'vitest';
import { useDictionary, useIntlayer } from './index';

vi.mock('@intlayer/engine/build', () => ({
  prepareIntlayer: vi.fn().mockResolvedValue(undefined),
}));

const pageDictionary = {
  key: 'page',
  content: {
    title: 'Hello',
    body: {
      nodeType: NodeTypes.MARKDOWN,
      [NodeTypes.MARKDOWN]: {
        nodeType: NodeTypes.TRANSLATION,
        [NodeTypes.TRANSLATION]: {
          en: '# Hi **there**',
          fr: '# Salut **toi**',
        },
      },
    },
    note: {
      nodeType: NodeTypes.HTML,
      [NodeTypes.HTML]: '<b>bold</b>',
    },
  },
} as const;

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({ page: pageDictionary }),
}));

type PageContent = {
  title: string;
  body: { value: string; use: (components?: object) => string };
  note: { value: string; use: (components?: object) => string };
};

describe('remix-intlayer plugins', () => {
  it('keeps plain strings primitive', () => {
    const { title } = useIntlayer('page') as unknown as PageContent;

    expect(title).toBe('Hello');
    expect(typeof title).toBe('string');
  });

  it('renders md() nodes to HTML', () => {
    const { body } = useIntlayer('page') as unknown as PageContent;

    expect(body.value).toBe(
      '<span><h1 id="hi-there">Hi <strong>there</strong></h1></span>'
    );
    expect(
      body.use({
        strong: ({ children }: { children: string }) => `<em>${children}</em>`,
      })
    ).toBe('<span><h1 id="hi-there">Hi <em>there</em></h1></span>');
  });

  it('renders md() nodes for the requested locale', () => {
    const { body } = useDictionary(
      pageDictionary,
      'fr'
    ) as unknown as PageContent;

    expect(body.value).toBe(
      '<span><h1 id="salut-toi">Salut <strong>toi</strong></h1></span>'
    );
  });

  it('renders html() nodes with tag overrides', () => {
    const { note } = useIntlayer('page') as unknown as PageContent;

    expect(note.value).toBe('<b>bold</b>');
    expect(
      note.use({
        b: ({ children }: { children: string }) => `<i>${children}</i>`,
      })
    ).toBe('<i>bold</i>');
  });

  it('injects rendered nodes into a `remix/html-template` document', () => {
    const { note } = useIntlayer('page') as unknown as PageContent;

    expect(String(html`<p>${note.value}</p>`)).toBe(
      '<p>&lt;b&gt;bold&lt;/b&gt;</p>'
    );
    expect(String(html.raw`<p>${note.value}</p>`)).toBe('<p><b>bold</b></p>');
  });
});
