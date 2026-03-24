import { getHTML } from '@intlayer/core/interpreter';
import { getHTMLContext, type RenderHTMLOptions } from './context';

export {
  getHTMLContext,
  type HTMLContext,
  type RenderHTMLOptions,
  setHTMLContext,
  setHTMLContext as setIntlayerHTML,
} from './context';
export { default as HTMLProvider } from './HTMLProvider.svelte';
export { default as HTMLRenderer } from './HTMLRenderer.svelte';

export type RenderHTMLProps = RenderHTMLOptions;

export const renderHTML = (html: string, options: RenderHTMLProps = {}) => {
  return getHTML(html, (options.components || {}) as any);
};

export const useHTMLRenderer = (options: RenderHTMLProps = {}) => {
  const context = getHTMLContext();
  return (html: string) => context.renderHTML(html, options);
};
