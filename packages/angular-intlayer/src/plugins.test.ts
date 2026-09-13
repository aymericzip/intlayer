import { computed } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

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

/**
 * Holds the markdown renderer chunk until the test releases it, mirroring a
 * code-split module that lands after the first dictionary evaluation.
 */
const rendererChunk = vi.hoisted(() => {
  let release!: () => void;
  const loaded = new Promise<void>((resolve) => {
    release = resolve;
  });
  return { loaded, release };
});

vi.mock('./markdown/installIntlayerMarkdown', async (importActual) => {
  await rendererChunk.loaded;
  return importActual();
});

import { getDictionary } from './getDictionary';

// ---------------------------------------------------------------------------
// Fixture dictionary
// ---------------------------------------------------------------------------

const dictionary = {
  key: 'test' as const,
  content: {
    markdownContent: { nodeType: 'markdown', markdown: '# Title' },
    htmlContent: { nodeType: 'html', html: '<p>Hello <b>world</b></p>' },
  },
} as const;

/**
 * Releases the chunk and waits for it to settle. The plugin's own `.then`
 * subscribed first, so it has run by the time this resolves.
 */
const loadRendererChunk = async () => {
  rendererChunk.release();
  await import('./markdown/installIntlayerMarkdown');
};

// ---------------------------------------------------------------------------
// Code-split markdown renderer – reactivity
//
// Angular has no Suspense: the dictionary `computed` must depend on the
// renderer chunk so bindings re-render once it lands, instead of staying on
// the raw source until the next locale switch.
// ---------------------------------------------------------------------------

describe('markdown renderer chunk', () => {
  const content = computed(() => getDictionary(dictionary, 'en' as any) as any);

  it('stringifies to the raw source while the chunk is loading', () => {
    expect(String(content().markdownContent)).toBe('# Title');
    expect(String(content().htmlContent)).toBe('<p>Hello <b>world</b></p>');
  });

  it('re-evaluates the dictionary once the chunk lands', async () => {
    const pendingContent = content();

    await loadRendererChunk();

    const resolvedContent = content();

    expect(resolvedContent).not.toBe(pendingContent);
    expect(String(resolvedContent.markdownContent)).toBe(
      '<span><h1 id="title">Title</h1></span>'
    );
    expect(resolvedContent.markdownContent.value).toBe('# Title');
  });

  it('keeps html source untouched and applies component overrides', () => {
    const resolvedContent = content();

    expect(String(resolvedContent.htmlContent)).toBe(
      '<p>Hello <b>world</b></p>'
    );
    expect(
      String(resolvedContent.htmlContent.use({ b: { class: 'strong' } }))
    ).toBe('<span><p>Hello <b class="strong">world</b></p></span>');
  });
});
