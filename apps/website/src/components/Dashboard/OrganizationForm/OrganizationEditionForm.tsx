'use client';

import { useForm, Form, useToast, useAuth, H3 } from '@intlayer/design-system';
import { useUpdateOrganization } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  getOrganizationSchema,
  type OrganizationFormData,
} from './OrganizationFormSchema';

export const OrganizationEditionForm: FC = () => {
  const { session, revalidateSession } = useAuth();
  const { organization } = session ?? {};
  const SignInSchema = getOrganizationSchema();
  const { updateOrganization } = useUpdateOrganization();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { title, nameInput, editButton, updateOrganizationToasts } =
    useIntlayer('organization-form');
  const { toast } = useToast();

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await updateOrganization(data)
      .then(async () => {
        toast({
          title: updateOrganizationToasts.organizationUpdated.title.value,
          description:
            updateOrganizationToasts.organizationUpdated.description.value,
          variant: 'success',
        });
        await revalidateSession();
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
    <>
      <H3 className="mb-8"> {title}</H3>
      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="size-full"
        {...form}
      >
        <Form.Input
          name="name"
          label={nameInput.label}
          placeholder={nameInput.placeholder.value}
          isRequired
          defaultValue={organization?.name}
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
    </>
  );
};
