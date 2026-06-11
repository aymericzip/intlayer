'use client';

import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type {
  I18nextProvider as _I18nextProvider,
  I18nextProviderProps,
} from 'react-i18next';
import { IntlayerProvider } from 'react-intlayer';

/**
 * Drop-in for react-i18next's `I18nextProvider`.
 * The `i18n` prop is accepted for API compatibility but has no effect —
 * Intlayer uses its own instance. A development warning is emitted when
 * the `i18n` prop is provided so consumers know to remove it.
 */
export const I18nextProvider: typeof _I18nextProvider = ({
  children,
  i18n: _i18n,
}: I18nextProviderProps) => {
  if (process.env.NODE_ENV === 'development' && _i18n !== undefined) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('I18nextProvider', CYAN)}: the \`i18n\` prop has no effect with intlayer. Intlayer manages its own i18n instance — you can safely remove the prop.`
    );
  }

  return <IntlayerProvider>{children}</IntlayerProvider>;
};
