'use client';

import { Form, H3, useForm } from '@intlayer/design-system';
import { useSession, useUpdateProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { type ProjectFormData, useProjectSchema } from './useProjectFormSchema';

export const ProjectEditionForm: FC = () => {
  const { session } = useSession();
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const { project } = session ?? {};
  const ProjectSchema = useProjectSchema();
  const { mutate: updateProject, isPending } = useUpdateProject();
  const { form, isSubmitting } = useForm(ProjectSchema, {
    defaultValues: project ?? undefined,
  });
  const { title, nameInput, editButton } = useIntlayer('project-form');

  const onSubmitSuccess = (data: ProjectFormData) => {
    if (project?.id) {
      updateProject({ ...data, id: project.id });
    }
  };

  useEffect(() => {
    if (project) {
      form.reset(project);
    }
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

        {isProjectAdmin && (
          <Form.Button
            className="mt-12 w-full"
            type="submit"
            color="text"
            isLoading={isSubmitting || isPending}
            label={editButton.ariaLabel.value}
          >
            {editButton.text}
          </Form.Button>
        )}
      </Form>
    </>
  );
};
