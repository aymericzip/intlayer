import type { LocalesValues } from '@intlayer/types';
import type { IInterpreterPluginSvelte } from './plugins';

declare module '@intlayer/core/interpreter' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginSvelte<T, S, L> {}
}

export * from './client';
export * from './getDictionary';
export * from './getIntlayer';
export * from './html';
export * from './markdown';
export * from './plugins';

import { useEditor } from './editor';
import { setHTMLContext } from './html';
import { setMarkdownContext } from './markdown';

export {
  useEditor as useIntlayerEditor,
  setMarkdownContext as setIntlayerMarkdown,
  setHTMLContext as setIntlayerHTML,
};
