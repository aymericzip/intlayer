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
export type Resource = 'organization' | 'project' | 'dictionary' | 'tag';

/**
 * @description
 * A literal string combining a Resource and an Action, e.g. `"project:write"`.
 * This is the *unit* checked at runtime in your middleware.
 */
export type Permission = `${Resource}:${Action}`;

/**
 * @description
 * A map from each Action to a boolean indicating whether it’s allowed.
 * For example:
 * ```js
 * {
 *   read: true,
 *   write: false,
 *   admin: false
 * }
 * ```
 */
type PrivilegeSet = Record<Action, boolean | undefined>;

/**
 * @description
 * A map of Resources → PrivilegeSet.
 * Represents “what you can do on each resource.”
 * Wildcards (`'*'`) should be expanded to `{read: true, write: true, admin: true}`.
 */
type PrivilegeMap = Record<Resource, Partial<PrivilegeSet> | '*'>;

type RolePolicy = Record<Roles, Partial<PrivilegeMap> | '*'>;

export const ROLE_POLICY: RolePolicy = {
  admin: '*',
  org_admin: {
    organization: '*',
    project: '*',
    dictionary: '*',
    tag: '*',
  },
  org_user: {
    organization: {
      read: true,
    },
  },
  project_admin: {
    project: {
      read: true,
    },
    dictionary: '*',
    tag: '*',
  },
  project_user: {
    project: {
      read: true,
    },
    dictionary: '*',
  },
  project_reviewer: {
    dictionary: '*',
  },
};

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

  const isOrganizationMember = organization!.membersIds
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

const expandPolicyWildcard = (
  policy: '*' | Partial<PrivilegeMap>
): Partial<PrivilegeMap> => {
  if (policy === '*') {
    return {
      organization: '*',
      project: '*',
      dictionary: '*',
      tag: '*',
    };
  }
  return policy;
};

const expandResourceWildcard = (
  privilegeList: '*' | Partial<PrivilegeSet>
): Partial<PrivilegeSet> => {
  if (privilegeList === '*') {
    return {
      read: true,
      write: true,
      admin: true,
    };
  }
  return privilegeList;
};

type FullPrivilegeList = Record<Resource, Partial<PrivilegeSet>>;

export const computeEffectivePrivileges = (
  roles: Roles[]
): FullPrivilegeList => {
  // If admin role is present, it takes full precedence
  if (roles.includes('admin')) {
    const adminPolicy = expandPolicyWildcard(ROLE_POLICY.admin);
    const result: FullPrivilegeList = {} as FullPrivilegeList;

    Object.entries(adminPolicy).forEach(([resource, privileges]) => {
      const resourceKey = resource as Resource;
      result[resourceKey] = expandResourceWildcard(
        privileges as Partial<PrivilegeSet>
      );
    });

    return result;
  }

  // First convert roles to policy objects, handling any '*' values
  const policiesForRoles = roles.reduce<RolePolicy>((acc, role) => {
    acc[role] = expandPolicyWildcard(ROLE_POLICY[role]);
    return acc;
  }, {} as RolePolicy);

  // Then merge all role policies into a single privilege list
  const mergedPrivileges: FullPrivilegeList = Object.values(
    policiesForRoles
  ).reduce<FullPrivilegeList>((acc, rolePolicy) => {
    // For each resource in the role's policy
    Object.entries(rolePolicy).forEach(([resource, privileges]) => {
      const resourceKey = resource as Resource;
      const currentPrivileges = acc[resourceKey] || {};
      const newPrivileges = expandResourceWildcard(
        privileges as Partial<PrivilegeSet>
      );

      // Merge privileges, taking the union of all allowed actions
      acc[resourceKey] = {
        ...currentPrivileges,
        ...newPrivileges,
      };
    });
    return acc;
  }, {} as FullPrivilegeList);

  return mergedPrivileges;
};

/**
 * Format object as
 * ```
 * {
 *   dictionary: {
 *     read: true,
 *     write: true,
 *     admin: true,
 *   },
 * }
 * ```
 * to array list as `["dictionary:read", "dictionary:write", "dictionary:admin"]`
 */
export const formatPermissions = (
  permissions: Partial<FullPrivilegeList>
): Permission[] =>
  Object.entries(permissions).flatMap(([resource, privileges]) =>
    Object.entries(privileges)
      .filter(([_, isAllowed]) => isAllowed)
      .map(([action]) => `${resource}:${action}`)
  ) as Permission[];

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
