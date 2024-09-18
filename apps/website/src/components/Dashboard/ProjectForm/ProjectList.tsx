import type { Project } from '@intlayer/backend';
import { Button, toast, useAuth } from '@intlayer/design-system';
import { useSelectProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type ProjectListProps = {
  projects: Project[];
};

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const { selectProject } = useSelectProject();
  const { checkSession } = useAuth();
  const { selectProjectToasts } = useIntlayer('project-form');

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId)
      .then(async () => {
        toast({
          title: selectProjectToasts.projectSelected.title.value,
          description: selectProjectToasts.projectSelected.description.value,
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
  };

  return (
    <div className="w-full max-w-[350px]">
      {projects.map((project) => (
        <div
          className="border-neutral dark:border-neutral-dark flex w-full flex-col gap-3 rounded-lg border p-6"
          key={String(project._id)}
        >
          <h2 className="font-bold">{project.name}</h2>
          <Button
            onClick={() => handleSelectProject(String(project._id))}
            label="Select"
            color="text"
          >
            Select
          </Button>
        </div>
      ))}
    </div>
  );
};
