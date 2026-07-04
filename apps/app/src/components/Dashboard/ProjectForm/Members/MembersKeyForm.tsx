import type {
  GetUsersResult,
  ProjectMemberGranularAccessAPI,
  UpdateProjectMembersBody,
  UserAPI,
} from '@intlayer/backend';
import {
  useGetUsers,
  useSession,
  useUpdateMemberAccess,
  useUpdateProjectMembers,
} from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  Form,
  FormButton,
  FormMultiSelect,
  useForm,
} from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { Checkbox, Radio } from '@intlayer/design-system/input';
import { Label } from '@intlayer/design-system/label';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { MultiSelect } from '@intlayer/design-system/select';
import type { Locale } from '@intlayer/types/allLocales';
import { Settings, Users } from 'lucide-react';
import { type FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import { LocaleCheckboxList } from '#components/LocalePicker/LocaleCheckboxList';
import {
  type ProjectMembersFormData,
  useProjectMembersSchema,
} from './useMembersFormSchema';

const getUserNames = (users: UserAPI[], id: UserAPI['id'] | string): string => {
  const user = users.find((u) => String(u.id) === String(id));
  return user?.name ?? user?.email ?? String(id);
};

/* ──────────────────────────────────────────────────────────────────────────
   MemberDetailView — env/locale pickers for a single member
────────────────────────────────────────────────────────────────────────── */

type MemberDetailViewProps = {
  userId: string;
  existingAccess: ProjectMemberGranularAccessAPI | undefined;
  environments: { id: string; name: string; isDefault?: boolean }[];
  locales: Locale[];
  onBack: () => void;
  onSaved: () => void;
};

const MemberDetailView: FC<MemberDetailViewProps> = ({
  userId,
  existingAccess,
  environments,
  locales,
  onBack,
  onSaved,
}) => {
  const content = useIntlayer('project-members-form');
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

  const toggleEnvId = (envId: string | null) =>
    setSelectedEnvIds((prev) =>
      prev.some((id) => (id === null ? envId === null : id === envId))
        ? prev.filter((id) => (id === null ? envId !== null : id !== envId))
        : [...prev, envId]
    );

  const toggleLocale = (locale: string) =>
    setSelectedLocales((prev) =>
      prev.includes(locale)
        ? prev.filter((l) => l !== locale)
        : [...prev, locale]
    );

  const handleSave = () =>
    updateMemberAccess(
      {
        userId,
        allowedEnvironmentIds: restrictEnvironments ? selectedEnvIds : null,
        allowedLocales: restrictLocales ? selectedLocales : null,
      },
      { onSuccess: onSaved }
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Environment access */}
      <div className="flex flex-col gap-3">
        <Label className="font-semibold text-sm">
          {content.environmentAccess}
        </Label>
        <Radio
          id={`env-all-${userId}`}
          name={`envRestrict-${userId}`}
          checked={!restrictEnvironments}
          onChange={() => setRestrictEnvironments(false)}
          label={content.allEnvironments}
          color="text"
          size="sm"
        />
        <Radio
          id={`env-specific-${userId}`}
          name={`envRestrict-${userId}`}
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
                  key={String(env.id)}
                  name={`env-scope-${envId ?? 'null'}`}
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
        <Label className="font-semibold text-sm">{content.localeAccess}</Label>
        <Radio
          id={`locale-all-${userId}`}
          name={`localeRestrict-${userId}`}
          checked={!restrictLocales}
          onChange={() => setRestrictLocales(false)}
          label={content.allLocales}
          color="text"
          size="sm"
        />
        <Radio
          id={`locale-specific-${userId}`}
          name={`localeRestrict-${userId}`}
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

      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          color="text"
          label={content.back.value}
          onClick={onBack}
        >
          {content.back}
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            color="text"
            label={content.cancel.value}
            onClick={onBack}
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
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   AccessControlModal — master-detail: member list → access config
────────────────────────────────────────────────────────────────────────── */

type AccessControlModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: UserAPI[];
  memberIds: string[];
  adminIds: string[];
  memberAccess: ProjectMemberGranularAccessAPI[];
  environments: { id: string; name: string; isDefault?: boolean }[];
  locales: Locale[];
};

const roleColor = (isAdmin: boolean) =>
  isAdmin ? ('text' as const) : ('neutral' as const);

const AccessControlModal: FC<AccessControlModalProps> = ({
  isOpen,
  onClose,
  users,
  memberIds,
  adminIds,
  memberAccess,
  environments,
  locales,
}) => {
  const content = useIntlayer('project-members-form');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedUserId(null);
    onClose();
  };

  const selectedUser = selectedUserId
    ? users.find((u) => String(u.id) === selectedUserId)
    : null;

  const selectedAccess = selectedUserId
    ? memberAccess.find((e) => String(e.userId) === selectedUserId)
    : undefined;

  const title =
    selectedUserId && selectedUser
      ? content.accessControlUsername({
          userName: selectedUser.name ?? selectedUser.email ?? selectedUserId,
        })
      : content.advancedAccessControls;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      hasCloseButton
      isScrollable="y"
      title={title}
      size="md"
      padding="md"
    >
      {selectedUserId ? (
        <MemberDetailView
          userId={selectedUserId}
          existingAccess={selectedAccess}
          environments={environments}
          locales={locales}
          onBack={() => setSelectedUserId(null)}
          onSaved={() => setSelectedUserId(null)}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {memberIds.map((memberId) => {
            const isAdmin = adminIds.includes(memberId);
            const access = memberAccess.find(
              (e) => String(e.userId) === memberId
            );
            const hasEnvRestriction = access?.allowedEnvironmentIds != null;
            const hasLocaleRestriction = access?.allowedLocales != null;

            return (
              <Container
                key={memberId}
                roundedSize="xl"
                padding="md"
                border
                background="none"
                borderColor="neutral"
                className="flex-row flex-wrap justify-between gap-2"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-sm">
                    {getUserNames(users, memberId)}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      variant="outline"
                      color={roleColor(isAdmin)}
                      size="sm"
                    >
                      {isAdmin ? 'project_admin' : 'project_user'}
                    </Badge>
                    {hasEnvRestriction && (
                      <Badge variant="outline" color="text" size="sm">
                        {access!
                          .allowedEnvironmentIds!.map(
                            (id) =>
                              environments.find(
                                (e) =>
                                  String(e.id) === String(id ?? 'production')
                              )?.name ??
                              id ??
                              'production'
                          )
                          .join(', ')}
                      </Badge>
                    )}
                    {hasLocaleRestriction && (
                      <Badge variant="outline" color="text" size="sm">
                        {access!.allowedLocales!.join(', ')}
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
                  onClick={() => setSelectedUserId(memberId)}
                >
                  {content.configureAccess}
                </Button>
              </Container>
            );
          })}
        </div>
      )}
    </Modal>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   MembersForm — main exported component
────────────────────────────────────────────────────────────────────────── */

export const MembersForm: FC = () => {
  const { session } = useSession();
  const { organization, project } = session ?? {};
  const MembersFormSchema = useProjectMembersSchema();
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: project?.membersIds.map((el) => String(el)) ?? [],
      adminsIds: project?.adminsIds?.map((el) => String(el)) ?? [],
    },
  });
  const {
    title,
    addMembersButton,
    membersSelect,
    adminsSelect,
    advancedAccessControls,
  } = useIntlayer('project-members-form');
  const { mutate: updateProjectMembers } = useUpdateProjectMembers();
  const { isPending: isLoadingUsers, data: usersData } = useGetUsers({
    ids: project?.membersIds ?? [],
  });
  const users = (usersData as GetUsersResult)?.data ?? [];
  const displayedUsers = users.slice(0, 5);
  const remainingCount = users.length - displayedUsers.length;
  const isProjectAdmin =
    session?.roles.includes('project_admin') ||
    session?.roles.includes('admin');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Subscribe to the field value so the admins select options update as soon
  // as a member is added, without waiting for a save (`getValues` is not reactive)
  const selectedMembersIds =
    useWatch({
      control: form.control,
      name: 'membersIds',
    }) ?? [];

  const memberIds = project?.membersIds.map(String) ?? [];
  const adminIds = project?.adminsIds?.map(String) ?? [];
  const environments = project?.environments ?? [];
  const locales = (project?.configuration?.internationalization?.locales ??
    []) as Locale[];
  const memberAccess = (project?.memberAccess ??
    []) as ProjectMemberGranularAccessAPI[];

  const onSubmitSuccess = (data: ProjectMembersFormData) => {
    updateProjectMembers({
      membersIds: data.membersIds.map((el) => ({
        userId: el,
        isAdmin: data.adminsIds.includes(el),
      })),
    } satisfies UpdateProjectMembersBody);
  };

  return (
    <>
      {isProjectAdmin && (
        <AccessControlModal
          isOpen={isAdvancedOpen}
          onClose={() => setIsAdvancedOpen(false)}
          users={users}
          memberIds={memberIds}
          adminIds={adminIds}
          memberAccess={memberAccess}
          environments={environments}
          locales={locales}
        />
      )}

      <div className="mb-8 flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <H3 className="mb-0">{title}</H3>
        </div>

        {project && project.membersIds.length > 0 && (
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

      <Form
        className="w-full"
        schema={MembersFormSchema}
        onSubmitSuccess={onSubmitSuccess}
        {...form}
      >
        <FormMultiSelect
          name="membersIds"
          label={membersSelect.label.value}
          placeholder={membersSelect.placeholder.value}
          description={membersSelect.description.value}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) => getUserNames(users, value)}
          >
            <MultiSelect.Input placeholder={membersSelect.placeholder.value} />
          </MultiSelect.Trigger>
          <Loader isLoading={isLoadingUsers}>
            <MultiSelect.Content>
              <MultiSelect.List>
                {organization?.membersIds.map((memberId) => (
                  <MultiSelect.Item
                    key={String(memberId)}
                    value={String(memberId)}
                  >
                    {getUserNames(users, memberId)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Loader>
        </FormMultiSelect>

        <FormMultiSelect
          name="adminsIds"
          label={adminsSelect.label.value}
          placeholder={adminsSelect.placeholder.value}
          description={adminsSelect.description.value}
        >
          <MultiSelect.Trigger
            getBadgeValue={(value) => getUserNames(users, value)}
          >
            <MultiSelect.Input placeholder={adminsSelect.placeholder.value} />
          </MultiSelect.Trigger>
          <Loader isLoading={isLoadingUsers}>
            <MultiSelect.Content>
              <MultiSelect.List>
                {selectedMembersIds.map((memberId) => (
                  <MultiSelect.Item
                    key={String(memberId)}
                    value={String(memberId)}
                  >
                    {getUserNames(users, memberId)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Loader>
        </FormMultiSelect>

        <div className="mt-4 flex flex-col gap-2">
          {isProjectAdmin && memberIds.length > 0 && (
            <Button
              className="w-full"
              variant="outline"
              color="text"
              label={advancedAccessControls.value}
              Icon={Settings}
              onClick={() => setIsAdvancedOpen(true)}
            >
              {advancedAccessControls}
            </Button>
          )}

          {isProjectAdmin && (
            <FormButton
              className="w-full"
              type="submit"
              color="text"
              disabled={isSubmitting || isLoadingUsers}
              isLoading={isSubmitting}
              label={addMembersButton.label.value}
              onClick={() => null}
            >
              {addMembersButton.text}
            </FormButton>
          )}
        </div>
      </Form>
    </>
  );
};
