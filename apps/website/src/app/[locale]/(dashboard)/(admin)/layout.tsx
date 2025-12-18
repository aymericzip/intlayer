import { AdminBreadcrumb } from '@components/AdminBreadcrumb';
import { AdminTabBar } from '@components/AdminTabBar';
import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import type { SessionAPI } from '@intlayer/backend';
import { getSessionData } from '@utils/getSessionData';
import type { NextLayoutIntlayer } from 'next-intlayer';

export const runtime = 'nodejs'; // ensure Node runtime
export const dynamic = 'force-dynamic'; // make sure request cookies are read
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const AdminLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { session } = await getSessionData();

  return (
    <AuthenticationBarrier
      accessRule="admin"
      session={session as SessionAPI}
      locale={locale}
    >
      <div className="flex flex-1 flex-col">
        <AdminTabBar />
        <section className="flex flex-1 flex-col p-10">
          <div className="p4 mb-10">
            <AdminBreadcrumb />
          </div>
          {children}
        </section>
      </div>
    </AuthenticationBarrier>
  );
};

export default AdminLayout;
