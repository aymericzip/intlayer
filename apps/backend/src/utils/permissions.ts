import { Dictionary, DictionaryAPI } from '@/types/dictionary.types';
import { Organization, OrganizationAPI } from '@/types/organization.types';
import { Project, ProjectAPI } from '@/types/project.types';
import { SessionContext } from '@/types/session.types';
import { Tag, TagAPI } from '@/types/tag.types';
import { User, UserAPI } from '@/types/user.types';

/**
 * A named grouping of privileges (e.g. `"org_admin"`).
 * Users are *granted* one or more Roles.
 */
export type Roles =
  | 'user'
  | 'admin'
  | 'org_admin'
  | 'org_user'
  | 'project_admin'
  | 'project_user'
  | 'project_reviewer';

/**
 * An atomic operation that can be performed on a resource.
 * - **read**: view or list
 * - **write**: create or update
 * - **admin**: delete or change permissions
 */
export type Action = 'read' | 'write' | 'admin';

/**
 * A first‑class entity in your domain model that you want to protect.
 */
export type Resource = {
  organization: Organization;
  project: Project;
  dictionary: Dictionary;
  tag: Tag;
  user: User;
};

/**
 * A literal string combining a Resource and an Action, e.g. `"project:write"`.
 * This is the *unit* checked at runtime in your middleware.
 */
export type Permission = `${keyof Resource}:${Action}`;

type CheckPrivilege = (
  args: any
) => boolean | undefined | Promise<boolean> | Promise<undefined>;

type RolePolicy = Record<Roles, Partial<Record<Permission, CheckPrivilege>>>;

export const ROLE_POLICY = {
  admin: {
    'organization:read': () => true,
    'organization:write': () => true,
    'organization:admin': () => true,
    'project:read': () => true,
    'project:write': () => true,
    'project:admin': () => true,
    'dictionary:read': () => true,
    'dictionary:write': () => true,
    'dictionary:admin': () => true,
    'tag:read': () => true,
    'tag:write': () => true,
    'tag:admin': () => true,
    'user:read': () => true,
    'user:write': () => true,
    'user:admin': () => true,
  },
  user: {
    'user:read': ({
      user,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every(
        (targetUser) =>
          String(targetUser.id) === String(user?.id) &&
          targetUser.email === user?.email
      ),
    'user:write': ({
      user,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every(
        (targetUser) =>
          String(targetUser.id) === String(user?.id) &&
          targetUser.email === user?.email
      ),
    'user:admin': ({
      user,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every(
        (targetUser) =>
          String(targetUser.id) === String(user?.id) &&
          targetUser.email === user?.email
      ),
    'organization:read': ({
      user,
      targetOrganizations,
    }: SessionContext & {
      targetOrganizations: (Organization | OrganizationAPI)[];
    }) =>
      targetOrganizations.every((organization) =>
        organization?.membersIds?.map(String).includes(String(user?.id))
      ),
  },
  org_admin: {
    'organization:read': ({
      organization,
      targetOrganizations,
    }: SessionContext & {
      targetOrganizations: (Organization | OrganizationAPI)[];
    }) =>
      targetOrganizations.every(
        (targetOrg) => String(targetOrg.id) === String(organization?.id)
      ),
    'organization:write': ({
      organization,
      targetOrganizations,
    }: SessionContext & {
      targetOrganizations: (Organization | OrganizationAPI)[];
    }) =>
      targetOrganizations.every(
        (targetOrg) => String(targetOrg.id) === String(organization?.id)
      ),
    'organization:admin': ({
      organization,
      targetOrganizations,
    }: SessionContext & {
      targetOrganizations: (Organization | OrganizationAPI)[];
    }) =>
      targetOrganizations.every(
        (targetOrg) => String(targetOrg.id) === String(organization?.id)
      ),

    'project:read': ({ organization, project }: SessionContext) =>
      String(project?.organizationId) === String(organization?.id),
    'project:write': ({ organization, project }: SessionContext) =>
      String(project?.organizationId) === String(organization?.id),
    'project:admin': ({ organization, project }: SessionContext) =>
      String(project?.organizationId) === String(organization?.id),

    'tag:read': ({ organization, project }: SessionContext) =>
      String(project?.organizationId) === String(organization?.id),
    'tag:write': ({ organization, project }: SessionContext) =>
      String(project?.organizationId) === String(organization?.id),
    'tag:admin': ({ organization, project }: SessionContext) =>
      String(project?.organizationId) === String(organization?.id),

    'user:write': ({
      organization,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every((targetUser) =>
        organization?.membersIds?.map(String).includes(String(targetUser?.id))
      ),
  },
  org_user: {
    'organization:read': ({
      organization,
      targetOrganizations,
    }: SessionContext & {
      targetOrganizations: (Organization | OrganizationAPI)[];
    }) =>
      targetOrganizations.every(
        (targetOrg) => String(targetOrg.id) === String(organization?.id)
      ),

    'project:read': ({
      user,
      targetProjects,
    }: SessionContext & {
      targetProjects: (Project | ProjectAPI)[];
    }) =>
      targetProjects?.every((project) =>
        project?.membersIds?.map(String).includes(String(user?.id))
      ),

    'user:read': ({
      organization,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every((targetUser) =>
        organization?.membersIds?.map(String).includes(String(targetUser?.id))
      ),
  },
  project_admin: {
    'project:read': ({
      project,
      targetProjectIds,
    }: SessionContext & {
      targetProjectIds?: (Project | ProjectAPI)['id'][];
    }) =>
      targetProjectIds?.every(
        (projectId) => String(project?.id) === String(projectId)
      ),
    'project:write': ({
      project,
      targetProjectIds,
    }: SessionContext & {
      targetProjectIds?: (Project | ProjectAPI)['id'][];
    }) =>
      targetProjectIds?.every(
        (projectId) => String(project?.id) === String(projectId)
      ),
    'project:admin': ({
      project,
      targetProjectIds,
    }: SessionContext & {
      targetProjectIds?: (Project | ProjectAPI)['id'][];
    }) =>
      targetProjectIds?.every(
        (projectId) => String(project?.id) === String(projectId)
      ),

    'tag:read': ({
      project,
      targetTags,
    }: SessionContext & { targetTags: (Tag | TagAPI)[] }) =>
      targetTags.every((tag) => String(project?.id) === String(tag?.projectId)),
    'tag:write': ({
      project,
      targetTags,
    }: SessionContext & { targetTags: (Tag | TagAPI)[] }) =>
      targetTags.every((tag) => String(project?.id) === String(tag?.projectId)),
    'tag:admin': ({
      project,
      targetTags,
    }: SessionContext & { targetTags: (Tag | TagAPI)[] }) =>
      targetTags.every((tag) => String(project?.id) === String(tag?.projectId)),

    'user:write': ({
      project,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every((targetUser) =>
        project?.membersIds?.map(String).includes(String(targetUser?.id))
      ),

    'dictionary:read': ({ project, user }: SessionContext) =>
      project?.adminsIds?.map(String).includes(String(user?.id)),
    'dictionary:write': ({ project, user }: SessionContext) =>
      project?.adminsIds?.map(String).includes(String(user?.id)),
    'dictionary:admin': ({ project, user }: SessionContext) =>
      project?.adminsIds?.map(String).includes(String(user?.id)),
  },
  project_user: {
    'project:read': ({ user, organization, project }: SessionContext) =>
      String(organization?.id) === String(project?.organizationId) &&
      organization?.membersIds?.map(String).includes(String(user?.id)) &&
      project?.membersIds?.map(String).includes(String(user?.id)),

    'dictionary:read': ({
      user,
      project,
      targetDictionaries,
    }: SessionContext & {
      targetDictionaries: (Dictionary | DictionaryAPI)[];
    }) =>
      project?.membersIds?.map(String).includes(String(user?.id)) &&
      targetDictionaries.every((dictionary) =>
        dictionary?.projectIds?.map(String).includes(String(project?.id))
      ),
    'dictionary:write': ({ user, project }: SessionContext) =>
      project?.adminsIds?.map(String).includes(String(user?.id)),

    'tag:read': ({
      project,
      targetTags,
      user,
    }: SessionContext & {
      targetTags: (Tag | TagAPI)[];
    }) =>
      project?.membersIds?.map(String).includes(String(user?.id)) &&
      targetTags.every((tag) => String(project?.id) === String(tag?.projectId)),
    'tag:write': ({
      project,
      targetTags,
      user,
    }: SessionContext & {
      targetTags: (Tag | TagAPI)[];
    }) =>
      project?.membersIds?.map(String).includes(String(user?.id)) &&
      targetTags.every((tag) => String(project?.id) === String(tag?.projectId)),
    'tag:admin': ({
      user,
      project,
      targetTags,
    }: SessionContext & {
      targetTags: (Tag | TagAPI)[];
    }) =>
      project?.adminsIds?.map(String).includes(String(user?.id)) &&
      targetTags.every((tag) => String(project?.id) === String(tag?.projectId)),

    'user:read': ({
      project,
      targetUsers,
    }: SessionContext & { targetUsers: (User | UserAPI)[] }) =>
      targetUsers.every((targetUser) =>
        project?.membersIds?.map(String).includes(String(targetUser?.id))
      ),
  },
  project_reviewer: {
    'dictionary:read': ({ user, project }: SessionContext) =>
      project?.membersIds?.map(String).includes(String(user?.id)),
    'dictionary:write': ({ user, project }: SessionContext) =>
      project?.membersIds?.map(String).includes(String(user?.id)),

    'tag:read': () => true,
  },
} as const satisfies RolePolicy;

export const getSessionRoles = ({
  user,
  organization,
  project,
}: SessionContext): Roles[] => {
  const roles: Roles[] = [];

  if (!user) {
    return roles;
  }

  roles.push('user');

  const isUserAdmin = user.role === 'admin';

  if (isUserAdmin) {
    roles.push('admin');
  }

  if (!organization) {
    return roles;
  }

  const isOrganizationAdmin = organization.adminsIds
    ?.map(String)
    .includes(String(user!.id));

  if (isOrganizationAdmin) {
    roles.push('org_admin');
  }

  const isOrganizationMember = organization.membersIds
    ?.map(String)
    .includes(String(user!.id));

  if (isOrganizationMember) {
    roles.push('org_user');
  }

  if (!project) {
    return roles;
  }

  const isProjectAdmin = project.adminsIds
    ?.map(String)
    .includes(String(user!.id));

  if (isProjectAdmin) {
    roles.push('project_admin');
  }

  const isProjectMember = project?.membersIds
    ?.map(String)
    .includes(String(user!.id));

  if (isProjectMember) {
    roles.push('project_user');
  }

  //   const isProjectReviewer =
  //      session.project?.reviewersIds?.includes(session.user!.id);

  //   if (isProjectReviewer) {
  //     roles.push('project_reviewer');
  //   }

  return roles;
};

export const computeEffectivePermission = (roles: Roles[]): Permission[] =>
  Array.from(
    new Set(
      roles.flatMap((role) => Object.keys(ROLE_POLICY[role]) as Permission[])
    )
  );

/**
 * Intersect two permission lists
 * @param permissionList1 - The first permission list
 * @param permissionList2 - The second permission list
 * @returns The intersection of the two permission lists (only permissions present in both)
 */
export const intersectPermissions = (
  permissions1: Permission[],
  permissions2: Permission[]
): Permission[] =>
  permissions1.filter((permission) => permissions2.includes(permission));

type PermissionResult<
  R extends Roles,
  P extends Permission,
> = (typeof ROLE_POLICY)[R] extends infer RolePerms
  ? RolePerms extends Record<string, (args: any) => any>
    ? P extends keyof RolePerms
      ? RolePerms[P] extends undefined
        ? never
        : RolePerms[P]
      : never
    : never
  : never;

export const hasPermission = <P extends Permission>(
  roles: Roles[],
  permission: P
): PermissionResult<Roles, P> => {
  const rolesCheck: any = roles.map(
    (role) =>
      ROLE_POLICY[role]?.[
        permission as keyof (typeof ROLE_POLICY)[typeof role]
      ] ?? (() => false)
  ) as unknown as PermissionResult<Roles, P>[];

  return ((args: any) => rolesCheck.some((check: any) => check(args))) as any;
};
