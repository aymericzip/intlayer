import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { OrganizationForm } from '@components/Dashboard/OrganizationForm';
import type { LocalesValues } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const OrganizationDashboardPageContent: FC<{ locale: LocalesValues }> = ({
  locale,
}) => {
  const { title } = useIntlayer('organization-dashboard-page', locale);

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <OrganizationForm />
      </div>
    </DashboardContentLayout>
  );
};

const OrganizationDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Suspense>
        <OrganizationDashboardPageContent locale={locale} />
      </Suspense>
    </IntlayerServerProvider>
  );
};

export default OrganizationDashboardPage;
