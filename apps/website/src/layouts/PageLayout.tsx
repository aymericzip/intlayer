import type { FC } from 'react';
import {
  type PageContentLayoutProps,
  PageContentLayout,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';
import { AppProviders, type AppProvidersProps } from '@/providers/AppProviders';

type PageLayoutProps = AppProvidersProps & PageContentLayoutProps;

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  children,
  ...props
}) => (
  <RootHTMLLayout locale={locale}>
    <AppProviders locale={locale}>
      <PageContentLayout {...props}>{children}</PageContentLayout>
    </AppProviders>
  </RootHTMLLayout>
);
