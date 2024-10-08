'use client';

import {
  useForm,
  Form,
  useToast,
  useAuth,
  Container,
} from '@intlayer/design-system';
import { useUpdateOrganization } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  getOrganizationSchema,
  type OrganizationFormData,
} from './OrganizationFormSchema';

export const OrganizationEditionForm: FC = () => {
  const { session, checkSession } = useAuth();
  const { organization } = session ?? {};
  const SignInSchema = getOrganizationSchema();
  const { updateOrganization } = useUpdateOrganization();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { nameInput, editButton, updateOrganizationToasts } =
    useIntlayer('organization-form');
  const { toast } = useToast();

  const onSubmitSuccess = async (data: OrganizationFormData) => {
    await updateOrganization({ _id: organization?._id, ...data })
      .then(async () => {
        toast({
          title: updateOrganizationToasts.organizationUpdated.title.value,
          description:
            updateOrganizationToasts.organizationUpdated.description.value,
          variant: 'success',
        });
        await checkSession();
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
    <Container
      roundedSize="xl"
      className="flex size-full max-w-[400px] justify-center p-6"
    >
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
    </Container>
  );
};
