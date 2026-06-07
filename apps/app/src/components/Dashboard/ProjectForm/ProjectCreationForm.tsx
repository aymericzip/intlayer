import type { ProjectAPI } from '@intlayer/backend';
import { useAddProject, useSelectProject } from '@intlayer/design-system/api';
import {
  Form,
  FormButton,
  FormInput,
  useForm,
} from '@intlayer/design-system/form';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
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
      onSuccess: (result: any) => {
        const projectId = String(result.data?.id);

        if (result.data) {
          selectProject(projectId);

          onProjectCreated?.(result.data);
        }
      },
    });

  return (
    <Form schema={ProjectSchema} onSubmitSuccess={onSubmitSuccess} {...form}>
      <FormInput
        name="name"
        id="project-name-input"
        label={nameInput.label.value}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <FormButton
        className="mt-4 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting || isPending}
        label={createProjectButton.ariaLabel.value}
      >
        {createProjectButton.text}
      </FormButton>
    </Form>
  );
};
