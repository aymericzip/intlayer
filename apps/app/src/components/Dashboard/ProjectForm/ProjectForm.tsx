import type { GetUsersResult } from '@intlayer/backend-contract/user';
import { useGetUsers, useSession } from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Container } from '@intlayer/design-system/container';
import {
  GitBranch,
  KeyRound,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  DangerZoneCard,
  type SettingsSection,
  SettingsCard,
  SettingsSectionLayout,
} from '../SettingsSectionLayout';
import { AccessKeyForm } from './AccessKey/AccessKeyForm';
import { AutoFillSettings } from './AutoFillSettings/AutoFillSettings';
import { BuildSettings } from './BuildSettings/BuildSettings';
import { ConfigDetails } from './Config/ConfigDetails';
import { DeleteProjectModal } from './DeleteProjectModal';
import { EnvironmentsForm } from './Environments/EnvironmentsForm';
import { GitImportPrompt } from './GitImportPrompt';
import { MembersForm } from './Members/MembersKeyForm';
import { OpenRouterSettings } from './OpenRouter';
import { ProjectDetailsSkeleton } from './ProjectDetailsSkeleton';
import { ProjectEditionForm } from './ProjectEditionForm';
import { ProjectList } from './ProjectList';
import { ProjectScreenshot } from './ProjectScreenshot';
import { RepositoryLink } from './RepositoryLink';

type ProjectSettingsSectionId =
  | 'general'
  | 'members'
  | 'access-keys'
  | 'configuration'
  | 'ai'
  | 'repository'
  | 'danger-zone';

export const ProjectFormContent: FC = () => {
  const { session } = useSession();

  const isProjectMember =
    session?.roles?.includes('project_user') ||
    session?.roles?.includes('admin');
  const isProjectAdmin =
    session?.roles?.includes('project_admin') ||
    session?.roles?.includes('admin');

  const { project } = session ?? {};
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const {
    noAdminMessage,
    dangerZoneTitle,
    dangerZoneDescription,
    deleteProjectButton,
  } = useIntlayer('project-form');
  const { sections: sectionLabels } = useIntlayer('settings-section-layout');

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
        <h3 className="text-2xl font-bold">{project.name}</h3>

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
              <span className="ms-1 text-xs text-neutral">
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
            className="text-xs font-medium underline"
          >
            {project.repository.owner}/{project.repository.repository}
          </a>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-neutral">
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
      <ProjectScreenshot
        imageUrl={project.imageUrl}
        projectName={project.name}
        canRegenerate={Boolean(isProjectAdmin)}
      />
    );

    const sections: SettingsSection<ProjectSettingsSectionId>[] = [
      {
        id: 'general',
        label: sectionLabels.general.value,
        icon: Settings,
        content: (
          <SettingsCard>
            <ProjectEditionForm />
          </SettingsCard>
        ),
      },
      {
        id: 'members',
        label: sectionLabels.members.value,
        icon: Users,
        content: (
          <SettingsCard>
            <MembersForm />
          </SettingsCard>
        ),
      },
      {
        id: 'access-keys',
        label: sectionLabels.accessKeys.value,
        icon: KeyRound,
        content: (
          <SettingsCard>
            <AccessKeyForm />
          </SettingsCard>
        ),
      },
      {
        id: 'configuration',
        label: sectionLabels.configuration.value,
        icon: SlidersHorizontal,
        content: (
          <>
            <SettingsCard>
              <ConfigDetails projectConfig={project.configuration} />
            </SettingsCard>
            <SettingsCard>
              <EnvironmentsForm />
            </SettingsCard>
          </>
        ),
      },
      {
        id: 'ai',
        label: sectionLabels.ai.value,
        icon: Sparkles,
        content: (
          <>
            <SettingsCard>
              <OpenRouterSettings />
            </SettingsCard>
            <SettingsCard>
              <AutoFillSettings />
            </SettingsCard>
          </>
        ),
      },
      {
        id: 'repository',
        label: sectionLabels.repository.value,
        icon: GitBranch,
        content: (
          <>
            {isProjectAdmin && !project.repository && (
              <SettingsCard>
                <GitImportPrompt mode="connect" />
              </SettingsCard>
            )}
            <SettingsCard>
              <RepositoryLink />
            </SettingsCard>
            <SettingsCard>
              <BuildSettings />
            </SettingsCard>
          </>
        ),
      },
    ];

    if (isProjectAdmin) {
      sections.push({
        id: 'danger-zone',
        label: sectionLabels.dangerZone.value,
        icon: TriangleAlert,
        tone: 'danger',
        content: (
          <DangerZoneCard
            title={dangerZoneTitle}
            description={dangerZoneDescription}
            buttonLabel={deleteProjectButton.ariaLabel.value}
            buttonText={deleteProjectButton.text}
            onDelete={() => setIsDeletionModalOpen(true)}
          >
            <DeleteProjectModal
              isOpen={isDeletionModalOpen}
              onClose={() => setIsDeletionModalOpen(false)}
              onDelete={() => setIsDeletionModalOpen(false)}
            />
          </DangerZoneCard>
        ),
      });
    }

    return (
      <div className="flex w-full flex-1 flex-col gap-8 self-start">
        {!isProjectAdmin && isProjectMember && (
          <Container
            roundedSize="xl"
            padding="md"
            border
            borderColor="neutral"
            className="flex size-full justify-center"
          >
            <p className="text-sm text-neutral">{noAdminMessage}</p>
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

        <SettingsSectionLayout sections={sections} />
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
