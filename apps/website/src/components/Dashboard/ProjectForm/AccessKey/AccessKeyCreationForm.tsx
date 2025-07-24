'use client';

import type { AddNewAccessKeyResponse } from '@intlayer/backend';
import { Form, useForm } from '@intlayer/design-system';
import { useAddNewAccessKey, useAuth } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  type AccessKeyFormCreationData,
  useAccessKeyCreationSchema,
} from './useAccessKeyCreationFormSchema';

type AccessKeyCreationFormProps = {
  onAccessKeyCreated: (response: AddNewAccessKeyResponse) => void;
};

export const AccessKeyCreationForm: FC<AccessKeyCreationFormProps> = ({
  onAccessKeyCreated,
}) => {
  const { isOrganizationAdmin, isProjectAdmin } = useAuth();
  const AccessKeyCreationSchema = useAccessKeyCreationSchema();
  const { addNewAccessKey } = useAddNewAccessKey();
  const { nameInput, expiresAtInput, rights, createAccessKeyButton } =
    useIntlayer('access-key-creation-form');
  const { form, isSubmitting } = useForm(AccessKeyCreationSchema);

  const onSubmitSuccess = async (data: AccessKeyFormCreationData) => {
    // Send a request to the backend to create the access key
    await addNewAccessKey({
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
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

      <div>
        <Form.Label className="w-full" isRequired>
          {rights.label}
        </Form.Label>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">{rights.read}</th>
              <th className="px-4 py-2">{rights.write}</th>
              <th className="px-4 py-2">{rights.admin}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-20 px-4">{rights.dictionary}</td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.dictionary.read"
                  color="text"
                  size="sm"
                />
              </td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.dictionary.write"
                  size="sm"
                  color="text"
                />
              </td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.dictionary.admin"
                  size="sm"
                  color="text"
                />
              </td>
            </tr>
            <tr>
              <td className="w-20 px-4">{rights.project}</td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.project.read"
                  size="sm"
                  color="text"
                />
              </td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.project.write"
                  size="sm"
                  color="text"
                  disabled={!isProjectAdmin}
                />
              </td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.project.admin"
                  size="sm"
                  color="text"
                  disabled={!isProjectAdmin}
                />
              </td>
            </tr>
            <tr>
              <td className="w-20 px-4">{rights.organization}</td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.organization.read"
                  size="sm"
                  color="text"
                />
              </td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.organization.write"
                  size="sm"
                  color="text"
                  disabled={!isOrganizationAdmin}
                />
              </td>
              <td className="w-20 px-4 py-2 text-center">
                <Form.Checkbox
                  name="rights.organization.admin"
                  size="sm"
                  color="text"
                  disabled={!isOrganizationAdmin}
                />
              </td>
            </tr>
          </tbody>
        </table>
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
