import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { ProfileForm } from '#components/Dashboard/ProfileForm';

export const Route = createFileRoute('/{-$locale}/_dashboard/profile')({
  component: ProfilePage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('profile-dashboard-page', locale);

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

function ProfilePage() {
  const { title } = useIntlayer('profile-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <ProfileForm />
      </div>
    </DashboardContentLayout>
  );
}
