import {
  useGetMyMissions,
  useGetMyTranslatorProfile,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { TranslatorMissionList } from './TranslatorMissionList';
import { TranslatorOnboarding } from './TranslatorOnboarding';
import { TranslatorProfileCard } from './TranslatorProfileCard';

export const TranslatorDashboardPage: FC = () => {
  const { title, notRegisteredMessage, myMissionsTitle } = useIntlayer(
    'translator-dashboard-page'
  );
  const { data: profileData, isLoading: profileLoading } =
    useGetMyTranslatorProfile();
  const { data: missionsData, isLoading: missionsLoading } = useGetMyMissions({
    role: 'translator',
  });

  const profile = profileData?.data ?? null;
  const missions = missionsData?.data ?? [];

  if (profileLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-auto flex w-full max-w-6xl flex-col gap-6 p-8">
      <h1 className="font-bold text-3xl">{title}</h1>

      {!profile ? (
        <div className="flex flex-col gap-4">
          <p className="text-neutral text-sm">{notRegisteredMessage}</p>
          <TranslatorOnboarding />
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left — edit form + missions */}
          <div className="flex flex-1 flex-col gap-6 lg:min-w-0">
            <TranslatorOnboarding existingProfile={profile} />

            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xl">{myMissionsTitle}</h2>
              {missionsLoading ? (
                <Loader />
              ) : (
                <TranslatorMissionList missions={missions} />
              )}
            </div>
          </div>

          {/* Right — live preview card */}
          <aside className="w-full shrink-0 lg:sticky lg:top-8 lg:w-80">
            <TranslatorProfileCard profile={profile} />
          </aside>
        </div>
      )}
    </div>
  );
};
