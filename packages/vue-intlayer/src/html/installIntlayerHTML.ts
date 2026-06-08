import { getHTML } from '@intlayer/core/interpreter';
import { type App, inject, provide, type VNodeChild } from 'vue';
import type { HTMLComponents } from './types';

export const INTLAYER_HTML_SYMBOL = Symbol('intlayerHTML');

export type RenderHTMLOptions = {
  components?: HTMLComponents<'permissive', {}>;
};

export type RenderHTMLFunction = (
  html: string,
  overrides?: HTMLComponents<'permissive', {}> | RenderHTMLOptions
) => VNodeChild;

/**
 * Singleton instance
 */
let instance: IntlayerHTMLProvider | null = null;

export type IntlayerHTMLProvider = {
  renderHTML: RenderHTMLFunction;
};

/**
 * Options for the installIntlayerHTML helper.
 */
export type IntlayerHTMLPluginOptions = {
  /**
   * Component overrides for HTML tags.
   */
  components?: HTMLComponents<'permissive', {}>;
  /**
   * Custom render function for HTML.
   */
  renderHTML?: RenderHTMLFunction;
};

/**
 * Create and return a single IntlayerHTMLProvider instance
 */
export const createIntlayerHTMLClient = (
  renderHTML: RenderHTMLFunction
): IntlayerHTMLProvider => {
  if (instance) return instance;

  instance = {
    renderHTML,
  };

  return instance;
};

/**
 * Helper to install the IntlayerHTML provider into the app
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { installIntlayerHTML } from 'vue-intlayer/html';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 *
 * installIntlayerHTML(app);
 *
 * app.mount('#app');
 * ```
 */
export const installIntlayerHTML = (
  app: App<any>,
  pluginOptions?: IntlayerHTMLPluginOptions | RenderHTMLFunction
) => {
  let renderHTML: RenderHTMLFunction;

  if (typeof pluginOptions === 'function') {
    renderHTML = pluginOptions;
  } else {
    const { components, renderHTML: customRender } = pluginOptions ?? {};

    if (customRender) {
      renderHTML = customRender;
    } else {
      renderHTML = (html, overrides) => {
        const isOptionsObject =
          overrides &&
          typeof overrides === 'object' &&
          'components' in overrides;

        const { components: overrideComponents, ...componentsFromRest } =
          isOptionsObject ? overrides : { components: overrides };

        const localComponents = overrideComponents || componentsFromRest;

        const mergedComponents = {
          ...components,
          ...localComponents,
        };

        return getHTML(html, mergedComponents as any);
      };
    }
  }

  // Wrap renderHTML to prevent recursion in custom renderers
  const wrappedRenderHTML: RenderHTMLFunction = (html, overrides) => {
    const isCustom =
      typeof pluginOptions === 'function' ||
      (typeof pluginOptions === 'object' && pluginOptions?.renderHTML);

    if (isCustom) {
      return {
        setup() {
          provide(INTLAYER_HTML_SYMBOL, { renderHTML: undefined });
          return () => renderHTML(html, overrides);
        },
      } as any;
    }

    return renderHTML(html, overrides);
  };

  const client = createIntlayerHTMLClient(wrappedRenderHTML);

  app.provide(INTLAYER_HTML_SYMBOL, client);
};

/**
 * Vue plugin object for IntlayerHTML. Can be used with `app.use(intlayerHTML)`.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { intlayerHTML } from 'vue-intlayer/html';
 *
 * const app = createApp(App);
 *
 * app.use(intlayerHTML, { components: { p: MyP } });
 *
 * app.mount('#app');
 * ```
 */
export const intlayerHTML: {
  install: typeof installIntlayerHTML;
} = {
  install: installIntlayerHTML,
};

export const useHTML = () => {
  const context = inject<IntlayerHTMLProvider>(INTLAYER_HTML_SYMBOL);

  return context;
};
