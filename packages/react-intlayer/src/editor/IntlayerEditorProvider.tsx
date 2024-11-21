import { FC, PropsWithChildren } from 'react';
import { ContentSelectorProvider } from './ContentSelectorConnector';

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => (
  <ContentSelectorProvider>{children}</ContentSelectorProvider>
);
