import { OrganizationForm } from '@components/Dashboard/OrganizationForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import React from 'react';

const OrganizationDashboardPage: NextPageIntlayer = ({
  params: { locale },
}) => {
  const { title } = useIntlayer('organization-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl ">
        {title}
      </h1>
      <div className="flex size-full flex-1 flex-col items-center p-10">
        <OrganizationForm />
      </div>
    </IntlayerServerProvider>
  );
};

export default OrganizationDashboardPage;
