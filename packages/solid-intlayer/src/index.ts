import type { LocalesValues } from '@intlayer/types';
import type { IInterpreterPluginSolid } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginSolid<T, S, L> {}
}

export {
  getBrowserLocale,
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  localeCookie,
  localeInStorage,
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
  useRewriteURL,
} from './client/index';
export { getDictionary } from './getDictionary';
export { getIntlayer } from './getIntlayer';
export {
  HTMLProvider,
  HTMLRenderer,
  type HTMLRendererProps,
  type RenderHTMLProps,
  renderHTML,
  useHTMLRenderer,
} from './html/index';
export type { IntlayerNode } from './IntlayerNode';
export {
  compileMarkdown,
  MarkdownProvider,
  MarkdownRenderer,
  useMarkdown,
} from './markdown/index';
