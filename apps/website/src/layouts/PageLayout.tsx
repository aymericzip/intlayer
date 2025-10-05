import type { FC } from 'react';
import { AppProviders, type AppProvidersProps } from '@/providers/AppProviders';
import { FirstConsultationProvider } from './FirstConsultationProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = AppProvidersProps &
  PageContentLayoutProps & {
    className?: string;
  };

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  children,
  className,
  ...props
}) => (
  <RootHTMLLayout locale={locale} className={className}>
    <AppProviders locale={locale}>
      <PageContentLayout {...props}>
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </PageContentLayout>
    </AppProviders>
  </RootHTMLLayout>
);
