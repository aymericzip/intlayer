import { describe, expect, it } from 'vitest';
import {
  computeEffectivePermission,
  getSessionRoles,
  hasPermission,
  type Permission,
} from './permissions';

const userId = 'user-1';

const createSession = (projectOverrides: Record<string, unknown> = {}) => ({
  user: { id: userId, email: 'member@example.com' },
  organization: {
    id: 'organization-1',
    membersIds: [userId],
    adminsIds: [],
  },
  project: {
    id: 'project-1',
    organizationId: 'organization-1',
    membersIds: [userId],
    adminsIds: [],
    ...projectOverrides,
  },
});

const canReadAnalytics = (
  session: ReturnType<typeof createSession>,
  permissions?: Permission[]
): boolean => {
  const roles = getSessionRoles(session as never);

  return Boolean(
    hasPermission(
      roles,
      'analytics:read'
    )({
      ...session,
      ...(permissions && { permissions }),
    })
  );
};

describe('analytics:read', () => {
  it('is granted to project members', () => {
    expect(canReadAnalytics(createSession())).toBe(true);
  });

  it('is granted to project reviewers (demo access)', () => {
    expect(
      canReadAnalytics(createSession({ membersIds: [], viewersIds: [userId] }))
    ).toBe(true);
  });

  it('is denied outside the project', () => {
    const session = createSession({ membersIds: [] });
    session.organization.membersIds = [];

    expect(canReadAnalytics(session)).toBe(false);
  });

  it('is part of a member session effective permissions', () => {
    const roles = getSessionRoles(createSession() as never);

    expect(computeEffectivePermission(roles)).toContain('analytics:read');
  });
});

describe('hasPermission with access key grants', () => {
  it('denies a permission the session was not granted', () => {
    expect(canReadAnalytics(createSession(), ['dictionary:read'])).toBe(false);
  });

  it('allows a granted permission the role also allows', () => {
    expect(canReadAnalytics(createSession(), ['analytics:read'])).toBe(true);
  });

  it('never grants beyond the role policy', () => {
    const roles = getSessionRoles(createSession() as never);

    expect(
      hasPermission(
        roles,
        'project:admin'
      )({
        ...createSession(),
        permissions: ['project:admin'],
        targetProjectIds: ['project-1'],
      })
    ).toBeFalsy();
  });
});
