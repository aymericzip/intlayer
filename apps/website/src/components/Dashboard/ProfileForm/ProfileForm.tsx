'use client';

import {
  useForm,
  Form,
  useAuth,
  useToast,
  Container,
} from '@intlayer/design-system';
import { useUpdateUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getSignInSchema, type ProfileFormData } from './ProfileFormSchema';

export const ProfileForm: FC = () => {
  const { session, checkSession } = useAuth();
  const { user } = session ?? {};
  const SignInSchema = getSignInSchema();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { nameInput, editButton, updateProfileToasts } =
    useIntlayer('profile-form');
  const { updateUser } = useUpdateUser();
  const { toast } = useToast();

  const onSubmitSuccess = async (data: ProfileFormData) => {
    await updateUser(data)
      .then(async () => {
        toast({
          title: updateProfileToasts.profileUpdated.title.value,
          description: updateProfileToasts.profileUpdated.description.value,
          variant: 'success',
        });
        await checkSession();
      })
      .catch((error) => {
        toast({
          title: updateProfileToasts.profileUpdateFailed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  const onSubmitError = (error: Error) => {
    console.error(error);
  };

  return (
    <Container
      roundedSize="xl"
      className="flex size-full max-w-[400px] justify-center p-6"
    >
      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        className="w-full max-w-[400px]"
        {...form}
      >
        <Form.Input
          name="name"
          label={nameInput.label}
          placeholder={nameInput.placeholder.value}
          isRequired
          defaultValue={user?.name}
        />

        <Form.Button
          className="mt-12 w-full"
          type="submit"
          color="text"
          isLoading={isSubmitting}
          label={editButton.ariaLabel.value}
        >
          {editButton.text}
        </Form.Button>
      </Form>
    </Container>
  );
};
