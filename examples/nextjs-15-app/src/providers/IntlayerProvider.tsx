import {
  IntlayerProvider as IntlayerProviderBase,
  type IntlayerProviderProps,
} from 'next-intlayer/server';
import type { FC } from 'react';
import { IntlayerMarkdownProvider } from './MarkdownProvider';

/**
 * One provider for both halves of the tree: it seeds the request-scoped server
 * context read by the server hooks and mounts the client provider, so pages do
 * not have to wrap themselves.
 */
export const IntlayerProvider: FC<IntlayerProviderProps> = ({
  children,
  locale,
}) => (
  <IntlayerMarkdownProvider>
    <IntlayerProviderBase locale={locale}>{children}</IntlayerProviderBase>
  </IntlayerMarkdownProvider>
);
