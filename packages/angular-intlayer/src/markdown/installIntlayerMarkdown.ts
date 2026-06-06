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
  type CompileOptions,
  compile,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
} from '@intlayer/core/markdown';

/**
 * Options accepted by `compileMarkdown` and `parseMarkdown` to customise
 * rendering behaviour (custom components, sanitizer, slugify, rule hooks, …).
 */
export type MarkdownRendererOptions = CompileOptions;

/**
 * Angular `InjectionToken` used to provide a custom markdown renderer via the
 * DI system. Use `createIntlayerMarkdownProvider` to create the provider value
 * and register it in a module or component's `providers` array.
 */
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

/**
 * Intermediate AST produced by `parseMarkdown`.
 * Pass this to `compileMarkdown` to skip re-parsing when the same content is
 * rendered multiple times.
 */
export type { ParsedMarkdown };

/**
 * **Step 1 of 2 — parse only.**
 * Converts a raw markdown string into a `ParsedMarkdown` AST without rendering
 * any HTML. Use this when you need to:
 * - Cache the parsed result and render it several times with different options.
 * - Inspect or transform the AST before rendering.
 * - Defer the render step to a later point.
 *
 * @param markdown - The markdown source string.
 * @param options - Options that affect parsing.
 * @returns A `ParsedMarkdown` AST ready to be passed to `compileMarkdown`.
 *
 * @example
 * ```ts
 * const ast = parseMarkdown('# Hello **world**');
 * const html = compileMarkdown(ast);
 * ```
 */
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

/**
 * **Steps 1 + 2 — parse and render in one shot.**
 * Accepts a raw markdown string or a pre-parsed `ParsedMarkdown` AST and
 * returns an HTML string. Use with Angular's `[innerHTML]` binding or
 * `IntlayerMarkdownService.renderMarkdown`.
 *
 * @param input - Markdown string or pre-parsed AST.
 * @param options - Rendering options (components, sanitizer, slugify, …).
 * @returns An HTML string representing the rendered markdown.
 *
 * @example
 * ```ts
 * const html = compileMarkdown('# Hello **world**');
 * ```
 */
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
 * Returns an Angular `Provider` object that registers a custom markdown render
 * function under `INTLAYER_MARKDOWN_TOKEN`. Pass the returned provider to a
 * module or component's `providers` array.
 *
 * @param renderMarkdown - Custom render function. Defaults to the built-in
 *   HTML string renderer when omitted.
 *
 * @example
 * ```ts
 * // app.module.ts
 * @NgModule({
 *   providers: [createIntlayerMarkdownProvider(myCustomRenderer)],
 * })
 * export class AppModule {}
 * ```
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
 * Angular injectable service that wraps the active markdown renderer. Inject
 * this service anywhere in your app to call `renderMarkdown` without touching
 * the DI token directly. Falls back to returning the raw markdown string when
 * no provider is registered.
 *
 * @example
 * ```ts
 * @Component({ ... })
 * export class MyComponent {
 *   private markdownService = inject(IntlayerMarkdownService);
 *
 *   get html() {
 *     return this.markdownService.renderMarkdown('# Hello');
 *   }
 * }
 * ```
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
 * Reads the active markdown provider from the current Angular injector context.
 * Returns a fallback object that uses the built-in HTML string renderer when
 * `createIntlayerMarkdownProvider` has not been registered.
 *
 * @returns An `IntlayerMarkdownProvider` with a `renderMarkdown` method.
 *
 * @example
 * ```ts
 * @Component({ ... })
 * export class MyComponent {
 *   private markdown = useMarkdown();
 *
 *   get html() {
 *     return this.markdown.renderMarkdown('# Hello');
 *   }
 * }
 * ```
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
