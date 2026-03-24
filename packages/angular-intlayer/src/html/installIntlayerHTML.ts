import {
  Injectable,
  InjectionToken,
  inject,
  type TemplateRef,
} from '@angular/core';

export const INTLAYER_HTML_TOKEN = new InjectionToken<IntlayerHTMLProvider>(
  'intlayerHTML'
);

type RenderHTMLOptions = {
  components?: any;
  wrapper?: string;
  options?: any;
};

type RenderHTMLFunction = (
  html: string,
  overrides?: any | RenderHTMLOptions
) => string | TemplateRef<any> | Promise<string | TemplateRef<any>>;

export type IntlayerHTMLProvider = {
  renderHTML: RenderHTMLFunction;
};

/**
 * Default HTML renderer. In Angular, we often just use [innerHTML],
 * but this service provides a unified API.
 */
const defaultHTMLRenderer: RenderHTMLFunction = (html: string) => html;

/**
 * Create IntlayerHTML provider configuration
 */
export const createIntlayerHTMLProvider = (
  renderHTML: RenderHTMLFunction = defaultHTMLRenderer
) => ({
  provide: INTLAYER_HTML_TOKEN,
  useValue: {
    renderHTML,
  } as IntlayerHTMLProvider,
});

/**
 * Injectable service for HTML rendering
 */
@Injectable({
  providedIn: 'root',
})
export class IntlayerHTMLService {
  private htmlProvider = inject(INTLAYER_HTML_TOKEN, {
    optional: true,
  });

  renderHTML(
    html: string,
    overrides?: any
  ): string | TemplateRef<any> | Promise<string | TemplateRef<any>> {
    if (!this.htmlProvider) {
      return html;
    }
    return this.htmlProvider.renderHTML(html, overrides);
  }
}

/**
 * Function to inject HTML provider
 */
export const useHTML = (): IntlayerHTMLProvider => {
  const htmlProvider = inject(INTLAYER_HTML_TOKEN, { optional: true });

  if (!htmlProvider) {
    return {
      renderHTML: defaultHTMLRenderer,
    };
  }

  return htmlProvider;
};
