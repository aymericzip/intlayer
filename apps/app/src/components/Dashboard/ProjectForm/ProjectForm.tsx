import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useSession } from '@intlayer/design-system/hooks';
import { Trash, TriangleAlert } from 'lucide-react';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AccessKeyForm } from './AccessKey/AccessKeyForm';
import { AutoFillSettings } from './AutoFillSettings/AutoFillSettings';
import { BuildSettings } from './BuildSettings/BuildSettings';
import { ConfigDetails } from './Config/ConfigDetails';
import { DeleteProjectModal } from './DeleteProjectModal';
import { MembersForm } from './Members/MembersKeyForm';
import { ProjectDetailsSkeleton } from './ProjectDetailsSkeleton';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';
import { RepositoryLink } from './RepositoryLink';

export const ProjectFormContent: FC = () => {
  const { session } = useSession();

  const isProjectMember = session?.roles?.includes('project_user');
  const isProjectAdmin = session?.roles?.includes('project_admin');

  const { project } = session ?? {};
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const {
    noAdminMessage,
    dangerZoneTitle,
    dangerZoneDescription,
    deleteProjectButton,
  } = useIntlayer('project-form');

  if (project) {
    return (
      <div className="m-auto flex max-w-6xl flex-col items-center justify-center gap-8">
        {!isProjectAdmin && isProjectMember && (
          <Container
            roundedSize="xl"
            padding="md"
            border
            borderColor="neutral"
            className="flex size-full justify-center"
          >
            <p className="text-neutral text-sm">{noAdminMessage}</p>
          </Container>
        )}

        <div className="relative grid w-full min-w-0 justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
          <div className="sticky top-20 mb-auto flex min-w-0 flex-col gap-4">
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="z-20 flex size-full justify-center"
            >
              <ProjectEditionForm />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="z-10 flex size-full justify-center"
            >
              <MembersForm />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="flex size-full justify-center"
            >
              <AccessKeyForm />
            </Container>
          </div>
          <div className="sticky top-20 mb-auto flex min-w-0 flex-col gap-4">
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="z-20 flex size-full justify-center"
            >
              <ConfigDetails projectConfig={project.configuration} />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="z-10 flex size-full justify-center"
            >
              <RepositoryLink />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="flex size-full justify-center"
            >
              <BuildSettings />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="flex size-full justify-center"
            >
              <AutoFillSettings />
            </Container>
          </div>
        </div>
        <Container
          roundedSize="3xl"
          padding="lg"
          border
          borderColor="neutral"
          className="w-full"
        >
          <DeleteProjectModal
            isOpen={isDeletionModalOpen}
            onClose={() => setIsDeletionModalOpen(false)}
            onDelete={() => setIsDeletionModalOpen(false)}
          />
          <div className="flex items-start gap-6 px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error/10">
              <TriangleAlert className="h-5 w-5 text-error" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-base text-error">
                {dangerZoneTitle}
              </h3>
              <p className="mt-1 text-neutral text-sm">
                {dangerZoneDescription}
              </p>
              <Button
                color="error"
                label={deleteProjectButton.ariaLabel.value}
                variant="outline"
                onClick={() => setIsDeletionModalOpen(true)}
                Icon={Trash}
                className="mt-4"
              >
                {deleteProjectButton.text}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return <ProjectList />;
};

export const ProjectForm: FC = () => (
  <Suspense fallback={<ProjectDetailsSkeleton />}>
    <ProjectFormContent />
  </Suspense>
);
