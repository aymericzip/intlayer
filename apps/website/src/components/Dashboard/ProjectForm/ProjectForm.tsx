'use client';

import type { Project } from '@intlayer/backend';
import { Container, Loader, Modal, useAuth } from '@intlayer/design-system';
import { useGetProjects } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { Suspense, useEffect, useState, type FC } from 'react';
import { AccessKeyForm } from './AccessKey/AccessKeyForm';
import { MembersForm } from './Members/MembersKeyForm';
import { NoProjectView } from './NoProjectView';
import { ProjectCreationForm } from './ProjectCreationForm';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';

export const ProjectFormContent: FC = () => {
  const { session, isProjectAdmin } = useAuth();
  const { project, organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { getProjects, isLoading, isSuccess } = useGetProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const { noAdminMessage } = useIntlayer('project-form');

  useEffect(() => {
    getProjects().then((response) => {
      setProjects(response.data ?? []);
    });
  }, [getProjects, organization?._id]);

  if (project) {
    return (
      <div className="flex size-full max-w-[500px] flex-col items-center justify-center gap-4">
        {!isProjectAdmin && (
          <Container
            roundedSize="xl"
            className="flex size-full justify-center p-6"
          >
            <p className="text-neutral dark:text-neutral-dark text-sm">
              {noAdminMessage}
            </p>
          </Container>
        )}

        <Container
          roundedSize="xl"
          className="flex size-full justify-center p-6"
        >
          <ProjectEditionForm />
        </Container>
        <Container
          roundedSize="xl"
          className="z-10 flex size-full justify-center p-6"
        >
          <MembersForm />
        </Container>
        <Container
          roundedSize="xl"
          className="flex size-full justify-center p-6"
        >
          <AccessKeyForm />
        </Container>
      </div>
    );
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
