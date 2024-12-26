'use client';

import {
  useForm,
  Form,
  useAuth,
  H3,
  MultiSelect,
} from '@intlayer/design-system';
import { useUpdateProject } from '@intlayer/design-system/hooks';
import { getLocaleName, Locales } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useEffect, type FC } from 'react';
import { useProjectSchema, type ProjectFormData } from './useProjectFormSchema';

export const ProjectEditionForm: FC = () => {
  const { session, isProjectAdmin } = useAuth();
  const { project } = session ?? {};
  const { locale } = useLocale();
  const ProjectSchema = useProjectSchema();
  const { updateProject } = useUpdateProject();
  const { form, isSubmitting } = useForm(ProjectSchema, {
    defaultValues: project ?? undefined,
  });
  const { title, nameInput, localeSelect, editButton } =
    useIntlayer('project-form');

  const onSubmitSuccess = async (data: ProjectFormData) => {
    await updateProject({ ...data, _id: project?._id });
  };

  useEffect(() => {
    if (project) {
      form.reset(project);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.reset, project]);

  return (
    <>
      <H3 className="mb-8"> {title}</H3>

      <Form
        schema={ProjectSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="w-full"
        {...form}
      >
        <Form.Input
          name="name"
          label={nameInput.label}
          placeholder={nameInput.placeholder.value}
          isRequired
          defaultValue={project?.name}
          disabled={!isProjectAdmin}
        />

        <Form.MultiSelect
          name="locales"
          label={localeSelect.label.value}
          description={localeSelect.description.value}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) => getLocaleName(value as Locales, locale)}
          >
            <MultiSelect.Input placeholder={localeSelect.placeholder.value} />
          </MultiSelect.Trigger>
          <MultiSelect.Content>
            <MultiSelect.List>
              {Object.values(Locales).map((localeItem) => (
                <MultiSelect.Item
                  key={String(localeItem)}
                  value={String(localeItem)}
                >
                  {getLocaleName(localeItem, locale)}
                </MultiSelect.Item>
              ))}
            </MultiSelect.List>
          </MultiSelect.Content>
        </Form.MultiSelect>

        {isProjectAdmin && (
          <Form.Button
            className="mt-12 w-full"
            type="submit"
            color="text"
            isLoading={isSubmitting}
            label={editButton.ariaLabel.value}
          >
            {editButton.text}
          </Form.Button>
        )}
      </Form>
    </>
  );
};
