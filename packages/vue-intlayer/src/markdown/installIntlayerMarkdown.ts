import { inject, VNodeChild, type App } from 'vue';

export const INTLAYER_MARKDOWN_SYMBOL = Symbol('intlayerMarkdown');

type RenderMarkdownFunction = (markdown: string) => VNodeChild;

/**
 * Singleton instance
 */
let instance: IntlayerMarkdownProvider | null = null;

export type IntlayerMarkdownProvider = {
  renderMarkdown: RenderMarkdownFunction;
};

/**
 * Create and return a single IntlayerMarkdownProvider instance
 */
export const createIntlayerMarkdownClient = (
  renderMarkdown: RenderMarkdownFunction
): IntlayerMarkdownProvider => {
  if (instance) return instance;

  instance = {
    renderMarkdown,
  };

  return instance;
};

/**
 * Helper to install the IntlayerMarkdown provider into the app
 */
export const installIntlayerMarkdown = (
  app: App,
  renderMarkdown: RenderMarkdownFunction
) => {
  const client = createIntlayerMarkdownClient(renderMarkdown);

  app.provide(INTLAYER_MARKDOWN_SYMBOL, client);
};

export const useMarkdown = () => {
  const renderMarkdown = inject<IntlayerMarkdownProvider>(
    INTLAYER_MARKDOWN_SYMBOL,
    {
      renderMarkdown: (markdown) => markdown,
    }
  );

  if (!renderMarkdown) {
    throw new Error('useMarkdown must be used within a MarkdownProvider');
  }

  return renderMarkdown;
};
