'use client';

import { useForm, Form, InputElement, Button } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getSignInSchema, type ProfileFormData } from './ProfileFormSchema';

export const ProfileForm: FC = () => {
  const SignInSchema = getSignInSchema();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { nameInput, editButton } = useIntlayer('profile-form');

  const onSubmitSuccess = async (data: ProfileFormData) => {
    await Promise.resolve();
  };

  const onSubmitError = (error: Error) => {
    console.error(error);
  };

  return (
    <Form
      schema={SignInSchema}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      className="w-full max-w-[400px]"
      {...form}
    >
      <InputElement
        name="name"
        label={nameInput.label}
        placeholder={nameInput.placeholder.value}
        isRequired
        autoComplete="name"
      />

      <Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={editButton.ariaLabel.value}
      >
        {editButton.text}
      </Button>
    </Form>
  );
};
