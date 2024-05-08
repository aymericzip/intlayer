import type { IntlayerClientProviderProps } from 'next-intlayer/client';
import type { FC } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { LocaleContextProvider } from './IntlayerProvider';
import NextAuthProvider, {
  type NextAuthProviderProps,
} from './NextAuthProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
import { ThemeProvider } from './ThemeProvider';

type AppProvidersProps = IntlayerClientProviderProps & NextAuthProviderProps;

export const AppProviders: FC<AppProvidersProps> = ({
  children,
  session,
  locale,
}) => (
  <LocaleContextProvider locale={locale}>
    <NextAuthProvider session={session}>
      <ReactQueryClientProvider>
        <ThemeProvider>
          <AnimatePresenceProvider>
            <>{children}</>
          </AnimatePresenceProvider>
        </ThemeProvider>
      </ReactQueryClientProvider>
    </NextAuthProvider>
  </LocaleContextProvider>
);
