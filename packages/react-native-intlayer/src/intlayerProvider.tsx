import type { PropsWithChildren } from 'react';
import { IntlayerProviderContent } from 'react-intlayer';
import { intlayerPolyfill } from './intlayerPolyfill';

intlayerPolyfill();

export const IntlayerProvider = ({ children }: PropsWithChildren) => (
  <IntlayerProviderContent>{children}</IntlayerProviderContent>
);
