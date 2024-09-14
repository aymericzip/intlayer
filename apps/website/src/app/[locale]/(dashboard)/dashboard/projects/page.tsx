import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import React from 'react';

const ProjectsDashboardPage: NextPageIntlayer = ({ params: { locale } }) => {
  const { title } = useIntlayer('dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="hidden">{title}</h1>
      <div className="flex h-full flex-1 flex-col items-center justify-center p-10"></div>
    </IntlayerServerProvider>
  );
};

export default ProjectsDashboardPage;
