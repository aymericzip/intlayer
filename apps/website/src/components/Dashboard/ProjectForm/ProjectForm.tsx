'use client';

import {
  Button,
  Container,
  Loader,
  Modal,
  useAuth,
} from '@intlayer/design-system';
import { useGetProjects } from '@intlayer/design-system/hooks';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { Suspense, useState, type FC } from 'react';
import { AccessKeyForm } from './AccessKey/AccessKeyForm';
import { ConfigDetails } from './Config/ConfigDetails';
import { MembersForm } from './Members/MembersKeyForm';
import { NoProjectView } from './NoProjectView';
import { ProjectCreationForm } from './ProjectCreationForm';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';

export const ProjectFormContent: FC = () => {
  const { session, isProjectAdmin } = useAuth();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { data: projects, isWaitingData, isSuccess } = useGetProjects();
  const { noAdminMessage, createProjectButton } = useIntlayer('project-form');

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
          className="z-20 flex size-full justify-center p-6"
        >
          <ProjectEditionForm />
        </Container>
        <Container
          roundedSize="xl"
          className="z-20 flex size-full justify-center p-6"
        >
          <ConfigDetails projectConfig={project.configuration} />
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

  if ((projects?.data ?? []).length > 0) {
    return (
      <div className="flex flex-col gap-6">
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <ProjectCreationForm />
        </Modal>
        <ProjectList projects={projects?.data ?? []} />
        <Button
          type="submit"
          color="text"
          label={createProjectButton.ariaLabel.value}
          isFullWidth
          variant="outline"
          onClick={() => setIsCreationModalOpen(true)}
          Icon={Plus}
        >
          {createProjectButton.text}
        </Button>
      </div>
    );
  }

  if (isSuccess && !isWaitingData) {
    return (
      <Container roundedSize="xl" className="flex justify-center p-6">
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <ProjectCreationForm />
        </Modal>

        <NoProjectView
          onClickCreateProject={() => setIsCreationModalOpen(true)}
        />
      </Container>
    );
  }

  return <Loader />;
};

export const ProjectForm: FC = () => (
  <Suspense fallback={<Loader />}>
    <ProjectFormContent />
  </Suspense>
);
