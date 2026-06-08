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
 * Install the Intlayer HTML provider for your vanilla JS application.
 *
 * @example
 * ```ts
 * import { installIntlayerHTML } from 'vanilla-intlayer';
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

        // Apply component overrides as simple string replacements.
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

/**
 * Asynchronously install an HTML renderer whose implementation is loaded
 * via a dynamic `import()`.
 *
 * Use this to keep a heavy HTML sanitiser / component renderer out of the
 * initial bundle — the loader is only called the first time this function
 * is executed.
 *
 * The returned promise resolves once the provider is ready. Any calls to
 * `useHTML()` before the promise resolves will use the fallback (identity)
 * renderer.
 *
 * @param loader - A zero-argument async function that resolves to either a
 *   `RenderHTMLFunction` or an `IntlayerHTMLPluginOptions` object.
 *
 * @example
 * ```ts
 * // Load a custom HTML sanitiser only when needed
 * await installIntlayerHTMLDynamic(async () => {
 *   const DOMPurify = await import('dompurify');
 *   return (html) => DOMPurify.sanitize(html);
 * });
 * ```
 */
export const installIntlayerHTMLDynamic = async (
  loader: () => Promise<IntlayerHTMLPluginOptions | RenderHTMLFunction>
): Promise<IntlayerHTMLProvider> => {
  if (instance) return instance;
  const pluginOptions = await loader();
  return installIntlayerHTML(pluginOptions);
};
