'use client';

import { useForm, Form } from '@intlayer/design-system';
import { useAddProject, useSelectProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useProjectSchema, type ProjectFormData } from './useProjectFormSchema';

export const ProjectCreationForm: FC = () => {
  const ProjectSchema = useProjectSchema();
  const { addProject } = useAddProject();
  const { selectProject } = useSelectProject();
  const { form, isSubmitting } = useForm(ProjectSchema);
  const { nameInput, createProjectButton } = useIntlayer('project-form');

  const onSubmitSuccess: (data: ProjectFormData) => Promise<void> = async (
    data
  ) => {
    await addProject(data).then(async (result) => {
      const projectId = String(result.data?._id);

      await selectProject(projectId);
    });
  };

  return (
    <Form
      schema={ProjectSchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px] py-10"
      {...form}
    >
      <Form.Input
        name="name"
        label={nameInput.label}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createProjectButton.ariaLabel.value}
      >
        {createProjectButton.text}
      </Form.Button>
    </Form>
  );
};
