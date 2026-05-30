import type { GetUsersResult } from '@intlayer/backend';
import { Avatar } from '@intlayer/design-system';
import { useGetUsers, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { GitBranch, Trash, TriangleAlert } from 'lucide-react';
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

  const { data: usersData, isPending: isLoadingUsers } = useGetUsers(
    {
      ids: session?.project?.membersIds.map(String) ?? [],
    },
    {
      enabled: !!session?.project?.membersIds.length,
    }
  );

  const users = (usersData as GetUsersResult | undefined)?.data ?? [];
  const displayedUsers = users.slice(0, 5);
  const remainingCount = users.length - displayedUsers.length;

  if (project) {
    const nameAndUsers = (
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-2xl">{project.name}</h3>

        {project.membersIds.length > 0 && (
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row -space-x-2">
              {displayedUsers.map((user) => (
                <Avatar
                  key={String(user.id)}
                  src={user.image ?? undefined}
                  fullname={user.name}
                  size="sm"
                  isLoading={isLoadingUsers}
                />
              ))}
            </div>
            {remainingCount > 0 && (
              <span className="ml-1 text-neutral text-xs">
                +{remainingCount}
              </span>
            )}
          </div>
        )}
      </div>
    );

    const repositoryInfo = project.repository && (
      <div className="flex shrink-0 items-center gap-4">
        <div className="flex aspect-square size-12 items-center justify-center rounded-full bg-text/5">
          <GitBranch className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <a
            href={project.repository.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-xs underline"
          >
            {project.repository.owner}/{project.repository.repository}
          </a>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-neutral text-xs">
              <GitBranch className="size-3" />
              {project.repository.branch}
            </span>
            <span className="rounded bg-text/10 px-2 py-0.5 text-xs">
              {project.repository.configFilePath}
            </span>
          </div>
        </div>
      </div>
    );

    const projectImage = project.imageUrl && (
      <Container
        className="aspect-video w-full max-w-70 shrink-0 overflow-hidden"
        roundedSize="xl"
        background="none"
      >
        <img
          src={project.imageUrl}
          alt={`${project.name} screenshot`}
          width={1280}
          height={720}
          crossOrigin="anonymous"
          className="aspect-video w-full object-cover"
        />
      </Container>
    );

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

        <Container
          roundedSize="3xl"
          padding="lg"
          border
          borderColor="neutral"
          className="w-full"
        >
          {!project.imageUrl ? (
            <div className="flex w-full flex-col gap-12 md:flex-row md:items-center md:justify-between">
              {nameAndUsers}
              {repositoryInfo}
            </div>
          ) : (
            <div className="flex w-full flex-col gap-12 md:flex-row md:items-center">
              {projectImage}
              <div className="flex h-full flex-1 flex-col justify-between gap-4">
                {nameAndUsers}
                {repositoryInfo}
              </div>
            </div>
          )}
        </Container>

        <div className="relative grid w-full min-w-0 justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
          <div className="top-20 mb-auto flex min-w-0 flex-col gap-4 md:sticky">
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
          <div className="top-20 mb-auto flex min-w-0 flex-col gap-4 md:sticky">
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
          borderColor="error"
          className="w-full"
          transparency="lg"
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
