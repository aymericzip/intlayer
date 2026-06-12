import { useSession, useUpdateOrganization } from '@intlayer/design-system/api';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { Building2 } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type OrganizationFormData,
  useOrganizationSchema,
} from './useOrganizationFormSchema';

export const OrganizationEditionForm: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin =
    roles?.includes('org_admin') || roles?.includes('admin');

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
      <div className="mb-8 flex items-center gap-2">
        <Building2 className="size-5" />
        <H3 className="mb-0">{title}</H3>
      </div>
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
          className="mt-4 w-full"
          type="submit"
          color="text"
          disabled={
            !isOrganizationAdmin || isSubmitting || isPending || !organization
          }
          isLoading={isSubmitting || isPending}
          label={editButton.ariaLabel.value}
        >
          {editButton.text}
        </Form.Button>
      </Form>
    </>
  );
};
