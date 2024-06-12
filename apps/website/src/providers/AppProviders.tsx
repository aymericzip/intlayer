import type { IntlayerClientProviderProps } from 'next-intlayer/client';
import type { FC } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { LocaleContextProvider } from './IntlayerProvider';
import NextAuthProvider, {
  type NextAuthProviderProps,
} from './NextAuthProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
import { ThemeProvider } from './ThemeProvider';

export type AppProvidersProps = IntlayerClientProviderProps &
  NextAuthProviderProps;

export const AppProviders: FC<AppProvidersProps> = ({
  children,
  session,
  locale,
  editorEnabled,
}) => (
  <LocaleContextProvider locale={locale} editorEnabled={editorEnabled}>
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
