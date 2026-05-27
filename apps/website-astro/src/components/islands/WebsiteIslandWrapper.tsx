/** @jsxImportSource react */

import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import type { PageContentLayoutProps } from '@layouts/PageContentLayout';
import { PageContentLayout } from '@layouts/PageContentLayout';
import type { LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { AppProviders } from '@/providers/AppProviders';
import { IntlayerMarkdownProvider } from '@/providers/IntlayerMarkdownProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

type Props = Omit<PageContentLayoutProps, 'children'> & {
  locale: LocalesValues;
  children: ReactNode;
  showEmailToast?: boolean;
};

export const WebsiteIslandWrapper: FC<Props> = ({
  locale,
  children,
  showEmailToast = true,
  ...layoutProps
}) => (
  <IntlayerProvider locale={locale}>
    <ThemeProvider>
      <AppProviders>
        <PageContentLayout {...layoutProps}>
          <IntlayerMarkdownProvider>
            {showEmailToast && <EmailRegistrationToast />}
            {children}
          </IntlayerMarkdownProvider>
        </PageContentLayout>
      </AppProviders>
    </ThemeProvider>
  </IntlayerProvider>
);
