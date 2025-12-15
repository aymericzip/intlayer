import { OrganizationForm } from '@components/Dashboard/OrganizationForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const OrganizationDashboardPageContent: FC = () => {
  const { title } = useIntlayer('organization-dashboard-page');

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-6 pl-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex flex-1 flex-col items-center">
        <div className="flex w-full flex-1 flex-col items-center p-10">
          <OrganizationForm />
        </div>
      </div>
    </>
  );
};

const OrganizationDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <OrganizationDashboardPageContent />
    </IntlayerServerProvider>
  );
};

export default OrganizationDashboardPage;
