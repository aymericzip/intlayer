'use client';

import type { ProjectConfiguration } from '@intlayer/backend';
import {
  Form,
  H4,
  Modal,
  MultiSelect,
  Select,
  useForm,
} from '@intlayer/design-system';
import { useSession, useUpdateProject } from '@intlayer/design-system/hooks';
import { AiProviders } from '@intlayer/types';
import { getLocaleName, type Locale, Locales } from 'intlayer';
import { Save } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import {
  type ConfigFormData,
  useConfigFormSchema,
} from './useConfigFormSchema';

type ConfigEditionFormProps = {
  projectConfig: ProjectConfiguration;
  isOpen: boolean;
  onClose: () => void;
};

const allLocales = Object.values(Locales.ALL_LOCALES) as Locale[];
const allAiProviders = Object.values(AiProviders);

export const ConfigEditionForm: FC<ConfigEditionFormProps> = ({
  projectConfig,
  isOpen,
  onClose,
}) => {
  const { locale } = useLocale();
  const { session } = useSession();
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const ConfigSchema = useConfigFormSchema();
  const { mutate: updateProject, isPending } = useUpdateProject();
  const {
    title,
    i18nSection,
    editorSection,
    aiSection,
    saveButton,
    cancelButton,
  } = useIntlayer('config-edition-form');

  const defaultValues: ConfigFormData = {
    locales: (projectConfig?.internationalization?.locales as Locale[]) ?? [],
    defaultLocale: projectConfig?.internationalization?.defaultLocale as Locale,
    applicationURL: projectConfig?.editor?.applicationURL,
    cmsURL: projectConfig?.editor?.cmsURL,
    // AI Configuration
    aiProvider: projectConfig?.ai?.provider,
    aiModel: projectConfig?.ai?.model,
    aiTemperature: projectConfig?.ai?.temperature,
    aiApiKey: projectConfig?.ai?.apiKey,
    aiApplicationContext: projectConfig?.ai?.applicationContext,
  };

  const { form, isSubmitting } = useForm(ConfigSchema, {
    defaultValues,
  });

  const selectedLocales = form.watch('locales');

  useEffect(() => {
    if (projectConfig) {
      form.reset(defaultValues);
    }
  }, [form, projectConfig, defaultValues]);

  const onSubmitSuccess = (data: ConfigFormData) => {
    const configuration: ProjectConfiguration = {
      internationalization: {
        locales: data.locales as Locale[],
        defaultLocale: data.defaultLocale as Locale,
      },
      editor: {
        applicationURL: data.applicationURL!,
        cmsURL: data.cmsURL!,
      },
      ai: {
        provider: data.aiProvider,
        model: data.aiModel,
        temperature: data.aiTemperature,
        apiKey: data.aiApiKey,
        applicationContext: data.aiApplicationContext,
      },
    };

    updateProject(
      { configuration },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title.value}
      size="xl"
      padding="lg"
      className="w-2xl overflow-y-auto"
    >
      <Form
        schema={ConfigSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="flex flex-col gap-6 px-3 py-4"
        {...form}
      >
        {/* Internationalization Section */}
        <div className="flex flex-col gap-4">
          <H4>{i18nSection.title}</H4>

          <Form.MultiSelect
            name="locales"
            label={i18nSection.localesInput.label.value}
            description={i18nSection.localesInput.description.value}
            isRequired
            // disabled={!isProjectAdmin}
            onValueChange={(values) => {
              const valueArray = [values].flat();
              form.setValue('locales', valueArray as Locale[]);

              // If default locale is not in the new locales, reset it
              const currentDefault = form.getValues('defaultLocale');
              if (!valueArray.includes(currentDefault)) {
                form.setValue('defaultLocale', valueArray[0] as Locale);
              }
            }}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) =>
                getLocaleName(value as Locale, locale) ?? value
              }
            >
              <MultiSelect.Input
                placeholder={i18nSection.localesInput.placeholder.value}
              />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <MultiSelect.List>
                {allLocales.map((localeItem) => (
                  <MultiSelect.Item key={localeItem} value={localeItem}>
                    {getLocaleName(localeItem, locale)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Form.MultiSelect>

          <Form.Select
            name="defaultLocale"
            label={i18nSection.defaultLocaleInput.label.value}
            description={i18nSection.defaultLocaleInput.description.value}
            isRequired
            disabled={!isProjectAdmin}
          >
            <Select.Trigger>
              <Select.Value
                placeholder={i18nSection.defaultLocaleInput.placeholder.value}
              />
            </Select.Trigger>
            <Select.Content>
              {selectedLocales.map((localeItem) => (
                <Select.Item key={localeItem} value={localeItem}>
                  {getLocaleName(localeItem as Locale, locale)}
                </Select.Item>
              ))}
            </Select.Content>
          </Form.Select>
        </div>

        {/* Editor Section */}
        <div className="flex flex-col gap-4">
          <H4>{editorSection.title}</H4>

          <Form.Input
            name="applicationURL"
            label={editorSection.applicationURLInput.label.value}
            placeholder={editorSection.applicationURLInput.placeholder.value}
            description={editorSection.applicationURLInput.description.value}
            disabled={!isProjectAdmin}
          />

          <Form.Input
            name="cmsURL"
            label={editorSection.cmsURLInput.label.value}
            placeholder={editorSection.cmsURLInput.placeholder.value}
            description={editorSection.cmsURLInput.description.value}
            disabled={!isProjectAdmin}
          />
        </div>

        {/* AI Section */}
        <div className="flex flex-col gap-4">
          <H4>{aiSection.title}</H4>

          <Form.Select
            name="aiProvider"
            label={aiSection.providerInput.label.value}
            description={aiSection.providerInput.description.value}
            disabled={!isProjectAdmin}
          >
            <Select.Trigger>
              <Select.Value
                placeholder={aiSection.providerInput.placeholder.value}
              />
            </Select.Trigger>
            <Select.Content>
              {allAiProviders.map((provider) => (
                <Select.Item key={provider} value={provider}>
                  {provider}
                </Select.Item>
              ))}
            </Select.Content>
          </Form.Select>

          <Form.Input
            name="aiModel"
            label={aiSection.modelInput.label.value}
            placeholder={aiSection.modelInput.placeholder.value}
            description={aiSection.modelInput.description.value}
            disabled={!isProjectAdmin}
          />

          <Form.Input
            name="aiTemperature"
            type="number"
            step={0.1}
            min={0}
            max={2}
            label={aiSection.temperatureInput.label.value}
            placeholder={aiSection.temperatureInput.placeholder.value}
            description={aiSection.temperatureInput.description.value}
            disabled={!isProjectAdmin}
          />

          <Form.Input
            name="aiApiKey"
            type="password"
            label={aiSection.apiKeyInput.label.value}
            placeholder={aiSection.apiKeyInput.placeholder.value}
            description={aiSection.apiKeyInput.description.value}
            disabled={!isProjectAdmin}
          />

          <Form.AutoSizedTextArea
            name="aiApplicationContext"
            label={aiSection.applicationContextInput.label.value}
            placeholder={aiSection.applicationContextInput.placeholder.value}
            description={aiSection.applicationContextInput.description.value}
            disabled={!isProjectAdmin}
          />
        </div>

        {/* Action Buttons */}
        {isProjectAdmin && (
          <div className="mt-4 flex justify-end gap-3 max-md:flex-col">
            <Form.Button
              variant="outline"
              label={cancelButton.ariaLabel.value}
              color="text"
              type="button"
              onClick={onClose}
            >
              {cancelButton.text}
            </Form.Button>
            <Form.Button
              label={saveButton.ariaLabel.value}
              color="text"
              type="submit"
              isLoading={isSubmitting || isPending}
              Icon={Save}
            >
              {saveButton.text}
            </Form.Button>
          </div>
        )}
      </Form>
    </Modal>
  );
};
