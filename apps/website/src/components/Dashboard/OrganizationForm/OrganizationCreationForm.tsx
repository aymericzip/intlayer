'use client';

import { useForm, Form, useToast } from '@intlayer/design-system';
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
  const {
    nameInput,
    createOrganizationButton,
    createOrganizationToasts,
    selectOrganizationToasts,
  } = useIntlayer('organization-form');
  const { toast } = useToast();

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await addOrganization(data)
      .then(async (result) => {
        toast({
          title: createOrganizationToasts.organizationCreated.title.value,
          description:
            createOrganizationToasts.organizationCreated.description.value,
          variant: 'success',
        });

        const organizationId = String(result.data?._id);

        await selectOrganization(organizationId)
          .then(async () => {
            toast({
              title: selectOrganizationToasts.organizationSelected.title.value,
              description:
                selectOrganizationToasts.organizationSelected.description.value,
              variant: 'success',
            });
          })
          .catch((error) => {
            toast({
              title:
                selectOrganizationToasts.organizationSelectionFailed.title
                  .value,
              description: error.message,
              variant: 'error',
            });
          });
      })
      .catch((error) => {
        toast({
          title:
            createOrganizationToasts.organizationCreationFailed.title.value,
          description: error.message,
          variant: 'error',
        });
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
