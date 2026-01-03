import { getSessionData } from '@utils/getSessionData';
import type { NextPageIntlayer } from 'next-intlayer';
import { DashboardPageContent } from './pageContent';

const DashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { session } = await getSessionData();

  return <DashboardPageContent sessionServer={session} locale={locale} />;
};

export default DashboardPage;
