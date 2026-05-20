import type { AddNewAccessKeyResponse } from '@intlayer/backend';
import { Select } from '@intlayer/design-system';
import { Form, useForm } from '@intlayer/design-system/form';
import { useAddNewAccessKey, useSession } from '@intlayer/design-system/hooks';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
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

type ExpirationPreset =
  | '1d'
  | '3d'
  | '1m'
  | '3m'
  | '1y'
  | '3y'
  | 'custom'
  | 'none';

const computeExpiresAt = (preset: ExpirationPreset): string | undefined => {
  const now = new Date();
  switch (preset) {
    case '1d':
      return new Date(now.setDate(now.getDate() + 1))
        .toISOString()
        .slice(0, 16);
    case '3d':
      return new Date(now.setDate(now.getDate() + 3))
        .toISOString()
        .slice(0, 16);
    case '1m':
      return new Date(now.setMonth(now.getMonth() + 1))
        .toISOString()
        .slice(0, 16);
    case '3m':
      return new Date(now.setMonth(now.getMonth() + 3))
        .toISOString()
        .slice(0, 16);
    case '1y':
      return new Date(now.setFullYear(now.getFullYear() + 1))
        .toISOString()
        .slice(0, 16);
    case '3y':
      return new Date(now.setFullYear(now.getFullYear() + 3))
        .toISOString()
        .slice(0, 16);
    default:
      return undefined;
  }
};

export const AccessKeyCreationForm: FC<AccessKeyCreationFormProps> = ({
  onAccessKeyCreated,
}) => {
  /** ------------------------------------------------------------------ hooks */
  const { session } = useSession();
  const [expirationPreset, setExpirationPreset] =
    useState<ExpirationPreset>('none');

  const permissions = session?.permissions ?? [];
  const { mutate: addNewAccessKey, isPending } = useAddNewAccessKey();
  const {
    nameInput,
    expiresAtInput,
    rights,
    createAccessKeyButton,
    expirationPresets,
  } = useIntlayer('access-key-creation-form');

  const EXPIRATION_PRESETS = [
    { value: 'none' as const, label: expirationPresets.none.value },
    { value: '1d' as const, label: expirationPresets['1d'].value },
    { value: '3d' as const, label: expirationPresets['3d'].value },
    { value: '1m' as const, label: expirationPresets['1m'].value },
    { value: '3m' as const, label: expirationPresets['3m'].value },
    { value: '1y' as const, label: expirationPresets['1y'].value },
    { value: '3y' as const, label: expirationPresets['3y'].value },
    { value: 'custom' as const, label: expirationPresets.custom.value },
  ];

  const AccessKeyCreationSchema = useAccessKeyCreationSchema(permissions);

  const defaultValues = {
    grants: getDefaultGrants(permissions),
  };

  const { form, isSubmitting } = useForm(AccessKeyCreationSchema, {
    defaultValues,
  });

  // Don't render the form until the session (and its permissions) is loaded
  if (!session) return null;

  /** -------------------------------------------------------- form handlers */
  const handlePresetChange = (value: string) => {
    const preset = value as ExpirationPreset;
    setExpirationPreset(preset);
    form.setValue(
      'expiresAt',
      preset !== 'custom' ? computeExpiresAt(preset) : undefined
    );
  };

  const onSubmitSuccess = (data: AccessKeyFormCreationData) => {
    const selectedGrants = Object.entries(data.grants ?? {})
      .filter(([, granted]) => granted)
      .map(([permission]) => permission);

    addNewAccessKey(
      {
        name: data.name,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        grants: selectedGrants,
      },
      {
        onSuccess: (response) => {
          onAccessKeyCreated(response);
        },
      }
    );
  };

  return (
    <Form
      schema={AccessKeyCreationSchema}
      {...form}
      className="flex min-w-64 flex-col"
      autoComplete={false}
      onSubmitSuccess={onSubmitSuccess}
    >
      <Form.Input
        name="name"
        id="access-key-name-input"
        label={nameInput.label.value}
        placeholder={nameInput.placeholder.value}
        required
      />

      {/* Expiration preset — not a form field, purely UI */}
      <div className="flex w-full flex-col flex-wrap gap-2 px-1 py-2">
        <div className="flex max-w-full flex-col gap-1 p-1 leading-none">
          <div className="ml-1 flex gap-1 align-middle text-base leading-none">
            <label
              htmlFor="access-key-expires-at-preset"
              className="mb-2 select-none font-bold text-sm leading-none"
            >
              {expiresAtInput.label.value}
            </label>
          </div>
        </div>
        <Select value={expirationPreset} onValueChange={handlePresetChange}>
          <Select.Trigger id="access-key-expires-at-preset">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {EXPIRATION_PRESETS.map(({ value, label }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      {expirationPreset === 'custom' && (
        <Form.Input
          name="expiresAt"
          id="access-key-expires-at-input"
          placeholder={expiresAtInput.placeholder.value}
          type="datetime-local"
          min={new Date().toISOString().slice(0, 16)}
        />
      )}

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
        isLoading={isSubmitting || isPending}
        className="w-full"
      >
        {createAccessKeyButton.text.value}
      </Form.Button>
    </Form>
  );
};
