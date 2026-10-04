import type { UserRoutes } from '@intlayer/backend-contract/user';
import type { ContractRequest } from '@utils/contract/registerContractRoutes';
import type { FastifyReply } from 'fastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { userServiceMock, sendVerificationEmailMock } = vi.hoisted(() => ({
  userServiceMock: {
    getUserById: vi.fn(),
    getUserByEmail: vi.fn(),
    updateUserById: vi.fn(),
  },
  sendVerificationEmailMock: vi.fn(),
}));

vi.mock('@services/user.service', () => userServiceMock);
vi.mock('@services/email.service', () => ({ sendEmail: vi.fn() }));
vi.mock('@services/user/avatarUpload.service', () => ({
  deleteUserAvatar: vi.fn(),
  uploadUserAvatar: vi.fn(),
  validateAvatarUpload: vi.fn(),
}));
vi.mock('@utils/auth/getAuth', () => ({
  getAuthSingleton: () => ({
    api: { sendVerificationEmail: sendVerificationEmailMock },
  }),
}));
vi.mock('@logger', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn() },
}));

const { updateUser } = await import('./user.controller');

type UpdateUserRequest = ContractRequest<UserRoutes['updateUser']>;
type UpdateUserBody = UpdateUserRequest['body'];

const targetUserId = '0123456789abcdef01234567';
const adminUserId = 'aaaaaaaaaaaaaaaaaaaaaaaa';

const targetUser = {
  id: targetUserId,
  email: 'old@example.org',
  name: 'Target',
  emailVerified: true,
};

/** Builds a request as the contract hands it to the controller. */
const createRequest = (
  body: UpdateUserBody,
  roles: string[]
): UpdateUserRequest =>
  ({
    body,
    session: {
      user: { id: adminUserId, email: 'admin@example.org' },
      roles,
    },
  }) as unknown as UpdateUserRequest;

/** Records the status and payload the controller answers with. */
const createReply = () => {
  const reply = {
    statusCode: 200,
    payload: undefined as unknown,
    request: undefined,
    code: vi.fn((statusCode: number) => {
      reply.statusCode = statusCode;
      return reply;
    }),
    status: vi.fn((statusCode: number) => {
      reply.statusCode = statusCode;
      return reply;
    }),
    send: vi.fn((payload: unknown) => {
      reply.payload = payload;
      return reply;
    }),
  };

  return reply;
};

describe('updateUser email changes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    userServiceMock.getUserById.mockResolvedValue(targetUser);
    userServiceMock.getUserByEmail.mockResolvedValue(null);
    userServiceMock.updateUserById.mockImplementation(
      async (_userId: string, updates: Record<string, unknown>) => ({
        ...targetUser,
        ...updates,
      })
    );
    sendVerificationEmailMock.mockResolvedValue({ status: true });
  });

  it('lets an admin set a new email, saved unverified, and sends a verification link', async () => {
    const reply = createReply();

    await updateUser(
      createRequest({ id: targetUserId, email: '  New@Example.org ' }, [
        'admin',
      ]),
      reply as unknown as FastifyReply
    );

    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(targetUserId, {
      id: targetUserId,
      email: 'new@example.org',
      emailVerified: false,
    });
    expect(sendVerificationEmailMock).toHaveBeenCalledWith({
      body: { email: 'new@example.org', callbackURL: process.env.APP_URL },
    });
    expect(reply.statusCode).toBe(200);
  });

  it('keeps the new email verified when the admin says so, without sending a link', async () => {
    await updateUser(
      createRequest(
        { id: targetUserId, email: 'new@example.org', emailVerified: true },
        ['admin']
      ),
      createReply() as unknown as FastifyReply
    );

    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(
      targetUserId,
      expect.objectContaining({
        email: 'new@example.org',
        emailVerified: true,
      })
    );
    expect(sendVerificationEmailMock).not.toHaveBeenCalled();
  });

  it('rejects an email already used by another user', async () => {
    userServiceMock.getUserByEmail.mockResolvedValue({
      id: 'bbbbbbbbbbbbbbbbbbbbbbbb',
      email: 'taken@example.org',
    });
    const reply = createReply();

    await updateUser(
      createRequest({ id: targetUserId, email: 'taken@example.org' }, [
        'admin',
      ]),
      reply as unknown as FastifyReply
    );

    expect(userServiceMock.updateUserById).not.toHaveBeenCalled();
    expect(reply.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('leaves the verification status alone when the email is unchanged', async () => {
    await updateUser(
      createRequest(
        { id: targetUserId, email: 'OLD@example.org', name: 'Renamed' },
        ['admin']
      ),
      createReply() as unknown as FastifyReply
    );

    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(targetUserId, {
      id: targetUserId,
      name: 'Renamed',
    });
    expect(sendVerificationEmailMock).not.toHaveBeenCalled();
  });

  it('ignores the email sent by a non-admin', async () => {
    userServiceMock.getUserById.mockResolvedValue({
      ...targetUser,
      id: adminUserId,
      email: 'admin@example.org',
    });

    await updateUser(
      createRequest(
        { id: adminUserId, email: 'hijack@example.org', name: 'Self' },
        ['user']
      ),
      createReply() as unknown as FastifyReply
    );

    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(adminUserId, {
      id: adminUserId,
      name: 'Self',
    });
    expect(userServiceMock.getUserByEmail).not.toHaveBeenCalled();
  });
});
