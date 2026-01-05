'use client';

import { Form, H3, useForm } from '@intlayer/design-system';
import {
  useSession,
  useUpdateOrganization,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import {
  type OrganizationFormData,
  useOrganizationSchema,
} from './useOrganizationFormSchema';

export const OrganizationEditionForm: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin = roles?.includes('org_admin');

  const OrganizationSchema = useOrganizationSchema();
  const { mutate: updateOrganization, isPending } = useUpdateOrganization();
  const { form, isSubmitting } = useForm(OrganizationSchema);
  const { title, nameInput, editButton } = useIntlayer('organization-form');

  const onSubmitSuccess = (data: OrganizationFormData) => {
    updateOrganization(data);
  };

  useEffect(() => {
    if (organization) {
      form.reset(organization);
    }
  }, [form.reset, organization]);

  return (
    <>
      <H3 className="mb-8"> {title}</H3>
      <Form
        schema={OrganizationSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="size-full"
        {...form}
      >
        <Form.Input
          name="name"
          id="organization-edit-name"
          label={nameInput.label.value}
          placeholder={nameInput.placeholder.value}
          isRequired
          defaultValue={organization?.name}
          disabled={!isOrganizationAdmin}
        />

        <Form.Button
          className="mt-12 w-full"
          type="submit"
          color="text"
          disabled={!isOrganizationAdmin}
          isLoading={isSubmitting || isPending}
          label={editButton.ariaLabel.value}
        >
          {editButton.text}
        </Form.Button>
      </Form>
    </>
  );
};
