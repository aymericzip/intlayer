import { ProfileForm } from '@components/Dashboard/ProfileForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import React from 'react';

const ProfileDashboardPage: NextPageIntlayer = ({ params: { locale } }) => {
  const { title } = useIntlayer('profile-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl ">
        {title}
      </h1>
      <div className="flex size-full flex-1 flex-col items-center p-10">
        <ProfileForm />
      </div>
    </IntlayerServerProvider>
  );
};

export default ProfileDashboardPage;