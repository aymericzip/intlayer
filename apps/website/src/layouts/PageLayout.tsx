import { AppProviders, type AppProvidersProps } from '@/providers/AppProviders';
import type { FC } from 'react';
import { FirstConsultationProvider } from './FirstConsultationProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = AppProvidersProps & PageContentLayoutProps;

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  children,
  ...props
}) => (
  <RootHTMLLayout locale={locale}>
    <AppProviders locale={locale}>
      <PageContentLayout {...props}>
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </PageContentLayout>
    </AppProviders>
  </RootHTMLLayout>
);
