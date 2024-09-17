'use client';

import { useForm, Form, InputElement, Button } from '@intlayer/design-system';
import { useAddOrganization } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  getOrganizationSchema,
  type OrganizationFormData,
} from './OrganizationFormSchema';

export const OrganizationCreationForm: FC = () => {
  const SignInSchema = getOrganizationSchema();
  const { addOrganization } = useAddOrganization();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { nameInput, editButton } = useIntlayer('organization-form');

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await addOrganization(data);
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
