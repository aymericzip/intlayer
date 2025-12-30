import { OrganizationForm } from '@components/Dashboard/OrganizationForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const OrganizationDashboardPageContent: FC = () => {
  const { title } = useIntlayer('organization-dashboard-page');

  return (
    <>
      <h1
        className="sticky top-0 z-50 border-neutral border-b-[0.5px] bg-background p-6 pl-10 text-3xl"
        style={{
          // Indique que l'animation suit le scroll de la page
          animationTimeline: 'scroll()',
          // L'animation se joue entre 0px et 100px de scroll
          animationRange: '0 50px',
          // Nom de l'animation (définie dans ton CSS global ou via Tailwind config)
          animationName: 'shrink-title',
          animationFillMode: 'both',
          animationTimingFunction: 'linear',
        }}
      >
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
