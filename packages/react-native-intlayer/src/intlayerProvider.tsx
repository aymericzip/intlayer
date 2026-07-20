// Must stay first: installs the React Native polyfills before `react-intlayer`
// module scope runs. See `applyIntlayerPolyfill.ts`.
import './applyIntlayerPolyfill';
import {
  IntlayerProviderContent,
  type IntlayerProviderProps as IntlayerProviderPropsBase,
} from 'react-intlayer';

/**
 * Props accepted by the React Native `IntlayerProvider`.
 *
 * Editor-specific (`disableEditor`) and cookie-specific (`isCookieEnabled`)
 * options are omitted because they are not applicable in a React Native
 * environment.
 */
export type IntlayerProviderProps = Omit<
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
