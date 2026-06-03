import { useSession, useUpdateProject } from '@intlayer/design-system/api';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { FolderOpen } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { type ProjectFormData, useProjectSchema } from './useProjectFormSchema';

export const ProjectEditionForm: FC = () => {
  const { session } = useSession();
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const { project } = session ?? {};
  const ProjectSchema = useProjectSchema();
  const { mutate: updateProject, isPending } = useUpdateProject();
  const { form, isSubmitting } = useForm(ProjectSchema);
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
      <div className="mb-8 flex items-center gap-2">
        <FolderOpen className="size-4" />
        <H3 className="mb-0">{title}</H3>
      </div>

      <Form
        schema={ProjectSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="w-full"
        {...form}
      >
        <Form.Input
          name="name"
          id="project-edit-name"
          label={nameInput.label}
          placeholder={nameInput.placeholder.value}
          isRequired
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
