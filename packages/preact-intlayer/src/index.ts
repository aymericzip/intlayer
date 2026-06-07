import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { IInterpreterPluginPreact } from './plugins';

declare module '@intlayer/core/interpreter' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginPreact<T, S, L> {}
}

// Import directly from individual files to avoid circular dependency issues
export type { IntlayerProviderProps } from './client/IntlayerProvider';
export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  useIntlayerContext,
} from './client/IntlayerProvider';
export { t } from './client/t';
export { useDictionary } from './client/useDictionary';
export { useDictionaryAsync } from './client/useDictionaryAsync';
export { useDictionaryDynamic } from './client/useDictionaryDynamic';
export { useIntlayer } from './client/useIntlayer';
export { useLoadDynamic } from './client/useLoadDynamic';
export type { UseLocaleProps, UseLocaleResult } from './client/useLocale';
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
/**
 * @deprecated import from preact-intlayer/format instead
 */
export { useIntl } from './format/useIntl';

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
 * @deprecated import from preact-intlayer/markdown instead
 */
export const MarkdownProvider = _MarkdownProvider;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export const useMarkdownContext = _useMarkdownContext;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export type MarkdownProviderOptions = _MarkdownProviderOptions;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export const renderMarkdown = _renderMarkdown;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export const useMarkdownRenderer = _useMarkdownRenderer;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export const MarkdownRenderer = _MarkdownRenderer;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export type RenderMarkdownProps = _RenderMarkdownProps;
/**
 * @deprecated import from preact-intlayer/markdown instead
 */
export type MarkdownRendererProps = _MarkdownRendererProps;
