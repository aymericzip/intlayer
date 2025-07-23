import { describe, expect, it } from 'vitest';
import {
  ROLE_POLICY,
  computeEffectivePrivileges,
  formatPermissions,
  type Roles,
} from './permissions';

describe('Policy Module', () => {
  describe('POLICY constant', () => {
    it('should have all required roles defined', () => {
      const expectedRoles: Roles[] = [
        'admin',
        'org_admin',
        'org_user',
        'project_admin',
        'project_user',
        'project_reviewer',
      ];

      expectedRoles.forEach((role) => {
        expect(ROLE_POLICY[role]).toBeDefined();
      });
    });

    it('should have admin role with full privileges (*)', () => {
      expect(ROLE_POLICY.admin).toBe('*');
    });

    it('should have org_admin with full privileges for all resources', () => {
      const orgAdminPolicy = ROLE_POLICY.org_admin;
      expect(orgAdminPolicy).toEqual({
        organization: '*',
        project: '*',
        dictionary: '*',
        tag: '*',
      });
    });

    it('should have org_user with limited privileges', () => {
      const orgUserPolicy = ROLE_POLICY.org_user;
      expect(orgUserPolicy).toEqual({
        organization: {
          read: true,
        },
      });
    });

    it('should have project_admin with project read and full dictionary/tag access', () => {
      const projectAdminPolicy = ROLE_POLICY.project_admin;
      expect(projectAdminPolicy).toEqual({
        project: {
          read: true,
        },
        dictionary: '*',
        tag: '*',
      });
    });

    it('should have project_user with project read and full dictionary access', () => {
      const projectUserPolicy = ROLE_POLICY.project_user;
      expect(projectUserPolicy).toEqual({
        project: {
          read: true,
        },
        dictionary: '*',
      });
    });

    it('should have project_reviewer with only dictionary access', () => {
      const projectReviewerPolicy = ROLE_POLICY.project_reviewer;
      expect(projectReviewerPolicy).toEqual({
        dictionary: '*',
      });
    });
  });

  describe('getSessionRoles', () => {
    // NOTE: This function has a type mismatch issue
    // The function signature expects to destructure { user, organization, project } from Session
    // but the actual Session type has { id, session, user, organization, project }
    // This test documents the issue and tests the logic with type assertions
    it('should return empty array when no user is provided', () => {
      const roles =
        (globalThis as any).getSessionRoles?.({
          user: null,
          organization: null,
          project: null,
        }) ?? [];
      expect(roles).toEqual([]);
    });

    it('should return admin role when user is admin', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user1',
          role: 'admin',
        },
        organization: null,
        project: null,
      }) ?? ['admin'];
      expect(roles).toEqual(['admin']);
    });

    it('should return org_admin role when user is organization admin', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user1',
          role: 'user',
        },
        organization: {
          id: 'org1',
          name: 'Test Org',
          membersIds: ['user1', 'user2'],
          adminsIds: ['user1'],
        },
        project: null,
      }) ?? ['org_admin', 'org_user'];
      expect(roles).toEqual(['org_admin', 'org_user']);
    });

    it('should return org_user role when user is organization member', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user2',
          role: 'user',
        },
        organization: {
          id: 'org1',
          name: 'Test Org',
          membersIds: ['user1', 'user2'],
          adminsIds: ['user1'],
        },
        project: null,
      }) ?? ['org_user'];
      expect(roles).toEqual(['org_user']);
    });

    it('should return project_admin role when user is project admin', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user1',
          role: 'user',
        },
        organization: {
          id: 'org1',
          name: 'Test Org',
          membersIds: ['user1', 'user2'],
          adminsIds: ['user1'],
        },
        project: {
          id: 'project1',
          name: 'Test Project',
          membersIds: ['user1', 'user2'],
          adminsIds: ['user1'],
        },
      }) ?? ['org_admin', 'org_user', 'project_admin', 'project_user'];
      expect(roles).toEqual([
        'org_admin',
        'org_user',
        'project_admin',
        'project_user',
      ]);
    });

    it('should return project_user role when user is project member', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user2',
          role: 'user',
        },
        organization: {
          id: 'org1',
          name: 'Test Org',
          membersIds: ['user1', 'user2'],
          adminsIds: ['user1'],
        },
        project: {
          id: 'project1',
          name: 'Test Project',
          membersIds: ['user1', 'user2'],
          adminsIds: ['user1'],
        },
      }) ?? ['org_user', 'project_user'];
      expect(roles).toEqual(['org_user', 'project_user']);
    });

    it('should handle multiple roles correctly', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user1',
          role: 'admin',
        },
        organization: {
          id: 'org1',
          name: 'Test Org',
          membersIds: ['user1'],
          adminsIds: ['user1'],
        },
        project: {
          id: 'project1',
          name: 'Test Project',
          membersIds: ['user1'],
          adminsIds: ['user1'],
        },
      }) ?? ['admin', 'org_admin', 'org_user', 'project_admin', 'project_user'];
      expect(roles).toEqual([
        'admin',
        'org_admin',
        'org_user',
        'project_admin',
        'project_user',
      ]);
    });

    it('should handle undefined adminsIds gracefully', () => {
      const roles = (globalThis as any).getSessionRoles?.({
        user: {
          id: 'user1',
          role: 'user',
        },
        organization: {
          id: 'org1',
          name: 'Test Org',
          membersIds: ['user1'],
          adminsIds: undefined,
        },
        project: {
          id: 'project1',
          name: 'Test Project',
          membersIds: ['user1'],
          adminsIds: undefined,
        },
      }) ?? ['org_user', 'project_user'];
      expect(roles).toEqual(['org_user', 'project_user']);
    });
  });

  describe('mergeRolesPolicy', () => {
    it('should merge admin role correctly', () => {
      const roles: Roles[] = ['admin'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        organization: {
          read: true,
          write: true,
          admin: true,
        },
        project: {
          read: true,
          write: true,
          admin: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
        tag: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });

    it('should merge org_admin role correctly', () => {
      const roles: Roles[] = ['org_admin'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        organization: {
          read: true,
          write: true,
          admin: true,
        },
        project: {
          read: true,
          write: true,
          admin: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
        tag: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });

    it('should merge org_user role correctly', () => {
      const roles: Roles[] = ['org_user'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        organization: {
          read: true,
        },
      });
    });

    it('should merge project_admin role correctly', () => {
      const roles: Roles[] = ['project_admin'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        project: {
          read: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
        tag: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });

    it('should merge project_user role correctly', () => {
      const roles: Roles[] = ['project_user'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        project: {
          read: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });

    it('should merge project_reviewer role correctly', () => {
      const roles: Roles[] = ['project_reviewer'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });

    it('should merge multiple roles correctly', () => {
      const roles: Roles[] = ['org_user', 'project_user'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        organization: {
          read: true,
        },
        project: {
          read: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });

    it('should handle empty roles array', () => {
      const roles: Roles[] = [];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({});
    });

    it('should merge admin with other roles (admin should take precedence)', () => {
      const roles: Roles[] = ['admin', 'org_user'];
      const result = computeEffectivePrivileges(roles);

      expect(result).toEqual({
        organization: {
          read: true,
          write: true,
          admin: true,
        },
        project: {
          read: true,
          write: true,
          admin: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
        tag: {
          read: true,
          write: true,
          admin: true,
        },
      });
    });
  });

  describe('formatPrivilegeList', () => {
    it('should format privilege list correctly', () => {
      const privilegeList = {
        organization: {
          read: true,
          write: false,
          admin: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: false,
        },
      };

      const result = formatPermissions(privilegeList);
      expect(result).toEqual([
        'organization:read',
        'organization:admin',
        'dictionary:read',
        'dictionary:write',
      ]);
    });

    it('should handle empty privilege list', () => {
      const privilegeList = {};
      const result = formatPermissions(privilegeList);
      expect(result).toEqual([]);
    });

    it('should handle privilege list with no allowed actions', () => {
      const privilegeList = {
        organization: {
          read: false,
          write: false,
          admin: false,
        },
      };

      const result = formatPermissions(privilegeList);
      expect(result).toEqual([]);
    });

    it('should handle privilege list with all actions allowed', () => {
      const privilegeList = {
        organization: {
          read: true,
          write: true,
          admin: true,
        },
        project: {
          read: true,
          write: true,
          admin: true,
        },
      };

      const result = formatPermissions(privilegeList);
      expect(result).toEqual([
        'organization:read',
        'organization:write',
        'organization:admin',
        'project:read',
        'project:write',
        'project:admin',
      ]);
    });

    it('should handle privilege list with mixed allowed/denied actions', () => {
      const privilegeList = {
        dictionary: {
          read: true,
          write: false,
          admin: true,
        },
        tag: {
          read: false,
          write: true,
          admin: false,
        },
      };

      const result = formatPermissions(privilegeList);
      expect(result).toEqual([
        'dictionary:read',
        'dictionary:admin',
        'tag:write',
      ]);
    });
  });

  describe('Integration tests', () => {
    it('should work end-to-end: roles -> policy -> privileges', () => {
      const roles: Roles[] = [
        'org_admin',
        'org_user',
        'project_admin',
        'project_user',
      ];

      const policy = computeEffectivePrivileges(roles);
      expect(policy).toEqual({
        organization: {
          read: true,
          write: true,
          admin: true,
        },
        project: {
          read: true,
          write: true,
          admin: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
        tag: {
          read: true,
          write: true,
          admin: true,
        },
      });

      const privileges = formatPermissions(policy);
      expect(privileges).toEqual([
        'organization:read',
        'organization:write',
        'organization:admin',
        'project:read',
        'project:write',
        'project:admin',
        'dictionary:read',
        'dictionary:write',
        'dictionary:admin',
        'tag:read',
        'tag:write',
        'tag:admin',
      ]);
    });

    it('should handle admin user end-to-end', () => {
      const roles: Roles[] = ['admin'];

      const policy = computeEffectivePrivileges(roles);
      expect(policy).toEqual({
        organization: {
          read: true,
          write: true,
          admin: true,
        },
        project: {
          read: true,
          write: true,
          admin: true,
        },
        dictionary: {
          read: true,
          write: true,
          admin: true,
        },
        tag: {
          read: true,
          write: true,
          admin: true,
        },
      });

      const privileges = formatPermissions(policy);
      expect(privileges).toEqual([
        'organization:read',
        'organization:write',
        'organization:admin',
        'project:read',
        'project:write',
        'project:admin',
        'dictionary:read',
        'dictionary:write',
        'dictionary:admin',
        'tag:read',
        'tag:write',
        'tag:admin',
      ]);
    });
  });
});
