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

  /**
   * Mounts the picked node and returns a reader for the rendered markup. The
   * renderer chunk is code-split, so callers must poll the reader through
   * `waitForMarkup` instead of assuming the first frame is complete.
   */
  const renderNode = async (
    pickNode: (content: any) => unknown
  ): Promise<() => string> => {
    const { getDictionary } = await import('./getDictionary');

    const content = getDictionary(htmlDictionary as any, 'en') as any;

    // The renderer is loaded through a thrown promise, so it needs a boundary.
    render(
      h(Suspense, { fallback: null }, pickNode(content) as any),
      container
    );

    return () => container.innerHTML;
  };

  /** Waits for the lazily loaded renderer to emit markup matching `pattern`. */
  const waitForMarkup = (
    readMarkup: () => string,
    pattern: RegExp
  ): Promise<string> =>
    vi.waitFor(() => {
      const markup = readMarkup();

      expect(markup).toMatch(pattern);

      return markup;
    });

  it('renders a plain html() node', async () => {
    const readMarkup = await renderNode((content) => content.plainHtml.use({}));

    await waitForMarkup(readMarkup, /<b[^>]*>World<\/b>/);
  });

  it('interpolates {{count}} into plural(html())', async () => {
    const readMarkup = await renderNode((content) => content.pluralHtml(5));

    const output = await waitForMarkup(readMarkup, /<b[^>]*>5<\/b>/);

    expect(output).not.toContain('{{count}}');
  });

  it('interpolates {{name}} into insert(html())', async () => {
    const readMarkup = await renderNode((content) =>
      content.insertHtml({ name: 'Alice' })
    );

    const output = await waitForMarkup(readMarkup, /<b[^>]*>Alice<\/b>/);

    expect(output).not.toContain('{{name}}');
  });
});
