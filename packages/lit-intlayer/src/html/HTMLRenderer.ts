import { html, LitElement, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { type RenderHTMLOptions, useHTML } from './installIntlayerHTML';
import type { HTMLComponents } from './types';

export type RenderHTMLProps = {
  components?: HTMLComponents<'permissive', {}>;
};

/**
 * Renders an HTML string directly, without a global provider.
 * Returns the raw string; pass to `unsafeHTML()` in a Lit template.
 */
export const renderHTML = (
  content: string,
  _props: RenderHTMLProps = {}
): string => content;

/**
 * Returns a render function that uses the global provider's configuration
 * (installed via `installIntlayerHTML`), falling back to identity.
 */
export const useHTMLRenderer = ({
  components,
}: RenderHTMLProps = {}): ((content: string) => string) => {
  const context = useHTML();

  return (content: string) =>
    context.renderHTML(content, { components } as RenderHTMLOptions);
};

/**
 * `<intlayer-html-renderer>` — renders an HTML string into the light DOM.
 *
 * Uses the globally installed HTML renderer when available
 * (see `installIntlayerHTML`), or falls back to `unsafeHTML` with the raw string.
 *
 * @example
 * ```html
 * <intlayer-html-renderer content="<strong>Hello</strong> World">
 * </intlayer-html-renderer>
 * ```
 */
export class HTMLRenderer extends LitElement {
  static override properties = {
    content: { type: String },
    components: { attribute: false },
  };

  /** The HTML string to render. */
  content = '';
  /** Optional component overrides for HTML tags. */
  components?: HTMLComponents<'permissive', {}>;

  /** Render into light DOM so host-page CSS can style the output. */
  override createRenderRoot() {
    return this;
  }

  override render() {
    if (!this.content) return nothing;

    const renderer = useHTMLRenderer({ components: this.components });
    return html`${unsafeHTML(renderer(this.content))}`;
  }
}

if (!customElements.get('intlayer-html-renderer')) {
  customElements.define('intlayer-html-renderer', HTMLRenderer);
}

declare global {
  interface HTMLElementTagNameMap {
    'intlayer-html-renderer': HTMLRenderer;
  }
}
