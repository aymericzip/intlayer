import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { IInterpreterPluginReact } from './plugins';

declare module '@intlayer/core/interpreter' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginReact<T, S, L> {}
}

/**
 * @deprecated import from react-intlayer/format instead
 */
export { useIntl } from './client/format/useIntl';
// Import directly from individual files to avoid circular dependency issues
export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  useIntlayerContext,
} from './client/IntlayerProvider';
export { t } from './client/t';
export { useDictionary } from './client/useDictionary';
export { useDictionaryAsync } from './client/useDictionaryAsync';
export { useDictionaryDynamic } from './client/useDictionaryDynamic';
export { useI18n } from './client/useI18n';
export { useIntlayer } from './client/useIntlayer';
export { useLoadDynamic } from './client/useLoadDynamic';
export { useLocale } from './client/useLocale';
export { useLocaleBase } from './client/useLocaleBase';
export {
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
  useLocaleCookie,
  useLocaleStorage,
} from './client/useLocaleStorage';
export { useRewriteURL } from './client/useRewriteURL';
export { getDictionary } from './getDictionary';
export { getIntlayer } from './getIntlayer';
export type { IntlayerNode } from './IntlayerNode';

import type {
  MarkdownProviderOptions as _MarkdownProviderOptions,
  MarkdownRendererProps as _MarkdownRendererProps,
  RenderMarkdownProps as _RenderMarkdownProps,
} from './markdown';
import {
  MarkdownProvider as _MarkdownProvider,
  MarkdownRenderer as _MarkdownRenderer,
  renderMarkdown as _renderMarkdown,
  useMarkdownContext as _useMarkdownContext,
  useMarkdownRenderer as _useMarkdownRenderer,
} from './markdown';
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export const MarkdownProvider = _MarkdownProvider;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export const useMarkdownContext = _useMarkdownContext;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export type MarkdownProviderOptions = _MarkdownProviderOptions;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export const renderMarkdown = _renderMarkdown;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export const useMarkdownRenderer = _useMarkdownRenderer;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export const MarkdownRenderer = _MarkdownRenderer;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export type RenderMarkdownProps = _RenderMarkdownProps;
/**
 * @deprecated import from react-intlayer/markdown instead
 */
export type MarkdownRendererProps = _MarkdownRendererProps;
