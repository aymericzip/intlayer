export {
  type ConversionParams,
  type ExperimentState,
  getDictionary,
  getIntlayer,
  IntlayerClientContext,
  type IntlayerNode,
  IntlayerProvider,
  type IntlayerProviderProps,
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
  t,
  useConversion,
  useDictionary,
  useDictionaryAsync,
  useDictionaryDynamic,
  useExperiment,
  useI18n,
  useIntl,
  useIntlayer,
  useLoadDynamic,
  useLocaleCookie,
  useLocaleStorage,
} from 'react-intlayer';
export * from './client/index';
export { generateStaticParams } from './generateStaticParams';
export type {
  LocalParams,
  LocalPromiseParams,
  Next14LayoutIntlayer,
  Next14PageIntlayer,
  Next15LayoutIntlayer,
  Next15PageIntlayer,
  NextLayoutIntlayer,
  NextPageIntlayer,
} from './types/index';

import type { FC } from 'react';
import type {
  MarkdownContextValue as _MarkdownContextValue,
  MarkdownProviderOptions as _MarkdownProviderOptions,
  MarkdownProviderProps as _MarkdownProviderProps,
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
 * @deprecated import from next-intlayer/markdown instead
 */
export const MarkdownProvider: FC<_MarkdownProviderProps> = _MarkdownProvider;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export const useMarkdownContext: () => _MarkdownContextValue =
  _useMarkdownContext;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export type MarkdownProviderOptions = _MarkdownProviderOptions;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export const renderMarkdown = _renderMarkdown;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export const useMarkdownRenderer = _useMarkdownRenderer;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export const MarkdownRenderer = _MarkdownRenderer;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export type RenderMarkdownProps = _RenderMarkdownProps;
/**
 * @deprecated import from next-intlayer/markdown instead
 */
export type MarkdownRendererProps = _MarkdownRendererProps;
