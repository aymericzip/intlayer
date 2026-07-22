import { insert, md, plural, t } from '@intlayer/core/transpiler';
import { h, render } from 'preact';
import { Suspense } from 'preact/compat';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
  routing: {
    storage: { cookies: [], localStorage: [], sessionStorage: [], headers: [] },
  },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
  routing: mockConfig.routing,
}));

// Analytics is imported lazily and can resolve after teardown; keep it inert.
vi.mock('@intlayer/analytics/isEnabled', () => ({ isEnabled: false }));

/**
 * Mirrors the `md()` rows of the `vite-preact-app` benchmark table, which render
 * as an empty wrapper while the same rows render under `react-intlayer`.
 */
const markdownDictionary = {
  key: 'markdown-benchmark',
  content: {
    plainMarkdown: md('## Title\n\nSome **bold** text.'),
    pluralMarkdown: t({
      en: plural({
        one: md('**{{count}}** day'),
        other: md('**{{count}}** days'),
      }),
    }),
    insertMarkdown: insert(t({ en: md('Hello **{{name}}**') })),
  },
} as const;

describe('preact markdown node rendering', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    render(null, container);
    container.remove();
  });

  const renderNode = async (
    pickNode: (content: any) => unknown
  ): Promise<string> => {
    const { getDictionary } = await import('./getDictionary');
    const { MarkdownProvider } = await import('./markdown/MarkdownProvider');

    const content = getDictionary(markdownDictionary as any, 'en') as any;

    render(
      h(
        Suspense,
        { fallback: null },
        h(MarkdownProvider, {}, pickNode(content) as any)
      ),
      container
    );

    // The renderer chunk is code-split; let it land.
    await new Promise((resolve) => setTimeout(resolve, 250));

    return container.innerHTML;
  };

  it('renders a plain md() node', async () => {
    const output = await renderNode((content) => content.plainMarkdown);

    expect(output).toMatch(/<strong[^>]*>bold<\/strong>/);
  });

  it('interpolates {{count}} into plural(md())', async () => {
    const output = await renderNode((content) => content.pluralMarkdown(5));

    expect(output).not.toContain('{{count}}');
    expect(output).toMatch(/<strong[^>]*>5<\/strong>/);
  });

  it('interpolates {{name}} into insert(md())', async () => {
    const output = await renderNode((content) =>
      content.insertMarkdown({ name: 'Alice' })
    );

    expect(output).not.toContain('{{name}}');
    expect(output).toMatch(/<strong[^>]*>Alice<\/strong>/);
  });
});
