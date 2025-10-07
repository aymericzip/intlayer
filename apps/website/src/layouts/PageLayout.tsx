import type { FC } from 'react';
import { AppProviders, type AppProvidersProps } from '@/providers/AppProviders';
import { IntlayerProvider } from '@/providers/IntlayerProvider';
import { FirstConsultationProvider } from './FirstConsultationProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = AppProvidersProps &
  PageContentLayoutProps & {
    className?: string;
    mainClassName?: string;
  };

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  children,
  className,
  mainClassName,
  ...props
}) => (
  <RootHTMLLayout locale={locale} className={className}>
    <IntlayerProvider locale={locale}>
      <PageContentLayout {...props} className={mainClassName}>
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </PageContentLayout>
    </IntlayerProvider>
  </RootHTMLLayout>
);
