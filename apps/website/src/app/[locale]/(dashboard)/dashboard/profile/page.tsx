import { BackgroundLayout } from '@components/BackgroundLayout';
import { ProfileForm } from '@components/Dashboard/ProfileForm';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const ProfileDashboardPage: Next14PageIntlayer = ({ params: { locale } }) => {
  const { title } = useIntlayer('profile-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
          <ProfileForm />
        </div>
        <BackgroundLayout />
      </div>
    </IntlayerServerProvider>
  );
};

export default ProfileDashboardPage;
