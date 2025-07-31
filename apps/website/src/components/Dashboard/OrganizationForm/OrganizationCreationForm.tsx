'use client';

import type { OrganizationAPI } from '@intlayer/backend';
import { Form, useForm } from '@intlayer/design-system';
import {
  useAddOrganization,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  useOrganizationSchema,
  type OrganizationFormData,
} from './useOrganizationFormSchema';

type OrganizationCreationFormProps = {
  onOrganizationCreated?: (organization: OrganizationAPI) => void;
};

export const OrganizationCreationForm: FC<OrganizationCreationFormProps> = ({
  onOrganizationCreated,
}) => {
  const organizationSchema = useOrganizationSchema();
  const { addOrganization } = useAddOrganization();
  const { selectOrganization } = useSelectOrganization();
  const { form, isSubmitting } = useForm(organizationSchema);
  const { nameInput, createOrganizationButton } =
    useIntlayer('organization-form');

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await addOrganization(data).then(async (result) => {
      if (!result.data) return;

      const organizationId = String(result.data?.id);

      await selectOrganization(organizationId);
      onOrganizationCreated?.(result.data);
    });
  };

  return (
    <Form
      schema={organizationSchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px] py-10"
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
        Icon={Plus}
      >
        {createOrganizationButton.text}
      </Form.Button>
    </Form>
  );
};
