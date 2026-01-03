'use client';

import { ChangePasswordForm } from '@components/Auth/ChangePassword';
import { DeleteUser } from '@components/Auth/DeleteUser';
import { PasskeyManagement } from '@components/Auth/PasskeyManagement';
import { TwoFactorAuth } from '@components/Auth/TwoFactorAuth';
import { Container, Form, H3, useForm } from '@intlayer/design-system';
import {
  useListPasskeys,
  useSession,
  useUpdateUser,
} from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import {
  type ProfileFormData,
  useProfileFormSchema,
} from './useProfileFormSchema';

export const ProfileForm: FC = () => {
  const { session } = useSession();
  const { user } = session ?? {};
  const ProfileFormSchema = useProfileFormSchema();
  const { form, isSubmitting } = useForm(ProfileFormSchema);
  const {
    title,
    nameInput,
    emailInput,
    editButton,
    changePasswordTitle,
    twoFactorTitle,
    passkeyTitle,
  } = useIntlayer('profile-form');
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { data: passkeysData, refetch: refetchPasskeys } = useListPasskeys();
  const passkeys = passkeysData?.data ?? [];

  const hasPasswordColumn =
    user?.lastLoginMethod === 'email' || user?.lastLoginMethod === 'passkey';

  const onSubmitSuccess = (data: ProfileFormData) => {
    if (!user) return;

    updateUser({ ...data, id: String(user.id) });
  };

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [form.reset, user]);

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'grid w-full grid-cols-1 justify-evenly gap-x-5 gap-y-10 lg:gap-x-16',
          hasPasswordColumn && 'max-md:grid-cols-1 md:grid-cols-2'
        )}
      >
        <div
          className={cn(
            'm-auto flex size-full w-full max-w-xl flex-col gap-10',
            hasPasswordColumn && 'm-auto max-w-xl'
          )}
        >
          <Container roundedSize="xl" padding="md">
            <H3 className="mb-8"> {title}</H3>
            <Form
              schema={ProfileFormSchema}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitError={(data) => console.error(data)}
              className="w-full"
              {...form}
            >
              <Form.Input
                name="name"
                label={nameInput.label}
                placeholder={nameInput.placeholder.value}
                isRequired
                defaultValue={user?.name}
              />
              <Form.Input
                name="email"
                type="email"
                label={emailInput.label}
                placeholder={emailInput.placeholder.value}
                disabled
                defaultValue={user?.email}
              />

              <Form.Button
                className="mt-12 w-full"
                type="submit"
                color="text"
                isLoading={isSubmitting || isPending}
                label={editButton.ariaLabel.value}
              >
                {editButton.text}
              </Form.Button>
            </Form>
          </Container>
          <Container roundedSize="xl" padding="md">
            <DeleteUser />
          </Container>
        </div>
        {hasPasswordColumn && (
          <div className="flex w-full flex-col gap-10">
            <Container
              roundedSize="xl"
              padding="md"
              className="m-auto w-full max-w-xl"
            >
              <H3 className="mb-8">{changePasswordTitle}</H3>
              <ChangePasswordForm />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="m-auto w-full max-w-xl"
            >
              <H3 className="mb-8">{twoFactorTitle}</H3>
              <TwoFactorAuth />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="m-auto w-full max-w-xl"
            >
              <H3 className="mb-8">{passkeyTitle}</H3>
              <PasskeyManagement
                passkeys={passkeys}
                onPasskeyAdded={refetchPasskeys}
                onPasskeyDeleted={refetchPasskeys}
              />
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};
