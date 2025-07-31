import type { AddNewAccessKeyResponse } from '@intlayer/backend';
import { Form, useForm } from '@intlayer/design-system';
import { useAddNewAccessKey, useAuth } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  type AccessKeyFormCreationData,
  useAccessKeyCreationSchema,
} from './useAccessKeyCreationFormSchema';

/**
 * Form used to create a new access‑key.
 * Default grants (dictionary:* & project:*) are now checked automatically ‑ even
 * when the session arrives after the first render.
 */

type AccessKeyCreationFormProps = {
  onAccessKeyCreated: (response: AddNewAccessKeyResponse) => void;
};

const isDefaultGrant = (permission: string) =>
  permission.startsWith('dictionary:') || permission.startsWith('project:');

const getDefaultGrants = (permissions: string[]) =>
  Object.fromEntries(
    permissions.map((permission) => [permission, isDefaultGrant(permission)])
  );

export const AccessKeyCreationForm: FC<AccessKeyCreationFormProps> = ({
  onAccessKeyCreated,
}) => {
  /** ------------------------------------------------------------------ hooks */
  const { session } = useAuth();

  // Don’t render the form until the session (and its permissions) is loaded
  if (!session) return null;

  const permissions = session.permissions ?? [];
  const { addNewAccessKey } = useAddNewAccessKey();
  const { nameInput, expiresAtInput, rights, createAccessKeyButton } =
    useIntlayer('access-key-creation-form');

  const AccessKeyCreationSchema = useAccessKeyCreationSchema(permissions);

  const defaultValues = {
    grants: getDefaultGrants(permissions),
  };

  const { form, isSubmitting } = useForm(AccessKeyCreationSchema, {
    defaultValues,
  });

  /** -------------------------------------------------------- form handlers */
  const onSubmitSuccess = async (data: AccessKeyFormCreationData) => {
    const selectedGrants = Object.entries(data.grants ?? {})
      .filter(([, granted]) => granted)
      .map(([permission]) => permission);

    await addNewAccessKey({
      name: data.name,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      grants: selectedGrants,
    }).then(onAccessKeyCreated);
  };

  return (
    <Form
      schema={AccessKeyCreationSchema}
      {...form}
      className="flex min-w-64 flex-col overflow-auto"
      autoComplete={false}
      onSubmitSuccess={onSubmitSuccess}
    >
      <Form.Input
        name="name"
        label={nameInput.label.value}
        placeholder={nameInput.placeholder.value}
        required
      />
      <Form.Input
        name="expiresAt"
        label={expiresAtInput.label.value}
        placeholder={expiresAtInput.placeholder.value}
        type="datetime-local"
        min={new Date().toISOString()}
      />

      <div className="flex flex-col justify-center p-3">
        <Form.Label className="w-full" isRequired>
          {rights.label}
        </Form.Label>
        {permissions.map((permission) => (
          <Form.Checkbox
            key={permission}
            name={`grants.${permission}`}
            inputLabel={permission.split(':').join(' : ').toUpperCase()}
            color="text"
            defaultChecked={isDefaultGrant(permission)}
          />
        ))}
      </div>

      <Form.Button
        type="submit"
        label={createAccessKeyButton.label.value}
        color="text"
        isLoading={isSubmitting}
        className="w-full"
      >
        {createAccessKeyButton.text.value}
      </Form.Button>
    </Form>
  );
};
