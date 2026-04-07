import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { ProfileForm } from '@components/Dashboard/ProfileForm';
import type { LocalesValues } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const ProfileDashboardPageContent: FC<{ locale: LocalesValues }> = ({
  locale,
}) => {
  const { title } = useIntlayer('profile-dashboard-page', locale);

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <ProfileForm />
      </div>
    </DashboardContentLayout>
  );
};

const ProfileDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Suspense>
        <ProfileDashboardPageContent locale={locale} />
      </Suspense>
    </IntlayerServerProvider>
  );
};

export default ProfileDashboardPage;
