import { Button, Form, H2, Modal, useForm } from '@intlayer/design-system';
import { useUpdateShowcaseProject } from '@intlayer/design-system/hooks';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { ShowcaseProject } from '#/utils/projectActions/types';
import { ProjectFormFields } from '@/components/SubmitProjectForm/ProjectFormFields';
import type { SubmitProjectFormData } from '@/components/SubmitProjectForm/useSubmitProjectFormSchema';
import { useSubmitProjectFormSchema } from '@/components/SubmitProjectForm/useSubmitProjectFormSchema';

interface EditProjectModalProps {
  project: ShowcaseProject;
  onClose: () => void;
  onUpdated: (project: ShowcaseProject) => void;
}

export const EditProjectModal = ({
  project,
  onClose,
  onUpdated,
}: EditProjectModalProps) => {
  const content = useIntlayer('edit-project-modal');

  const { mutateAsync: updateShowcaseProject } = useUpdateShowcaseProject();
  const schema = useSubmitProjectFormSchema();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { form, isSubmitting } = useForm(schema, {
    defaultValues: {
      name: project.title,
      url: project.websiteUrl,
      githubUrl: project.githubUrl ?? '',
      tagline: project.description,
      description: '',
      useCases: project.tags ?? [],
    },
  });

  const onSubmit = async (data: SubmitProjectFormData) => {
    setError(null);

    try {
      const result = await updateShowcaseProject({
        projectId: project._id ?? (project as any).id,
        name: data.name,
        url: data.url,
        githubUrl: data.githubUrl,
        tagline: data.tagline,
        description: data.description,
        useCases: data.useCases,
      });

      if (result.data) {
        setSuccess(true);
        onUpdated(result.data as unknown as ShowcaseProject);
      } else {
        setError(content.failedToUpdateProject.value);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : content.failedToUpdateProject.value
      );
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="lg"
      hasCloseButton
      title={content.editProject.value}
      isScrollable
      disableScroll
    >
      <div className="px-4 py-6">
        {success ? (
          <div className="flex flex-col items-center gap-4">
            <H2>{content.projectUpdated}</H2>
            <div className="m-auto aspect-square rounded-full bg-success/30 p-5">
              <Check className="text-success" size={40} />
            </div>
            <Button
              color="text"
              Icon={Check}
              onClick={onClose}
              isFullWidth
              className="mt-6"
              label={content.close.value}
            >
              {content.close}
            </Button>
          </div>
        ) : (
          <Form
            schema={schema}
            onSubmitSuccess={onSubmit}
            className="space-y-1"
            {...form}
          >
            <ProjectFormFields form={form} />
            {error && <p className="text-error text-sm">{error}</p>}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="hoverable"
                color="neutral"
                onClick={onClose}
                label={content.cancel.value}
                Icon={X}
                className="flex-1"
              >
                {content.cancel}
              </Button>
              <Form.Button
                type="submit"
                color="text"
                isLoading={isSubmitting}
                label={content.saveChanges.value}
                Icon={Check}
                className="flex-1"
              >
                {content.saveChanges}
              </Form.Button>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
};
