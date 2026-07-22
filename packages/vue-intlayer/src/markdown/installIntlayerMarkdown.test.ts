import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp, h, nextTick, type VNodeChild } from 'vue';
import type { IntlayerMarkdownPluginOptions } from './installIntlayerMarkdown';

/**
 * `createIntlayerMarkdownClient` memoises a module-level singleton, so each test
 * needs a fresh module registry to install its own renderer.
 */
const installFreshMarkdown = async (
  app: ReturnType<typeof createApp>,
  pluginOptions: IntlayerMarkdownPluginOptions
) => {
  vi.resetModules();

  const { installIntlayerMarkdown, useMarkdown } = await import(
    './installIntlayerMarkdown'
  );

  installIntlayerMarkdown(app, pluginOptions);

  return { useMarkdown };
};

describe('installIntlayerMarkdown', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  /**
   * Mounts a component that resolves `markdown` through the installed provider
   * exactly the way `markdownStringPlugin` does — by treating the returned value
   * as renderable children.
   */
  const renderThroughProvider = async (
    markdown: string,
    pluginOptions: IntlayerMarkdownPluginOptions
  ) => {
    let useMarkdownRef: (() => { renderMarkdown: Function }) | undefined;

    const app = createApp({
      setup: () => {
        const { renderMarkdown } = useMarkdownRef!();

        return () => renderMarkdown(markdown) as VNodeChild;
      },
    });

    const { useMarkdown } = await installFreshMarkdown(app, pluginOptions);
    useMarkdownRef = useMarkdown as any;

    app.mount(container);

    // Async renderers settle on a macrotask (dynamic `import()`), so let the
    // event loop drain before reading back the rendered output.
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    const html = container.innerHTML;

    app.unmount();

    return html;
  };

  it('renders a synchronous custom renderer instead of stringifying it', async () => {
    const html = await renderThroughProvider('Hello **World**', {
      renderMarkdown: (markdown) => h('p', {}, String(markdown)),
    });

    expect(html).not.toContain('[object Object]');
    expect(html).toContain('Hello **World**');
  });

  it('resolves an asynchronous custom renderer into the rendered tree', async () => {
    const html = await renderThroughProvider('# Async title', {
      renderMarkdown: async (markdown) => {
        const { compileMarkdown } = await import('./compiler');

        return compileMarkdown(markdown as string) as VNodeChild;
      },
    });

    expect(html).not.toContain('[object Object]');
    expect(html).not.toContain('[object Promise]');
    expect(html).toContain('Async title');
  });

  it('still renders markdown when no custom renderer is provided', async () => {
    const html = await renderThroughProvider('# Default title', {});

    expect(html).not.toContain('[object Object]');
    expect(html).toContain('Default title');
  });
});
