'use client';

import {
  useForm,
  Form,
  InputElement,
  Button,
  useToast,
  useAuth,
} from '@intlayer/design-system';
import { useUpdateOrganization } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  getOrganizationSchema,
  type OrganizationFormData,
} from './OrganizationFormSchema';

export const OrganizationEditionForm: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};
  const SignInSchema = getOrganizationSchema();
  const { updateOrganization } = useUpdateOrganization();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { nameInput, editButton, updateOrganizationToasts } =
    useIntlayer('organization-form');
  const { toast } = useToast();

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await updateOrganization({ _id: organization?._id, ...data })
      .then(() => {
        toast({
          title: updateOrganizationToasts.organizationUpdated.title.value,
          description:
            updateOrganizationToasts.organizationUpdated.description.value,
          variant: 'success',
        });
      })
      .catch((error) => {
        toast({
          title: updateOrganizationToasts.organizationUpdateFailed.title.value,
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
        defaultValue={organization?.name}
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
