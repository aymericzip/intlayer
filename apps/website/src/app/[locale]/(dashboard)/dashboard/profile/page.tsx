import { BackgroundLayout } from '@components/BackgroundLayout';
import { ProfileForm } from '@components/Dashboard/ProfileForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const ProfileDashboardPageContent: FC = () => {
  const { title } = useIntlayer('profile-dashboard-page');

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-10 text-3xl">{title}</h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <BackgroundLayout />
        <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
          <ProfileForm />
        </div>
      </div>
    </>
  );
};

const ProfileDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <ProfileDashboardPageContent />
    </IntlayerServerProvider>
  );
};

export default ProfileDashboardPage;
