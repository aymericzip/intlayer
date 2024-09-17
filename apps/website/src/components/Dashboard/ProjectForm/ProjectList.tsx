import type { Project } from '@intlayer/backend';
import { Button } from '@intlayer/design-system';
import { useSelectProject } from '@intlayer/design-system/hooks';
import type { FC } from 'react';

type ProjectListProps = {
  projects: Project[];
};

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const { selectProject } = useSelectProject();

  return (
    <div>
      {projects.map((project) => (
        <div className="border-text" key={String(project._id)}>
          <h2 className="font-bold">{project.name}</h2>
          <Button
            onClick={() => selectProject(project._id)}
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
