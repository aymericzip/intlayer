import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import {
  useListPasskeys,
  useSession,
  useUpdateUser,
} from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { cn } from '@intlayer/design-system/utils';
import { LockIcon, PenIcon } from 'lucide-react';
import { type FC, Suspense, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ChangePasswordModal } from '#components/Auth/ChangePassword';
import { DeleteUser } from '#components/Auth/DeleteUser';
import { PasskeyManagement } from '#components/Auth/PasskeyManagement';
import { TwoFactorAuth } from '#components/Auth/TwoFactorAuth';
import { ConnectedAccounts } from './ConnectedAccounts';
import { ProfileSkeleton } from './ProfileSkeleton';
import {
  type ProfileFormData,
  useProfileFormSchema,
} from './useProfileFormSchema';

const ProfileFormContent: FC = () => {
  const { session } = useSession();
  const { user } = session ?? {};
  const ProfileFormSchema = useProfileFormSchema();
  const { form, isSubmitting } = useForm(ProfileFormSchema);
  const {
    title,
    nameInput,
    editButton,
    changePasswordTitle,
    twoFactorTitle,
    passkeyTitle,
  } = useIntlayer('profile-form');
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { data: passkeysData, refetch: refetchPasskeys } = useListPasskeys();
  const passkeys = passkeysData?.data ?? [];
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const hasPasswordColumn =
    user?.lastLoginMethod === 'email' || user?.lastLoginMethod === 'passkey';

  const onSubmitSuccess = (data: ProfileFormData) => {
    if (!user) return;
    updateUser(
      { ...data, id: String(user.id) },
      { onSuccess: () => setIsEditProfileOpen(false) }
    );
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
    form.reset(user);
  };

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [form.reset, user]);

  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8">
      <Container
        roundedSize="3xl"
        padding="lg"
        className="w-full flex-row items-center gap-10"
      >
        <Avatar size="2xl" src={user?.image} />
        <div className="flex flex-col justify-between gap-2">
          <span className="text-4xl text-text">{user?.name}</span>
          <span className="text-lg text-neutral">{user?.email}</span>
        </div>
        <div className="mt-auto ml-auto flex flex-row gap-2">
          {hasPasswordColumn ? (
            <Button
              onClick={() => setIsChangePasswordOpen(true)}
              color="text"
              variant="outline"
              Icon={LockIcon}
              label={changePasswordTitle.value}
            >
              {changePasswordTitle}
            </Button>
          ) : (
            <span className="h-full"></span>
          )}
          <Button
            onClick={() => setIsEditProfileOpen(true)}
            color="text"
            Icon={PenIcon}
            label={editButton.ariaLabel.value}
          >
            {editButton.text}
          </Button>
        </div>
      </Container>

      <div className="justify-top grid w-full grid-cols-1 gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
        <div className="flex size-full w-full flex-col gap-10 md:max-w-xl">
          <ConnectedAccounts />
        </div>

        <div className="flex w-full flex-col gap-10 md:max-w-xl">
          <Container roundedSize="3xl" padding="md" className="relative w-full">
            <H3 className="mb-8">{twoFactorTitle}</H3>
            <TwoFactorAuth />
          </Container>
          <Container roundedSize="3xl" padding="md" className="w-full">
            <H3 className="mb-8">{passkeyTitle}</H3>
            <PasskeyManagement
              passkeys={passkeys}
              onPasskeyAdded={refetchPasskeys}
              onPasskeyDeleted={refetchPasskeys}
            />
          </Container>
        </div>
      </div>

      <Container roundedSize="3xl" padding="lg" className="w-full">
        <DeleteUser />
      </Container>

      <Modal
        isOpen={isEditProfileOpen}
        onClose={handleCloseEditProfile}
        title={title.value}
        padding="lg"
        className="max-h-[80vh]"
      >
        {isEditProfileOpen && (
          <Form
            schema={ProfileFormSchema}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitError={(data) => console.error(data)}
            className="mt-4 w-full"
            {...form}
          >
            <Form.Input
              name="name"
              id="profile-name-input"
              label={nameInput.label}
              placeholder={nameInput.placeholder.value}
              isRequired
            />
            <Form.Button
              className="mt-6 w-full"
              type="submit"
              color="text"
              isLoading={isSubmitting || isPending}
              label={editButton.ariaLabel.value}
            >
              {editButton.text}
            </Form.Button>
          </Form>
        )}
      </Modal>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
};

export const ProfileForm: FC = () => (
  <Suspense fallback={<ProfileSkeleton />}>
    <ProfileFormContent />
  </Suspense>
);
