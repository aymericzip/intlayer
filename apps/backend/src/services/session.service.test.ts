import { beforeEach, describe, expect, it, vi } from 'vitest';

const sessionUpdateOne = vi.fn();
const userUpdateOne = vi.fn();

vi.mock('@schemas/session.schema', () => ({
  SessionModel: { updateOne: sessionUpdateOne },
}));
vi.mock('@schemas/user.schema', () => ({
  UserModel: { updateOne: userUpdateOne },
}));

const { setActiveSessionContext } = await import('./session.service');

const sessionId = '64b000000000000000000001';
const userId = '64b000000000000000000002';
const organizationId = '64b000000000000000000003';
const projectId = '64b000000000000000000004';

describe('setActiveSessionContext', () => {
  beforeEach(() => {
    sessionUpdateOne.mockReset();
    userUpdateOne.mockReset();
  });

  it('activates an organization and clears the project context', async () => {
    await setActiveSessionContext({
      sessionId,
      userId,
      organizationId,
      projectId: null,
    });

    expect(sessionUpdateOne).toHaveBeenCalledWith(
      { _id: sessionId },
      {
        $set: {
          activeOrganizationId: organizationId,
          activeProjectId: null,
          activeEnvironmentId: null,
        },
      }
    );
    expect(userUpdateOne).toHaveBeenCalledTimes(1);
    expect(String(userUpdateOne.mock.calls[0]?.[0]._id)).toBe(userId);
    expect(userUpdateOne.mock.calls[0]?.[1]).toEqual({
      $set: {
        lastActiveOrganizationId: organizationId,
        lastActiveProjectId: null,
      },
    });
  });

  it('activates a project on the given environment', async () => {
    await setActiveSessionContext({
      sessionId,
      userId,
      organizationId,
      projectId,
      environmentId: 'environment-1',
    });

    expect(sessionUpdateOne).toHaveBeenCalledWith(
      { _id: sessionId },
      {
        $set: {
          activeOrganizationId: organizationId,
          activeProjectId: projectId,
          activeEnvironmentId: 'environment-1',
        },
      }
    );
  });

  it('skips the user write when no user is known', async () => {
    await setActiveSessionContext({
      sessionId,
      userId: null,
      organizationId,
      projectId: null,
    });

    expect(sessionUpdateOne).toHaveBeenCalledTimes(1);
    expect(userUpdateOne).not.toHaveBeenCalled();
  });
});
