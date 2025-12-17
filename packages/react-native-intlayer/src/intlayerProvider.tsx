import {
  IntlayerProviderContent,
  type IntlayerProviderProps as IntlayerProviderPropsBase,
} from 'react-intlayer';
import { intlayerPolyfill } from './intlayerPolyfill';

intlayerPolyfill();

type IntlayerProviderProps = Pick<
  IntlayerProviderPropsBase,
  'children' | 'defaultLocale'
>;

export const IntlayerProvider = ({
  children,
  ...props
}: IntlayerProviderProps) => (
  <IntlayerProviderContent {...props}>{children}</IntlayerProviderContent>
);
