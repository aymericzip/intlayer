'use client';

import { Loader, Modal, useAuth } from '@intlayer/design-system';
import { useGetProjects } from '@intlayer/design-system/hooks';
import { Suspense, use, useState, type FC } from 'react';
import { NoProjectView } from './NoProjectView';
import { ProjectCreationForm } from './ProjectCreationForm';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';

export const ProjectFormContent: FC = () => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { getProjects } = useGetProjects();
  const projects = use(getProjects());

  if (project) {
    return <ProjectEditionForm />;
  }

  if (projects.data?.length === 0) {
    return <ProjectList projects={projects.data} />;
  }

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
};

export const OrganizationForm: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProjectFormContent />
    </Suspense>
  );
};
