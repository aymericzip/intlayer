import { PagesRoutes } from '@/Routes';
import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { Session } from '@intlayer/backend';
import { PageLayout } from '@layouts/PageLayout';
import { type LocalesValues } from 'intlayer';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { type FC, type PropsWithChildren } from 'react';

// Required to revalidate session after user login/logout

const AdminLayoutContent: FC<
  PropsWithChildren<{ locale: LocalesValues; session: Session | null }>
> = ({ children, locale, session }) => {
  return (
    <PageLayout locale={locale}>
      <AuthenticationBarrier
        accessRule="admin"
        redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(PagesRoutes.Dashboard)}`}
        session={session}
        locale={locale}
      >
        {children}
      </AuthenticationBarrier>
    </PageLayout>
  );
};

const AdminLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const session = await getServerSession();

  return (
    <AdminLayoutContent locale={locale} session={session}>
      {children}
    </AdminLayoutContent>
  );
};

export default AdminLayout;
