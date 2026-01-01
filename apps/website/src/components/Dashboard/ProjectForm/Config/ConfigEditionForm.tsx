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
import { getLocaleName, type Locale, Locales } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useEffect, useMemo } from 'react';
import {
  type ConfigFormData,
  useConfigFormSchema,
} from './useConfigFormSchema';

type ConfigEditionFormProps = {
  projectConfig?: ProjectConfiguration;
  isOpen: boolean;
  onClose: () => void;
};

const allLocales = Object.values(Locales) as Locale[];

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
  const { title, i18nSection, editorSection, saveButton, cancelButton } =
    useIntlayer('config-edition-form');

  const defaultValues: ConfigFormData = useMemo(
    () => ({
      locales: (projectConfig?.internationalization?.locales as Locale[]) ?? [
        Locales.ENGLISH,
      ],
      defaultLocale:
        (projectConfig?.internationalization?.defaultLocale as Locale) ??
        Locales.ENGLISH,
      applicationURL: projectConfig?.editor?.applicationURL ?? '',
      cmsURL: projectConfig?.editor?.cmsURL ?? '',
    }),
    [projectConfig]
  );

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
    <Modal isOpen={isOpen} onClose={onClose} title={title.value} size="lg">
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
            >
              {saveButton.text}
            </Form.Button>
          </div>
        )}
      </Form>
    </Modal>
  );
};
