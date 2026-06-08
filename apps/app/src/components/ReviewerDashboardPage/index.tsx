import {
  useDeleteReviewerProfile,
  useGetMyMissions,
  useGetMyReviewerProfile,
  useUpdateReviewerProfile,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { Eye, EyeOff, Trash2, TriangleAlert } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ReviewerMissionList } from './ReviewerMissionList';
import { ReviewerOnboarding } from './ReviewerOnboarding';
import { ReviewerProfileCard } from './ReviewerProfileCard';

export const ReviewerDashboardPage: FC = () => {
  const {
    title,
    notRegisteredMessage,
    myMissionsTitle,
    pendingMessage,
    missionsAriaLabel,
    loadingMissionsAriaLabel,
    profilePreviewAriaLabel,
    profileVisibilityTitle,
    hideProfileButton,
    showProfileButton,
    hiddenProfileInfo,
    deleteProfileButton,
    deleteConfirmTitle,
    deleteConfirmDescription,
    deleteConfirmButton,
    cancelButton,
  } = useIntlayer('reviewer-dashboard-page');
  const { data: profileData, isLoading: profileLoading } =
    useGetMyReviewerProfile();
  const { data: missionsData, isLoading: missionsLoading } = useGetMyMissions({
    role: 'reviewer',
  });
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateReviewerProfile();
  const { mutate: deleteProfile, isPending: isDeleting } =
    useDeleteReviewerProfile();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
          <ReviewerOnboarding />
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left — edit form + missions */}
          <div className="flex flex-1 flex-col gap-6 lg:min-w-0">
            {profile.status === 'pending' && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-700 dark:text-yellow-300"
              >
                {pendingMessage}
              </div>
            )}
            <ReviewerOnboarding existingProfile={profile} />

            {/* Visibility */}
            <Container
              roundedSize="3xl"
              padding="lg"
              border
              borderColor="neutral"
              className="w-full"
            >
              <div className="flex items-start gap-6 px-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral/10">
                  {profile.isHidden ? (
                    <Eye className="h-5 w-5 text-neutral" aria-hidden="true" />
                  ) : (
                    <EyeOff
                      className="h-5 w-5 text-neutral"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-base">
                    {profileVisibilityTitle}
                  </h3>
                  <p className="mt-1 text-neutral text-sm">
                    {hiddenProfileInfo}
                  </p>
                  <Button
                    color="neutral"
                    variant="outline"
                    label={
                      profile.isHidden
                        ? showProfileButton.value
                        : hideProfileButton.value
                    }
                    onClick={() =>
                      updateProfile({ isHidden: !profile.isHidden })
                    }
                    isLoading={isUpdating}
                    Icon={profile.isHidden ? Eye : EyeOff}
                    className="mt-4"
                  >
                    {profile.isHidden ? showProfileButton : hideProfileButton}
                  </Button>
                </div>
              </div>
            </Container>

            {/* Danger zone */}
            <Container
              roundedSize="3xl"
              padding="lg"
              border
              borderColor="error"
              className="w-full"
            >
              <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                size="sm"
                padding="lg"
                hasCloseButton
              >
                <div className="flex flex-col gap-4 p-2">
                  <p className="font-semibold text-lg">{deleteConfirmTitle}</p>
                  <p className="text-neutral text-sm">
                    {deleteConfirmDescription}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      color="text"
                      variant="outline"
                      isFullWidth
                      label={cancelButton.value}
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      {cancelButton}
                    </Button>
                    <Button
                      color="error"
                      variant="outline"
                      isFullWidth
                      isLoading={isDeleting}
                      label={deleteConfirmButton.value}
                      onClick={() => {
                        deleteProfile();
                        setShowDeleteConfirm(false);
                      }}
                    >
                      {deleteConfirmButton}
                    </Button>
                  </div>
                </div>
              </Modal>

              <div className="flex items-start gap-6 px-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error/10">
                  <TriangleAlert
                    className="h-5 w-5 text-error"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-base text-error">
                    {deleteConfirmTitle}
                  </h3>
                  <p className="mt-1 text-neutral text-sm">
                    {deleteConfirmDescription}
                  </p>
                  <Button
                    color="error"
                    variant="outline"
                    label={deleteProfileButton.value}
                    onClick={() => setShowDeleteConfirm(true)}
                    Icon={Trash2}
                    className="mt-4"
                  >
                    {deleteProfileButton}
                  </Button>
                </div>
              </div>
            </Container>

            <section aria-label={missionsAriaLabel.value}>
              <h2 className="mb-4 font-semibold text-xl">{myMissionsTitle}</h2>
              {missionsLoading ? (
                <div role="status" aria-label={loadingMissionsAriaLabel.value}>
                  <Loader />
                </div>
              ) : (
                <ReviewerMissionList missions={missions} />
              )}
            </section>
          </div>

          {/* Right — live preview card */}
          <aside
            aria-label={profilePreviewAriaLabel.value}
            className="w-full shrink-0 lg:sticky lg:top-20 lg:w-80"
          >
            <ReviewerProfileCard profile={profile} />
          </aside>
        </div>
      )}
    </div>
  );
};
