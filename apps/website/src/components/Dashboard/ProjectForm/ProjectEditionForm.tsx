'use client';

import { useForm, Form, useToast, useAuth } from '@intlayer/design-system';
import { useUpdateProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getProjectSchema, type ProjectFormData } from './ProjectFormSchema';

export const ProjectEditionForm: FC = () => {
  const { session, checkSession } = useAuth();
  const { project } = session ?? {};
  const SignInSchema = getProjectSchema();
  const { updateProject } = useUpdateProject();
  const { form, isSubmitting } = useForm(SignInSchema);
  const { nameInput, editButton, updateProjectToasts } =
    useIntlayer('project-form');
  const { toast } = useToast();

  const onSubmitSuccess = async (data: ProjectFormData) => {
    await updateProject(data)
      .then(async () => {
        toast({
          title: updateProjectToasts.projectUpdated.title.value,
          description: updateProjectToasts.projectUpdated.description.value,
          variant: 'success',
        });

        await checkSession();
      })
      .catch((error) => {
        toast({
          title: updateProjectToasts.projectUpdateFailed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  return (
    <Form
      schema={SignInSchema}
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
      />

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={editButton.ariaLabel.value}
      >
        {editButton.text}
      </Form.Button>
    </Form>
  );
};
