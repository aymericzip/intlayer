import {
  Injectable,
  InjectionToken,
  inject,
  type TemplateRef,
} from '@angular/core';

export const INTLAYER_MARKDOWN_TOKEN =
  new InjectionToken<IntlayerMarkdownProvider>('intlayerMarkdown');

type RenderMarkdownOptions = {
  components?: any;
  wrapper?: any;
  options?: any;
};

type RenderMarkdownFunction = (
  markdown: string,
  overrides?: any | RenderMarkdownOptions
) => string | TemplateRef<any>;

export type IntlayerMarkdownProvider = {
  renderMarkdown: RenderMarkdownFunction;
};

/**
 * Default markdown renderer that returns the markdown as is
 */
const defaultMarkdownRenderer: RenderMarkdownFunction = (markdown: string) =>
  markdown;

/**
 * Create IntlayerMarkdown provider configuration
 */
export const createIntlayerMarkdownProvider = (
  renderMarkdown: RenderMarkdownFunction = defaultMarkdownRenderer
) => ({
  provide: INTLAYER_MARKDOWN_TOKEN,
  useValue: {
    renderMarkdown,
  } as IntlayerMarkdownProvider,
});

/**
 * Injectable service for markdown rendering
 */
@Injectable({
  providedIn: 'root',
})
export class IntlayerMarkdownService {
  private markdownProvider = inject(INTLAYER_MARKDOWN_TOKEN, {
    optional: true,
  });

  renderMarkdown(markdown: string, overrides?: any): string | TemplateRef<any> {
    if (!this.markdownProvider) {
      return markdown; // Fallback to returning markdown as is
    }
    return this.markdownProvider.renderMarkdown(markdown, overrides);
  }
}

/**
 * Function to inject markdown provider
 */
export const useMarkdown = (): IntlayerMarkdownProvider => {
  const markdownProvider = inject(INTLAYER_MARKDOWN_TOKEN, { optional: true });

  if (!markdownProvider) {
    return {
      renderMarkdown: defaultMarkdownRenderer,
    };
  }

  return markdownProvider;
};
