import { html, insert, plural, t } from '@intlayer/core/transpiler';
import { h, render } from 'preact';
import { Suspense } from 'preact/compat';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

// Analytics is imported lazily and can resolve after teardown; keep it inert.
vi.mock('@intlayer/analytics/isEnabled', () => ({ isEnabled: false }));

/**
 * Mirrors the `html()` rows of the `vite-preact-app` benchmark table, which stay
 * blank while the same rows render under `react-intlayer`.
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

describe('preact html node rendering', () => {
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

    const content = getDictionary(htmlDictionary as any, 'en') as any;

    // The renderer is loaded through a thrown promise, so it needs a boundary.
    render(
      h(Suspense, { fallback: null }, pickNode(content) as any),
      container
    );

    // The renderer chunk is code-split; let it land.
    await new Promise((resolve) => setTimeout(resolve, 50));

    return container.innerHTML;
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
