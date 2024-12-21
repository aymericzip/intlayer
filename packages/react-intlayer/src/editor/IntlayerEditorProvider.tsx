import { FC, PropsWithChildren } from 'react';
import { PoweredByMeta } from '../utils/PoweredByMeta/index';
import { ContentSelectorProvider } from './ContentSelectorConnector';

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => (
  <ContentSelectorProvider>
    <PoweredByMeta />
    {children}
  </ContentSelectorProvider>
);
