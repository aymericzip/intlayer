'use client';

import { Button, Container, Loader } from '@intlayer/design-system';
import { useGetProjects, useSession } from '@intlayer/design-system/hooks';
import { Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { AccessKeyForm } from './AccessKey/AccessKeyForm';
import { ConfigDetails } from './Config/ConfigDetails';
import { DeleteProjectModal } from './DeleteProjectModal';
import { MembersForm } from './Members/MembersKeyForm';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';

export const ProjectFormContent: FC = () => {
  const { session } = useSession();

  const isProjectMember = session?.roles?.includes('project_user');
  const isProjectAdmin = session?.roles?.includes('project_admin');

  const { project } = session ?? {};
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { noAdminMessage, deleteProjectButton } = useIntlayer('project-form');

  if (project) {
    return (
      <div className="flex max-w-5xl flex-col items-center justify-center gap-4">
        {!isProjectAdmin && isProjectMember && (
          <Container
            roundedSize="xl"
            padding="md"
            className="flex size-full justify-center"
          >
            <p className="text-neutral text-sm">{noAdminMessage}</p>
          </Container>
        )}

        <div className="grid w-full justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-2 lg:gap-x-16">
          <div className="mb-auto flex flex-col gap-4">
            <Container
              roundedSize="xl"
              padding="md"
              className="z-20 flex size-full justify-center"
            >
              <ProjectEditionForm />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="flex size-full justify-center"
            >
              <AccessKeyForm />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="flex size-full justify-center"
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
          <div className="mb-auto flex flex-col gap-4">
            <Container
              roundedSize="xl"
              padding="md"
              className="z-20 flex size-full justify-center"
            >
              <ConfigDetails projectConfig={project.configuration} />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="z-10 flex size-full justify-center"
            >
              <MembersForm />
            </Container>
          </div>
        </div>
      </div>
    );
  }

  return <ProjectList />;
};

export const ProjectForm: FC = () => (
  <Suspense fallback={<Loader />}>
    <ProjectFormContent />
  </Suspense>
);
