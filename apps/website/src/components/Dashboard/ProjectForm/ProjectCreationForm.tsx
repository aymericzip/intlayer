'use client';

import { useForm, Form, useToast, useUser } from '@intlayer/design-system';
import { useAddProject, useSelectProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getProjectSchema, type ProjectFormData } from './ProjectFormSchema';

export const ProjectCreationForm: FC = () => {
  const SignInSchema = getProjectSchema();
  const { checkSession } = useUser();
  const { addProject } = useAddProject();
  const { selectProject } = useSelectProject();
  const { form, isSubmitting } = useForm(SignInSchema);
  const {
    nameInput,
    createProjectButton,
    createProjectToasts,
    selectProjectToasts,
  } = useIntlayer('project-form');
  const { toast } = useToast();

  const onSubmitSuccess: (data: ProjectFormData) => Promise<void> = async (
    data
  ) => {
    await addProject(data)
      .then(async (result) => {
        toast({
          title: createProjectToasts.projectCreated.title.value,
          description: createProjectToasts.projectCreated.description.value,
          variant: 'success',
        });

        const projectId = String(result.data?._id);

        await selectProject(projectId)
          .then(async () => {
            toast({
              title: selectProjectToasts.projectSelected.title.value,
              description:
                selectProjectToasts.projectSelected.description.value,
              variant: 'success',
            });

            await checkSession();
          })
          .catch((error) => {
            toast({
              title: selectProjectToasts.projectSelectionFailed.title.value,
              description: error.message,
              variant: 'error',
            });
          });
      })
      .catch((error) => {
        toast({
          title: createProjectToasts.projectCreationFailed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  return (
    <Form
      schema={SignInSchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px]"
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
