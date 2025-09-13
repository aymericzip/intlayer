import { PagesRoutes } from '@/Routes';
import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { Session } from '@intlayer/backend';
import { PageLayout } from '@layouts/PageLayout';
import { type LocalesValues } from 'intlayer';
import type { NextLayoutIntlayer } from 'next-intlayer';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

export { generateMetadata } from './metadata';

// Admin layout content component
const AdminLayoutContent: FC<
  PropsWithChildren<{ locale: LocalesValues; session: Session | null }>
> = ({ children, locale, session }) => {
  return (
    <PageLayout locale={locale}>
      <AuthenticationBarrier
        accessRule="admin"
        redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(PagesRoutes.Admin)}`}
        session={session}
        locale={locale}
      >
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Admin Panel
                  </h1>
                </div>
                <nav className="flex space-x-8">
                  <Link
                    href={PagesRoutes.Admin}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={PagesRoutes.Admin_Users}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    Users
                  </Link>
                  <Link
                    href={PagesRoutes.Admin_Organizations}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    Organizations
                  </Link>
                  <Link
                    href={PagesRoutes.Admin_Projects}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    Projects
                  </Link>
                  <Link
                    href={PagesRoutes.Admin_System}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    System
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
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
