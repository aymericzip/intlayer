import { insert, md, plural, t } from '@intlayer/core/transpiler';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp, h, nextTick, type VNodeChild } from 'vue';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr', 'es'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

vi.mock('../editor', () => ({
  ContentSelector: {},
}));

/**
 * Mirrors the `md()` nodes exercised by the benchmark table of the
 * `vite-vue-app` example, including the two nodes whose `{{ … }}` placeholders
 * have to be interpolated into the raw Markdown before it is compiled.
 */
const benchmarkDictionary = {
  key: 'markdown-benchmark',
  content: {
    n06_md: md('## Title\n\nSome **bold** text.'),
    n09_t_of_md: t({
      en: md('## English Title\n\nContent in **English**'),
      fr: md('## Titre Français\n\nContenu en **Français**'),
    }),
    n25_plural_md: t({
      en: plural({
        one: md('**{{count}}** day'),
        other: md('**{{count}}** days'),
      }),
      fr: plural({
        one: md('**{{count}}** jour'),
        other: md('**{{count}}** jours'),
      }),
    }),
    n26_insert_md: insert(
      t({
        en: md('Hello **{{name}}**'),
        fr: md('Bonjour **{{name}}**'),
      })
    ),
  },
} as const;

describe('markdown node rendering with a custom renderer', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  /**
   * Renders a node the way the example's template does — `<component :is="…" />`
   * over the result of `.use({})` — under the same async custom renderer the
   * example installs in `main.ts`.
   */
  const renderNode = async (
    pickNode: (content: any) => unknown
  ): Promise<string> => {
    vi.resetModules();

    const { installIntlayerMarkdown } = await import(
      './installIntlayerMarkdown'
    );
    const { getDictionary } = await import('../getDictionary');

    const content = getDictionary(benchmarkDictionary as any, 'en') as any;
    const node = pickNode(content) as any;

    const app = createApp({
      render: () => h(node.use ? node.use({}) : node),
    });

    installIntlayerMarkdown(app, {
      renderMarkdown: async (markdown) => {
        const { compileMarkdown } = await import('./compiler');

        return compileMarkdown(markdown as string) as VNodeChild;
      },
      components: {
        bold: (props: any) => h('strong', props),
      },
    });

    app.mount(container);

    // The custom renderer settles on a macrotask (dynamic `import()`).
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    const html = container.innerHTML;

    app.unmount();

    return html;
  };

  it('renders a plain md() node as markup, not as "[object Object]"', async () => {
    const html = await renderNode((content) => content.n06_md);

    expect(html).not.toContain('[object Object]');
    expect(html).toContain('<h2');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('renders t(md()) for the active locale', async () => {
    const html = await renderNode((content) => content.n09_t_of_md);

    expect(html).not.toContain('[object Object]');
    expect(html).toContain('English Title');
    expect(html).toContain('<strong>English</strong>');
  });

  it('interpolates {{count}} into plural(md()) before compiling', async () => {
    const singular = await renderNode((content) => content.n25_plural_md(1));
    const plural = await renderNode((content) => content.n25_plural_md(5));

    expect(singular).not.toContain('[object Object]');
    expect(singular).not.toContain('{{count}}');
    expect(singular).toContain('<strong>1</strong>');
    expect(singular).toContain('day');

    expect(plural).not.toContain('{{count}}');
    expect(plural).toContain('<strong>5</strong>');
    expect(plural).toContain('days');
  });

  it('interpolates {{name}} into insert(md()) before compiling', async () => {
    const html = await renderNode((content) =>
      content.n26_insert_md({ name: 'Alice' })
    );

    expect(html).not.toContain('[object Object]');
    expect(html).not.toContain('{{name}}');
    expect(html).toContain('<strong>Alice</strong>');
  });
});
