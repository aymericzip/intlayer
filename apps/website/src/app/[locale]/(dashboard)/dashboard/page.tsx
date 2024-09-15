import type { Session } from '@intlayer/design-system';
import { redirect } from 'next/navigation';
import type { NextPageIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

const DashboardPage: NextPageIntlayer<{ session?: Session }> = ({
  params: { session },
}) => {
  if (session?.organization && session?.project) {
    redirect(PagesRoutes.Dashboard_Content);
  } else if (session?.organization) {
    redirect(PagesRoutes.Dashboard_Projects);
  } else {
    redirect(PagesRoutes.Dashboard_Organization);
  }
};

export default DashboardPage;
