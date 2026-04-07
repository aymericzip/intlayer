'use client';

import {
  useGetProjects,
  useSelectProject,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProjectForm } from '#components/Dashboard/ProjectForm';

export const ProjectAdminDetailPage = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { data, isLoading } = useGetProjects({
    ids: projectId,
    fetchAll: 'true',
  });
  const { mutate: selectProject, isPending } = useSelectProject();
  const { noProjectFound } = useIntlayer('project-admin-page');

  const project = (data?.data ?? [])[0];

  useEffect(() => {
    if (project) {
      selectProject(project.id);
    }
  }, [project, selectProject]);

  return (
    <Loader isLoading={isLoading || isPending}>
      {project ? (
        <ProjectForm />
      ) : (
        <div className="py-12 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            {noProjectFound}
          </p>
        </div>
      )}
    </Loader>
  );
};

export default ProjectAdminDetailPage;
