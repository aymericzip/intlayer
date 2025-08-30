'use client';

import { PagesRoutes } from '@/Routes';
import type { ProjectAPI } from '@intlayer/backend';
import { Button } from '@intlayer/design-system';
import { useSelectProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

type ProjectListProps = {
  projects: ProjectAPI[];
};

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const { selectButton } = useIntlayer('project-list');
  const { mutate: selectProject } = useSelectProject();
  const router = useRouter();

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId, {
      onSuccess: () => {
        router.push(PagesRoutes.Dashboard_Content);
      },
    });
  };

  return (
    <ul className="flex w-full flex-wrap gap-3">
      {projects.map((project) => (
        <li
          className="border-neutral flex w-full flex-col gap-3 rounded-lg border p-6"
          key={String(project.id)}
        >
          <h2 className="font-bold">{project.name}</h2>
          <Button
            onClick={() => handleSelectProject(String(project.id))}
            label={selectButton.label.value}
            color="text"
          >
            {selectButton.text}
          </Button>
        </li>
      ))}
    </ul>
  );
};
