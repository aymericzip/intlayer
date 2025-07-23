import { Session } from '@/types/session.types';

export type Roles =
  | 'admin'
  | 'org_admin'
  | 'org_user'
  | 'project_admin'
  | 'project_user'
  | 'project_reviewer';

// actions each endpoint cares about
export type Action = 'read' | 'write' | 'admin';

// top‑level resources
export type Resource = 'organization' | 'project' | 'dictionary' | 'tag';

type ActionRuleRecord = Record<Action, boolean | undefined>;

type PrivilegeList = Record<Resource, Partial<ActionRuleRecord> | '*'>;

type RolePrivilege = Record<Roles, Partial<PrivilegeList> | '*'>;

export const POLICY: RolePrivilege = {
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

export const getSessionRoles = ({ user, organization, project }: Session) => {
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

  const isOrganizationAdmin = organization.adminsIds?.includes(user!.id);

  if (isOrganizationAdmin) {
    roles.push('org_admin');
  }

  const isOrganizationMember = organization!.membersIds.includes(user!.id);

  if (isOrganizationMember) {
    roles.push('org_user');
  }

  if (!project) {
    return roles;
  }

  const isProjectAdmin = project.adminsIds?.includes(user!.id);

  if (isProjectAdmin) {
    roles.push('project_admin');
  }

  const isProjectMember = project?.membersIds.includes(user!.id);

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

const replaceStarRolePrivilege = (
  policy: '*' | Partial<PrivilegeList>
): Partial<PrivilegeList> => {
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

const replaceStarPrivilegeList = (
  privilegeList: '*' | Partial<ActionRuleRecord>
): Partial<ActionRuleRecord> => {
  if (privilegeList === '*') {
    return {
      read: true,
      write: true,
      admin: true,
    };
  }
  return privilegeList;
};

type FullPrivilegeList = Record<Resource, Partial<ActionRuleRecord>>;

export const mergeRolesPolicy = (roles: Roles[]): FullPrivilegeList => {
  // If admin role is present, it takes full precedence
  if (roles.includes('admin')) {
    const adminPolicy = replaceStarRolePrivilege(POLICY.admin);
    const result: FullPrivilegeList = {} as FullPrivilegeList;

    Object.entries(adminPolicy).forEach(([resource, privileges]) => {
      const resourceKey = resource as Resource;
      result[resourceKey] = replaceStarPrivilegeList(
        privileges as Partial<ActionRuleRecord>
      );
    });

    return result;
  }

  // First convert roles to policy objects, handling any '*' values
  const policiesForRoles = roles.reduce<RolePrivilege>((acc, role) => {
    acc[role] = replaceStarRolePrivilege(POLICY[role]);
    return acc;
  }, {} as RolePrivilege);

  // Then merge all role policies into a single privilege list
  const mergedPrivileges: FullPrivilegeList = Object.values(
    policiesForRoles
  ).reduce<FullPrivilegeList>((acc, rolePolicy) => {
    // For each resource in the role's policy
    Object.entries(rolePolicy).forEach(([resource, privileges]) => {
      const resourceKey = resource as Resource;
      const currentPrivileges = acc[resourceKey] || {};
      const newPrivileges = replaceStarPrivilegeList(
        privileges as Partial<ActionRuleRecord>
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
export const formatPrivilegeList = (
  privilegeList: Partial<FullPrivilegeList>
): string[] =>
  Object.entries(privilegeList).flatMap(([resource, privileges]) =>
    Object.entries(privileges)
      .filter(([_, isAllowed]) => isAllowed)
      .map(([action]) => `${resource}:${action}`)
  );
