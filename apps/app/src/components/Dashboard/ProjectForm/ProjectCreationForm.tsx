import type { ProjectAPI } from '@intlayer/backend-contract/project';
import { useAddProject } from '@intlayer/design-system/api';
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
  const form = useForm(ProjectSchema);
  const { nameInput, createProjectButton } = useIntlayer('project-form');

  const onSubmitSuccess = (data: ProjectFormData) =>
    addProject(data, {
      onSuccess: (result) => {
        // The backend already made it the active project.
        if (result.data) onProjectCreated?.(result.data);
      },
    });

  return (
    <Form onSubmitSuccess={onSubmitSuccess} form={form}>
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
        isLoading={isPending}
        label={createProjectButton.ariaLabel.value}
      >
        {createProjectButton.text}
      </FormButton>
    </Form>
  );
};
