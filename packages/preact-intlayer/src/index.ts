import type { LocalesValues } from '@intlayer/types';
import type { IInterpreterPluginPreact } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginPreact<T, S, L> {}
}

export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  localeCookie,
  setLocaleCookie,
  setLocaleInStorage,
  t,
  useDictionary,
  useDictionaryAsync,
  useDictionaryDynamic,
  useIntl,
  useIntlayer,
  useIntlayerContext,
  useLoadDynamic,
  useLocale,
  useLocaleBase,
  useLocaleCookie,
  useLocaleStorage,
} from './client/index';
export { getDictionary } from './getDictionary';
export { getIntlayer } from './getIntlayer';
export { HTMLProvider, HTMLRenderer } from './html/index';
export type { IntlayerNode } from './IntlayerNode';
export {
  compileMarkdown,
  MarkdownProvider,
  MarkdownRenderer,
  preactRuntime,
} from './markdown/index';
export {
  htmlPlugin,
  intlayerNodePlugins,
  markdownPlugin,
  markdownStringPlugin,
  preactNodePlugins,
} from './plugins';
