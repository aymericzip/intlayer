import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { OrganizationForm } from '#components/Dashboard/OrganizationForm';

export const Route = createFileRoute('/{-$locale}/_dashboard/organization')({
  component: OrganizationPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('organization-dashboard-page', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function OrganizationPage() {
  const { title } = useIntlayer('organization-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <OrganizationForm />
      </div>
    </DashboardContentLayout>
  );
}
