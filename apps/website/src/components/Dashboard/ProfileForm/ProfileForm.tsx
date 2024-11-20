'use client';

import { useForm, Form, useAuth, Container, H3 } from '@intlayer/design-system';
import { useUpdateUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getSignInSchema, type ProfileFormData } from './ProfileFormSchema';

export const ProfileForm: FC = () => {
  const { session } = useAuth();
  const { user } = session ?? {};
  const SignInSchema = getSignInSchema();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { title, nameInput, emailInput, editButton } =
    useIntlayer('profile-form');
  const { updateUser } = useUpdateUser();

  const onSubmitSuccess = async (data: ProfileFormData) => {
    await updateUser(data);
  };

  const onSubmitError = (error: Error) => {
    console.error(error);
  };

  return (
    <Container
      roundedSize="xl"
      className="flex size-full max-w-[500px] justify-center p-6"
    >
      <H3 className="mb-8"> {title}</H3>
      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
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
          isLoading={isSubmitting}
          label={editButton.ariaLabel.value}
        >
          {editButton.text}
        </Form.Button>
      </Form>
    </Container>
  );
};
