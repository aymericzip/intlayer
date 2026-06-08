import type {
  GetProjectsResult,
  ProjectAPI,
  ProjectMemberGranularAccessAPI,
} from '@intlayer/backend';
import {
  useGetProjects,
  useUpdateMemberAccess,
} from '@intlayer/design-system/api';
import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Checkbox, Radio } from '@intlayer/design-system/input';
import { Label } from '@intlayer/design-system/label';
import { Modal } from '@intlayer/design-system/modal';
import type { Locale } from '@intlayer/types/allLocales';
import { Settings } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocaleCheckboxList } from '#components/LocalePicker/LocaleCheckboxList';
import { UserDeleteAction } from '../../UserForm/UserDeleteAction';
import { UserEditForm } from '../../UserForm/UserEditForm';

type ProjectAccessModalProps = {
  projectName: string;
  userId: string;
  existingAccess: ProjectMemberGranularAccessAPI | undefined;
  environments: { id: string; name: string; isDefault?: boolean }[];
  locales: Locale[];
  isOpen: boolean;
  onClose: () => void;
};

const ProjectAccessModal: FC<ProjectAccessModalProps> = ({
  projectName,
  userId,
  existingAccess,
  environments,
  locales,
  isOpen,
  onClose,
}) => {
  const content = useIntlayer('user-admin-detail-page');
  const { mutate: updateMemberAccess, isPending } = useUpdateMemberAccess();

  const [restrictEnvironments, setRestrictEnvironments] = useState(
    existingAccess?.allowedEnvironmentIds != null
  );
  const [selectedEnvIds, setSelectedEnvIds] = useState<(string | null)[]>(
    existingAccess?.allowedEnvironmentIds ?? []
  );
  const [restrictLocales, setRestrictLocales] = useState(
    existingAccess?.allowedLocales != null
  );
  const [selectedLocales, setSelectedLocales] = useState<string[]>(
    existingAccess?.allowedLocales ?? []
  );

  const toggleEnvId = (envId: string | null) => {
    setSelectedEnvIds((prev) =>
      prev.some((id) => (id === null ? envId === null : id === envId))
        ? prev.filter((id) => (id === null ? envId !== null : id !== envId))
        : [...prev, envId]
    );
  };

  const toggleLocale = (locale: string) => {
    setSelectedLocales((prev) =>
      prev.includes(locale)
        ? prev.filter((l) => l !== locale)
        : [...prev, locale]
    );
  };

  const handleSave = () => {
    updateMemberAccess(
      {
        userId,
        allowedEnvironmentIds: restrictEnvironments ? selectedEnvIds : null,
        allowedLocales: restrictLocales ? selectedLocales : null,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton
      isScrollable="y"
      title={content.accessControlProjectname({ projectName })}
      size="lg"
      padding="md"
    >
      <div className="flex flex-col gap-6">
        {/* Environment access */}
        <div className="flex flex-col gap-3">
          <Label className="font-semibold text-sm">
            {content.environmentAccess}
          </Label>
          <Radio
            id={`env-admin-all-${userId}`}
            name={`envRestrict-admin-${userId}`}
            checked={!restrictEnvironments}
            onChange={() => setRestrictEnvironments(false)}
            label={content.allEnvironments}
            color="text"
            size="sm"
          />
          <Radio
            id={`env-admin-specific-${userId}`}
            name={`envRestrict-admin-${userId}`}
            checked={restrictEnvironments}
            onChange={() => setRestrictEnvironments(true)}
            label={content.restrictToSpecificEnvironments}
            color="text"
            size="sm"
          />
          {restrictEnvironments && (
            <div className="ml-6 flex flex-col gap-2">
              {environments.map((env) => {
                const envId = env.id === 'production' ? null : env.id;
                const isChecked = selectedEnvIds.some((id) =>
                  id === null ? envId === null : id === envId
                );
                return (
                  <Checkbox
                    name={`env-scope-admin-${envId ?? 'null'}`}
                    key={String(env.id)}
                    checked={isChecked}
                    onChange={() => toggleEnvId(envId)}
                    label={`${env.name}${env.isDefault ? ' ★' : ''}`}
                    color="text"
                    size="sm"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Locale access */}
        <div className="flex flex-col gap-3">
          <Label className="font-semibold text-sm">
            {content.localeAccess}
          </Label>
          <Radio
            id={`locale-admin-all-${userId}`}
            name={`localeRestrict-admin-${userId}`}
            checked={!restrictLocales}
            onChange={() => setRestrictLocales(false)}
            label={content.allLocales}
            color="text"
            size="sm"
          />
          <Radio
            id={`locale-admin-specific-${userId}`}
            name={`localeRestrict-admin-${userId}`}
            checked={restrictLocales}
            onChange={() => setRestrictLocales(true)}
            label={content.restrictToSpecificLocales}
            color="text"
            size="sm"
          />
          {restrictLocales && (
            <div className="ml-6">
              <LocaleCheckboxList
                locales={locales}
                selectedLocales={selectedLocales}
                onChange={toggleLocale}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            color="text"
            label={content.cancel.value}
            onClick={onClose}
          >
            {content.cancel}
          </Button>
          <Button
            color="text"
            label={content.saveAccessConstraints.value}
            isLoading={isPending}
            onClick={handleSave}
          >
            {content.save}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const deriveRole = (
  project: ProjectAPI,
  userId: string
): 'project_admin' | 'project_reviewer' | 'project_user' => {
  if (project.adminsIds?.some((id) => String(id) === userId))
    return 'project_admin';
  if (
    (project as ProjectAPI & { viewersIds?: string[] }).viewersIds?.some(
      (id) => String(id) === userId
    )
  )
    return 'project_reviewer';
  return 'project_user';
};

const isMember = (project: ProjectAPI, userId: string): boolean =>
  [
    ...(project.membersIds ?? []),
    ...(project.adminsIds ?? []),
    ...((project as ProjectAPI & { viewersIds?: string[] }).viewersIds ?? []),
  ].some((id) => String(id) === userId);

const ProjectAccessSection: FC<{ userId: string }> = ({ userId }) => {
  const content = useIntlayer('user-admin-detail-page');
  const { data: projectsData, isPending: isLoadingProjects } = useGetProjects();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const projects = ((projectsData as GetProjectsResult)?.data ?? []).filter(
    (project) => isMember(project, userId)
  );

  if (isLoadingProjects) {
    return (
      <div className="flex w-full flex-col gap-4">
        <span className="font-bold text-lg">{content.projectAccess}</span>
        <span className="text-neutral text-sm">{content.loadingProjects}</span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <span className="font-bold text-lg">{content.projectAccess}</span>
        <span className="text-neutral text-sm">
          {content.noProjectMembership}
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <span className="font-bold text-lg">{content.projectAccess}</span>
      {projects.map((project) => {
        const projectIdStr = String(project.id);
        const accessEntry = project.memberAccess?.find(
          (entry) => String(entry.userId) === userId
        ) as ProjectMemberGranularAccessAPI | undefined;

        const role = deriveRole(project, userId);
        const environments = project.environments ?? [];
        const locales = (project.configuration?.internationalization?.locales ??
          []) as Locale[];

        return (
          <div
            key={projectIdStr}
            className="flex items-center justify-between rounded-lg border border-text/10 px-4 py-3"
          >
            {activeProjectId === projectIdStr && (
              <ProjectAccessModal
                projectName={project.name}
                userId={userId}
                existingAccess={accessEntry}
                environments={environments}
                locales={locales}
                isOpen
                onClose={() => setActiveProjectId(null)}
              />
            )}
            <div className="flex flex-col gap-1.5">
              <span className="font-medium text-sm">{project.name}</span>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" color="neutral" size="sm">
                  {role}
                </Badge>
                {accessEntry?.allowedEnvironmentIds != null && (
                  <Badge variant="outline" color="text" size="sm">
                    {content.envsBadgePrefix}{' '}
                    {accessEntry.allowedEnvironmentIds
                      .map(
                        (id) =>
                          environments.find(
                            (e) => String(e.id) === String(id ?? 'production')
                          )?.name ??
                          id ??
                          'production'
                      )
                      .join(', ')}
                  </Badge>
                )}
                {accessEntry?.allowedLocales != null && (
                  <Badge variant="outline" color="text" size="sm">
                    {content.localesBadgePrefix}{' '}
                    {accessEntry.allowedLocales.join(', ')}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="hoverable"
              color="text"
              size="sm"
              label={content.configureAccess.value}
              Icon={Settings}
              onClick={() => setActiveProjectId(projectIdStr)}
            >
              {content.configure}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export const UserAdminDetailPage: FC<{ userId: string }> = ({ userId }) => (
  <div className="m-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
    <UserEditForm userId={userId} />
    <ProjectAccessSection userId={userId} />
    <UserDeleteAction userId={userId} />
  </div>
);
