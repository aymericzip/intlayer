import type { AddNewAccessKeyResponse } from '@intlayer/backend';
import { useAddNewAccessKey, useSession } from '@intlayer/design-system/api';
import { Form, useForm } from '@intlayer/design-system/form';
import { Checkbox, Radio } from '@intlayer/design-system/input';
import { Select } from '@intlayer/design-system/select';
import type { Locale } from '@intlayer/types/allLocales';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocaleCheckboxList } from '#components/LocalePicker/LocaleCheckboxList';
import {
  type AccessKeyFormCreationData,
  useAccessKeyCreationSchema,
} from './useAccessKeyCreationFormSchema';

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
  const { session } = useSession();
  const [expirationPreset, setExpirationPreset] =
    useState<ExpirationPreset>('none');

  const [restrictEnvironments, setRestrictEnvironments] = useState(false);
  const [selectedEnvIds, setSelectedEnvIds] = useState<(string | null)[]>([]);

  const [restrictLocales, setRestrictLocales] = useState(false);
  const [selectedLocales, setSelectedLocales] = useState<Locale[]>([]);

  const permissions = session?.permissions ?? [];
  const { mutate: addNewAccessKey, isPending } = useAddNewAccessKey();
  const {
    nameInput,
    expiresAtInput,
    rights,
    createAccessKeyButton,
    expirationPresets,
    environmentScope,
    allEnvironments,
    restrictToSpecificEnvironments,
    localeScope,
    allLocales,
    restrictToSpecificLocales,
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
  const { form, isSubmitting } = useForm(AccessKeyCreationSchema, {
    defaultValues: { grants: getDefaultGrants(permissions) },
  });

  if (!session) return null;

  const environments = session.project?.environments ?? [];
  const locales = (session.project?.configuration?.internationalization
    ?.locales ?? []) as Locale[];
  const hasMultipleEnvs = environments.length > 1;
  const hasMultipleLocales = locales.length > 1;

  const handlePresetChange = (value: string) => {
    const preset = value as ExpirationPreset;
    setExpirationPreset(preset);
    form.setValue(
      'expiresAt',
      preset !== 'custom' ? computeExpiresAt(preset) : undefined
    );
  };

  const toggleEnvId = (envId: string | null) => {
    setSelectedEnvIds((prev) =>
      prev.some((id) => (id === null ? envId === null : id === envId))
        ? prev.filter((id) => (id === null ? envId !== null : id !== envId))
        : [...prev, envId]
    );
  };

  const toggleLocale = (locale: string) => {
    const loc = locale as Locale;
    setSelectedLocales((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
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
        allowedEnvironmentIds: restrictEnvironments ? selectedEnvIds : null,
        allowedLocales: restrictLocales ? selectedLocales : null,
      },
      { onSuccess: (response: any) => onAccessKeyCreated(response) }
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

      {/* Expiration preset */}
      <div className="flex w-full flex-col flex-wrap gap-2 px-1 py-2">
        <div className="flex max-w-full flex-col gap-1 p-1 leading-none">
          <label
            htmlFor="access-key-expires-at-preset"
            className="mb-2 ml-1 select-none font-bold text-sm leading-none"
          >
            {expiresAtInput.label.value}
          </label>
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

      {/* Permissions */}
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

      {/* Environment scope */}
      {hasMultipleEnvs && (
        <div className="flex flex-col gap-3 p-3">
          <Form.Label className="w-full">{environmentScope}</Form.Label>
          <Radio
            id="env-scope-all"
            name="envRestrict"
            checked={!restrictEnvironments}
            onChange={() => setRestrictEnvironments(false)}
            label={allEnvironments}
            color="text"
            size="sm"
          />
          <Radio
            id="env-scope-specific"
            name="envRestrict"
            checked={restrictEnvironments}
            onChange={() => setRestrictEnvironments(true)}
            label={restrictToSpecificEnvironments}
            color="text"
            size="sm"
          />
          {restrictEnvironments && (
            <div className="ml-6 flex flex-col gap-2">
              {environments.map((env) => {
                const envId = env.id === 'production' ? null : env.id;
                const isChecked = selectedEnvIds.some((id) =>
                  id === null ? envId === null : id === envId
                );
                return (
                  <Checkbox
                    name={`env-scope-${envId ?? 'null'}`}
                    key={String(env.id)}
                    checked={isChecked}
                    onChange={() => toggleEnvId(envId)}
                    label={`${env.name}${env.isDefault ? ' ★' : ''}`}
                    color="text"
                    size="sm"
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Locale scope */}
      {hasMultipleLocales && (
        <div className="flex flex-col gap-3 p-3">
          <Form.Label className="w-full">{localeScope}</Form.Label>
          <Radio
            id="locale-scope-all"
            name="localeRestrict"
            checked={!restrictLocales}
            onChange={() => setRestrictLocales(false)}
            label={allLocales}
            color="text"
            size="sm"
          />
          <Radio
            id="locale-scope-specific"
            name="localeRestrict"
            checked={restrictLocales}
            onChange={() => setRestrictLocales(true)}
            label={restrictToSpecificLocales}
            color="text"
            size="sm"
          />
          {restrictLocales && (
            <div className="ml-6">
              <LocaleCheckboxList
                locales={locales}
                selectedLocales={selectedLocales}
                onChange={toggleLocale}
              />
            </div>
          )}
        </div>
      )}

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
