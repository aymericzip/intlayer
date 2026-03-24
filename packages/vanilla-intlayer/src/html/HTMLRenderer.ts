import { type RenderHTMLOptions, useHTML } from './installIntlayerHTML';
import type { HTMLComponents } from './types';

export type RenderHTMLProps = {
  components?: HTMLComponents<'permissive', {}>;
};

/**
 * Renders an HTML string directly, without a global provider.
 * Returns the raw string unchanged.
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
