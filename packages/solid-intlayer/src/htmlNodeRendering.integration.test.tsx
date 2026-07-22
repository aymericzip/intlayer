import { html, insert, plural, t } from '@intlayer/core/transpiler';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

/**
 * Mirrors the `html()` rows of the `vite-solid-app` benchmark table, which stay
 * blank while the equivalent markdown rows render.
 */
const htmlDictionary = {
  key: 'html-benchmark',
  content: {
    plainHtml: html('Hello <b>World</b>!'),
    pluralHtml: t({
      en: plural({
        one: html('<b>{{count}}</b> day'),
        other: html('<b>{{count}}</b> days'),
      }),
    }),
    insertHtml: insert(t({ en: html('Hello <b>{{name}}</b>') })),
  },
} as const;

describe('solid html node rendering', () => {
  let dispose: VoidFunction | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = '';
  });

  const renderNode = async (
    pickNode: (content: any) => unknown
  ): Promise<string> => {
    const { getDictionary } = await import('./getDictionary');

    const content = getDictionary(htmlDictionary as any, 'en') as any;

    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(() => pickNode(content) as any, root);

    // The renderer chunk is code-split; let it land.
    await new Promise((resolve) => setTimeout(resolve, 50));

    return root.innerHTML;
  };

  it('renders a plain html() node', async () => {
    const output = await renderNode((content) => content.plainHtml.use({}));

    expect(output).toMatch(/<b[^>]*>World<\/b>/);
  });

  it('interpolates {{count}} into plural(html())', async () => {
    const output = await renderNode((content) => content.pluralHtml(5));

    expect(output).not.toContain('{{count}}');
    expect(output).toMatch(/<b[^>]*>5<\/b>/);
  });

  it('interpolates {{name}} into insert(html())', async () => {
    const output = await renderNode((content) =>
      content.insertHtml({ name: 'Alice' })
    );

    expect(output).not.toContain('{{name}}');
    expect(output).toMatch(/<b[^>]*>Alice<\/b>/);
  });
});
