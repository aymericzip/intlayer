'use client';

import type { ProjectAPI } from '@intlayer/backend';
import { Form, useForm } from '@intlayer/design-system';
import { useAddProject, useSelectProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { type ProjectFormData, useProjectSchema } from './useProjectFormSchema';

type ProjectCreationFormProps = {
  onProjectCreated?: (project: ProjectAPI) => void;
};

export const ProjectCreationForm: FC<ProjectCreationFormProps> = ({
  onProjectCreated,
}) => {
  const ProjectSchema = useProjectSchema();
  const { mutate: addProject, isPending } = useAddProject();
  const { mutate: selectProject } = useSelectProject();
  const { form, isSubmitting } = useForm(ProjectSchema);
  const { nameInput, createProjectButton } = useIntlayer('project-form');

  const onSubmitSuccess: (data: ProjectFormData) => Promise<void> = (data) =>
    addProject(data, {
      onSuccess: (result) => {
        const projectId = String(result.data?.id);

        if (result.data) {
          selectProject(projectId);

          onProjectCreated?.(result.data);
        }
      },
    });

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
        isLoading={isSubmitting || isPending}
        label={createProjectButton.ariaLabel.value}
      >
        {createProjectButton.text}
      </Form.Button>
    </Form>
  );
};
