import { Dictionary, Organization, Project, Tag, User } from '@/export';
import { SessionContext } from '@/types/session.types';

/**
 * @description
 * A named grouping of privileges (e.g. `"org_admin"`).
 * Users are *granted* one or more Roles.
 */
export type Roles =
  | 'admin'
  | 'org_admin'
  | 'org_user'
  | 'project_admin'
  | 'project_user'
  | 'project_reviewer';

/**
 * @description
 * An atomic operation that can be performed on a resource.
 * - **read**: view or list
 * - **write**: create or update
 * - **admin**: delete or change permissions
 */
export type Action = 'read' | 'write' | 'admin';

/**
 * @description
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
 * @description
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
  org_admin: {
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

    'user:write': ({
      organization,
      targetUserIds,
    }: SessionContext & { targetUserIds: User['id'][] }) =>
      targetUserIds.every((targetUserId) =>
        organization?.membersIds?.map(String).includes(String(targetUserId))
      ),
  },
  org_user: {
    'organization:read': () => true,

    'user:read': ({
      organization,
      targetUserIds,
    }: SessionContext & { targetUserIds: User['id'][] }) =>
      targetUserIds.every((targetUserId) =>
        organization?.membersIds?.map(String).includes(String(targetUserId))
      ),
  },
  project_admin: {
    'project:read': () => true,
    'project:write': () => true,
    'project:admin': () => true,
    'tag:read': () => true,
    'tag:write': () => true,
    'tag:admin': () => true,

    'user:write': ({
      project,
      targetUserIds,
    }: SessionContext & { targetUserIds: User['id'][] }) =>
      targetUserIds.every((targetUserId) =>
        project?.membersIds?.map(String).includes(String(targetUserId))
      ),
  },
  project_user: {
    'project:read': ({ user, project }: SessionContext) =>
      project?.membersIds?.map(String).includes(String(user?.id)),

    'dictionary:read': ({ user, project }: SessionContext) =>
      project?.membersIds?.map(String).includes(String(user?.id)),
    'dictionary:write': ({ user, project }: SessionContext) =>
      project?.membersIds?.map(String).includes(String(user?.id)),

    'tag:read': () => true,
    'tag:write': () => true,
    'tag:admin': ({ user, organization }: SessionContext) =>
      organization?.adminsIds?.map(String).includes(String(user?.id)),

    'user:read': ({
      project,
      targetUserIds,
    }: SessionContext & { targetUserIds: User['id'][] }) =>
      targetUserIds.every((targetUserId) =>
        project?.membersIds?.map(String).includes(String(targetUserId))
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
