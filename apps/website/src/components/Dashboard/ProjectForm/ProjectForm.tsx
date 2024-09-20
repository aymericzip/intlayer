'use client';

import type { Project } from '@intlayer/backend';
import { Loader, Modal, useAuth } from '@intlayer/design-system';
import { useGetProjects } from '@intlayer/design-system/hooks';
import { Suspense, useEffect, useState, type FC } from 'react';
import { NoProjectView } from './NoProjectView';
import { ProjectCreationForm } from './ProjectCreationForm';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';

export const ProjectFormContent: FC = () => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { getProjects, isLoading, isSuccess } = useGetProjects();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects({}).then((response) => {
      setProjects(response.data ?? []);
    });
  }, [getProjects]);

  if (project) {
    return <ProjectEditionForm />;
  }

  if (projects?.length > 0) {
    return <ProjectList projects={projects} />;
  }

  if (isSuccess && !isLoading) {
    return (
      <>
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <ProjectCreationForm />
        </Modal>

        <NoProjectView
          onClickCreateProject={() => setIsCreationModalOpen(true)}
        />
      </>
    );
  }

  return <Loader />;
};

export const ProjectForm: FC = () => (
  <Suspense fallback={<Loader />}>
    <ProjectFormContent />
  </Suspense>
);
