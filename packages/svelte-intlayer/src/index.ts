import type { IInterpreterPluginSvelte } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S, L> extends IInterpreterPluginSvelte<T> {}
}

export * from './client';
export * from './getDictionary';
export * from './getIntlayer';
export * from './plugins';

import { useEditor } from './editor';
import { setMarkdownContext } from './markdown';

export {
  useEditor as useIntlayerEditor,
  setMarkdownContext as setIntlayerMarkdown,
};
