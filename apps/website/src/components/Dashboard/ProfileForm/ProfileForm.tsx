'use client';

import { ChangePasswordForm } from '@components/Auth/ChangePassword';
import { DeleteUser } from '@components/Auth/DeleteUser';
import { TwoFactorAuth } from '@components/Auth/TwoFactorAuth';
import { Container, Form, H3, useForm } from '@intlayer/design-system';
import { useSession, useUpdateUser } from '@intlayer/design-system/hooks';
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
  } = useIntlayer('profile-form');
  const { mutate: updateUser, isPending } = useUpdateUser();

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
    <div className="flex size-full max-w-5xl flex-col items-center justify-center gap-4">
      <div className="grid w-full justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-2 lg:gap-x-16">
        <div className="flex size-full w-full flex-col gap-10">
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
        {user?.lastLoginMethod === 'email' && (
          <div className="flex w-full flex-col gap-10">
            <Container roundedSize="xl" padding="md">
              <H3 className="mb-8">{changePasswordTitle}</H3>
              <ChangePasswordForm />
            </Container>
            <Container roundedSize="xl" padding="md">
              <H3 className="mb-8">{twoFactorTitle}</H3>
              <TwoFactorAuth />
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};
