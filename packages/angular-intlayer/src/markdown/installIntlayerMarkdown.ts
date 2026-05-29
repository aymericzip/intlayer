import {
  Injectable,
  InjectionToken,
  inject,
  type TemplateRef,
} from '@angular/core';
import type {
  MarkdownContext,
  MarkdownRuntime,
  ParsedMarkdown,
} from '@intlayer/core/markdown';
import {
  compile,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
} from '@intlayer/core/markdown';

export const INTLAYER_MARKDOWN_TOKEN =
  new InjectionToken<IntlayerMarkdownProvider>('intlayerMarkdown');

type RenderMarkdownOptions = {
  components?: any;
  wrapper?: string;
  options?: any;
};

type RenderMarkdownFunction = (
  markdown: string | ParsedMarkdown,
  overrides?: any | RenderMarkdownOptions
) => string | TemplateRef<any> | Promise<string | TemplateRef<any>>;

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

export type { ParsedMarkdown };

export const parseMarkdown = (
  markdown: string = '',
  options: any = {}
): ParsedMarkdown => {
  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: htmlRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

export const compileMarkdown = (
  input: string | ParsedMarkdown = '',
  options: any = {}
): string => {
  if (typeof input === 'string') {
    return compile(input, { ...options, runtime: htmlRuntime }) as string;
  }

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: htmlRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreRenderMarkdownAst(input, ctx, compilerOptions) as string;
};

/**
 * Default markdown renderer that converts markdown to HTML string
 */
const defaultMarkdownRenderer: RenderMarkdownFunction = (
  markdown: string | ParsedMarkdown
) => compileMarkdown(markdown) as string;

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

  renderMarkdown(
    markdown: string | ParsedMarkdown,
    overrides?: any
  ): string | TemplateRef<any> | Promise<string | TemplateRef<any>> {
    if (!this.markdownProvider) {
      return typeof markdown === 'string' ? markdown : ''; // Fallback to returning markdown as is
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
