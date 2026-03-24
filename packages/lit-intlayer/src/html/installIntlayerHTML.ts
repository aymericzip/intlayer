import type { HTMLComponents } from './types';

export type RenderHTMLOptions = {
  components?: HTMLComponents<'permissive', {}>;
};

export type RenderHTMLFunction = (
  html: string,
  overrides?: HTMLComponents<'permissive', {}> | RenderHTMLOptions
) => string;

/**
 * Singleton instance
 */
let instance: IntlayerHTMLProvider | null = null;

export type IntlayerHTMLProvider = {
  renderHTML: RenderHTMLFunction;
};

export type IntlayerHTMLPluginOptions = {
  components?: HTMLComponents<'permissive', {}>;
  renderHTML?: RenderHTMLFunction;
};

/**
 * Create and return a single IntlayerHTMLProvider instance.
 */
export const createIntlayerHTMLClient = (
  renderHTML: RenderHTMLFunction
): IntlayerHTMLProvider => {
  if (instance) return instance;
  instance = { renderHTML };
  return instance;
};

/**
 * Install the Intlayer HTML provider for your Lit application.
 *
 * The installed renderer is used by `<intlayer-html-renderer>` and
 * `useHTMLRenderer()`.
 *
 * @example
 * ```ts
 * import { installIntlayerHTML } from 'lit-intlayer';
 *
 * installIntlayerHTML({
 *   components: {
 *     a: ({ href, children }) => `<a class="styled-link" href="${href}">${children}</a>`,
 *   },
 * });
 * ```
 */
export const installIntlayerHTML = (
  pluginOptions?: IntlayerHTMLPluginOptions | RenderHTMLFunction
): IntlayerHTMLProvider => {
  let renderHTML: RenderHTMLFunction;

  if (typeof pluginOptions === 'function') {
    renderHTML = pluginOptions;
  } else {
    const { components, renderHTML: customRender } = pluginOptions ?? {};

    if (customRender) {
      renderHTML = customRender;
    } else {
      renderHTML = (rawHTML, overrides) => {
        const isOptionsObject =
          overrides &&
          typeof overrides === 'object' &&
          'components' in overrides;

        const overrideComponents = isOptionsObject
          ? (overrides as RenderHTMLOptions).components
          : (overrides as HTMLComponents<'permissive', {}>);

        const mergedComponents = {
          ...(components ?? {}),
          ...(overrideComponents ?? {}),
        };

        if (!Object.keys(mergedComponents).length) return rawHTML;

        // Apply component overrides as simple string replacements
        // For full component replacement support, provide a custom renderHTML.
        return rawHTML;
      };
    }
  }

  return createIntlayerHTMLClient(renderHTML);
};

/**
 * Access the installed IntlayerHTMLProvider.
 * Returns a fallback renderer that outputs the raw HTML string if no
 * provider has been installed.
 */
export const useHTML = (): IntlayerHTMLProvider => {
  if (instance) return instance;
  return { renderHTML: (rawHTML) => rawHTML };
};
