import {
  IntlayerProviderContent,
  type IntlayerProviderProps as IntlayerProviderPropsBase,
} from 'react-intlayer';
import { intlayerPolyfill } from './intlayerPolyfill';

intlayerPolyfill();

type IntlayerProviderProps = Omit<
  IntlayerProviderPropsBase,
  'disableEditor' | 'isCookieEnabled'
>;

/**
 * Provider component that wraps your application and provides the Intlayer context.
 *
 * This provider also automatically applies necessary polyfills for React Native.
 *
 * @param props - The provider props, excluding editor-specific and cookie-specific options which are not applicable in React Native.
 * @returns The provider component.
 *
 * @example
 * ```tsx
 * import { IntlayerProvider } from 'react-native-intlayer';
 *
 * const App = () => (
 *   <IntlayerProvider>
 *     <MyComponent />
 *   </IntlayerProvider>
 * );
 * ```
 */
export const IntlayerProvider = ({
  children,
  ...props
}: IntlayerProviderProps) => (
  <IntlayerProviderContent {...props}>{children}</IntlayerProviderContent>
);
