import {
  Injectable,
  InjectionToken,
  inject,
  type TemplateRef,
} from '@angular/core';
import { compile, type MarkdownRuntime } from '@intlayer/core';

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

// Minimal runtime to generate HTML strings
export const htmlRuntime: MarkdownRuntime = {
  createElement: (tag: string | any, props: any, ...children: any[]) => {
    if (typeof tag !== 'string') {
      // Handle non-string tags if necessary (e.g. components), or fallback to div
      if (tag === htmlRuntime.Fragment) {
        return children.join('');
      }
      return '';
    }

    const attrs = props
      ? Object.entries(props)
          .map(([k, v]) => {
            if (k === 'key' || v === undefined || v === null) return '';
            const key = k === 'className' ? 'class' : k;
            return `${key}="${String(v).replace(/"/g, '&quot;')}"`;
          })
          .filter(Boolean)
          .join(' ')
      : '';

    const childrenStr = children.join('');
    const voidTags = [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ];

    if (voidTags.includes(tag)) {
      return `<${tag} ${attrs} />`;
    }

    return `<${tag}${attrs ? ` ${attrs}` : ''}>${childrenStr}</${tag}>`;
  },
  cloneElement: (element: any, _props: any) => element, // Not really supported for strings
  Fragment: Symbol('Fragment'),
};

/**
 * Default markdown renderer that converts markdown to HTML string
 */
const defaultMarkdownRenderer: RenderMarkdownFunction = (markdown: string) =>
  compile(markdown, { runtime: htmlRuntime }) as string;

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
