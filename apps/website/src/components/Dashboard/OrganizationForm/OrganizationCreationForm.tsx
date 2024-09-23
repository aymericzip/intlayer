'use client';

import {
  useForm,
  Form,
  InputElement,
  Button,
  useToast,
  useUser,
} from '@intlayer/design-system';
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
  const SignInSchema = getOrganizationSchema();
  const { checkSession } = useUser();
  const { addOrganization } = useAddOrganization();
  const { selectOrganization } = useSelectOrganization();
  const { form, isSubmitting } = useForm(SignInSchema);
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

            await checkSession();
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
      schema={SignInSchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px]"
      {...form}
    >
      <InputElement
        name="name"
        label={nameInput.label}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createOrganizationButton.ariaLabel.value}
      >
        {createOrganizationButton.text}
      </Button>
    </Form>
  );
};
