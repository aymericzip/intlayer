import type { ProjectAPI } from '@intlayer/backend';
import { Button } from '@intlayer/design-system';
import { useSelectProject } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ProjectListProps = {
  projects: ProjectAPI[];
};

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const { selectProject } = useSelectProject();
  const router = useRouter();

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId).then(() =>
      router.push(PagesRoutes.Dashboard_Content)
    );
  };

  return (
    <div className="flex w-full max-w-[350px] gap-3">
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
