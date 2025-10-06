'use client';

import { Button, Container, Loader, Modal } from '@intlayer/design-system';
import { useGetProjects, useSession } from '@intlayer/design-system/hooks';
import { Plus, Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { AccessKeyForm } from './AccessKey/AccessKeyForm';
import { ConfigDetails } from './Config/ConfigDetails';
import { DeleteProjectModal } from './DeleteProjectModal';
import { MembersForm } from './Members/MembersKeyForm';
import { NoProjectView } from './NoProjectView';
import { ProjectCreationForm } from './ProjectCreationForm';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';

export const ProjectFormContent: FC = () => {
  const { session } = useSession();

  const isProjectAdmin = session?.roles?.includes('project_admin');

  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { data: projects, isSuccess, isPending } = useGetProjects();
  const { noAdminMessage, createProjectButton, deleteProjectButton } =
    useIntlayer('project-form');

  if (project) {
    return (
      <div className="flex size-full max-w-[500px] flex-col items-center justify-center gap-4">
        {!isProjectAdmin && (
          <Container
            roundedSize="xl"
            className="flex size-full justify-center p-6"
          >
            <p className="text-neutral text-sm">{noAdminMessage}</p>
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
        <Container
          roundedSize="xl"
          className="flex size-full justify-center p-6"
        >
          <DeleteProjectModal
            isOpen={isDeletionModalOpen}
            onClose={() => setIsDeletionModalOpen(false)}
            onDelete={() => setIsDeletionModalOpen(false)}
          />
          <Button
            type="submit"
            color="error"
            label={deleteProjectButton.ariaLabel.value}
            isFullWidth
            variant="outline"
            onClick={() => setIsDeletionModalOpen(true)}
            Icon={Trash}
          >
            {deleteProjectButton.text}
          </Button>
        </Container>
      </div>
    );
  }

  if ((projects?.data ?? []).length > 0) {
    return (
      <div className="flex w-full max-w-[350px] flex-col gap-6">
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <ProjectCreationForm
            onProjectCreated={() => setIsCreationModalOpen(false)}
          />
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

  if (isSuccess) {
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

  if (isPending) {
    return <Loader />;
  }

  return (
    <NoProjectView onClickCreateProject={() => setIsCreationModalOpen(true)} />
  );
};

export const ProjectForm: FC = () => (
  <Suspense fallback={<Loader />}>
    <ProjectFormContent />
  </Suspense>
);
