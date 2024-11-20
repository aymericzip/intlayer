'use client';

import { useForm, Form } from '@intlayer/design-system';
import {
  useAddOrganization,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  getOrganizationSchema,
  type OrganizationFormData,
} from './OrganizationFormSchema';

export const OrganizationCreationForm: FC = () => {
  const organizationSchema = getOrganizationSchema();
  const { addOrganization } = useAddOrganization();
  const { selectOrganization } = useSelectOrganization();
  const { form, isSubmitting } = useForm(organizationSchema);
  const { nameInput, createOrganizationButton } =
    useIntlayer('organization-form');

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await addOrganization(data).then(async (result) => {
      const organizationId = String(result.data?._id);

      await selectOrganization(organizationId);
    });
  };

  return (
    <Form
      schema={organizationSchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px]"
      {...form}
    >
      <Form.Input
        name="name"
        label={nameInput.label}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createOrganizationButton.ariaLabel.value}
      >
        {createOrganizationButton.text}
      </Form.Button>
    </Form>
  );
};
