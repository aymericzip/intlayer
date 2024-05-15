import type { FC } from 'react';
import {
  type PageContentLayoutProps,
  PageContentLayout,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';
import { AppProviders, type AppProvidersProps } from '@/providers/AppProviders';
import {
  AuthenticationBarrier,
  type AuthenticationBarrierProps,
} from '@/utils/auth/next-auth/AuthenticationBarrier';
// import { authOptions } from '@/utils/auth/next-auth/authOptions';

type PageLayoutProps = AuthenticationBarrierProps &
  AppProvidersProps &
  PageContentLayoutProps;

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  accessRule = 'public',
  children,
  ...props
}) => {
  // const session = await getServerSession(authOptions);

  return (
    <RootHTMLLayout locale={locale}>
      <AppProviders locale={locale}>
        <AuthenticationBarrier
          accessRule={accessRule}
          // session={session}
        >
          <PageContentLayout {...props}>{children}</PageContentLayout>
        </AuthenticationBarrier>
      </AppProviders>
    </RootHTMLLayout>
  );
};
