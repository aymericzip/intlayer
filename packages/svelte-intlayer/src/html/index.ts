import { getHTML } from '@intlayer/core/interpreter';
import { getHTMLContext, type RenderHTMLOptions } from './context';

export {
  getHTMLContext,
  type RenderHTMLOptions,
  setHTMLContext,
  setHTMLContext as setIntlayerHTML,
} from './context';
export { default as HTMLProvider } from './HTMLProvider.svelte';
export { default as HTMLRenderer } from './HTMLRenderer.svelte';

export type RenderHTMLProps = RenderHTMLOptions;
export const renderHTML = (
  html: string,
  options: RenderHTMLProps = {}
): any => {
  const components = options.components || {};

  // Proxy handles standard HTML tags lazily without a hardcoded list
  const wrappedComponents = new Proxy(components as any, {
    get(target, prop) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop];
      }

      // Fallback: Lazily generate a wrapper for standard lowercase HTML tags
      if (
        typeof prop === 'string' &&
        /^[a-z][a-z0-9]*$/.test(prop) &&
        typeof document !== 'undefined'
      ) {
        return ({ children = [], ...props }: any) => {
          const element = document.createElement(prop);

          // Apply props as attributes
          for (const [key, value] of Object.entries(props)) {
            if (key.startsWith('on') && typeof value === 'function') {
              const eventName = key.slice(2).toLowerCase();
              element.addEventListener(eventName, value as EventListener);
            } else if (value !== undefined && value !== null) {
              element.setAttribute(key, String(value));
            }
          }

          // Append children
          for (const child of children) {
            if (typeof child === 'string') {
              element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
              element.appendChild(child);
            }
          }

          return element;
        };
      }
      return undefined;
    },
  });

  return getHTML(html, wrappedComponents as any);
};

export const useHTMLRenderer = (options: RenderHTMLProps = {}) => {
  const context = getHTMLContext();
  return (html: string) => context.renderHTML(html, options);
};
