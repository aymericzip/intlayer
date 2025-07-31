import type { Session } from '@intlayer/design-system/hooks';
import type { NextPageIntlayer } from 'next-intlayer';
import { DashboardPageContent } from './pageContent';

const DashboardPage: NextPageIntlayer<{ session?: Session }> = async ({
  params,
}) => {
  const { session: sessionServer } = await params;

  return <DashboardPageContent sessionServer={sessionServer} />;
};

export default DashboardPage;
