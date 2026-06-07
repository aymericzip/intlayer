import type { OrganizationAPI } from '@intlayer/backend';
import {
  useAddOrganization,
  useSelectOrganization,
} from '@intlayer/design-system/api';
import {
  Form,
  FormButton,
  FormInput,
  useForm,
} from '@intlayer/design-system/form';
import { Plus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type OrganizationFormData,
  useOrganizationSchema,
} from './useOrganizationFormSchema';

type OrganizationCreationFormProps = {
  onOrganizationCreated?: (organization: OrganizationAPI) => void;
};

export const OrganizationCreationForm: FC<OrganizationCreationFormProps> = ({
  onOrganizationCreated,
}) => {
  const organizationSchema = useOrganizationSchema();
  const { mutate: addOrganization, isPending: isAddingOrganization } =
    useAddOrganization();
  const { mutate: selectOrganization } = useSelectOrganization();
  const { form, isSubmitting } = useForm(organizationSchema);
  const { nameInput, createOrganizationButton } =
    useIntlayer('organization-form');

  const onSubmitSuccess = (data: OrganizationFormData) =>
    addOrganization(data, {
      onSuccess: (result: any) => {
        if (!result.data) return;

        const organizationId = String(result.data?.id);

        selectOrganization(organizationId);
        onOrganizationCreated?.(result.data);
      },
    });

  return (
    <Form
      schema={organizationSchema}
      onSubmitSuccess={onSubmitSuccess}
      {...form}
    >
      <FormInput
        name="name"
        id="organization-name-input"
        label={nameInput.label.value}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <FormButton
        className="mt-4 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting || isAddingOrganization}
        label={createOrganizationButton.ariaLabel.value}
        Icon={Plus}
      >
        {createOrganizationButton.text}
      </FormButton>
    </Form>
  );
};
