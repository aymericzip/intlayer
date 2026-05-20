import { randomBytes } from 'node:crypto';
import { CliSessionTokenModel } from '@schemas/cliSessionToken.schema';
import { getOrganizationById } from '@services/organization.service';
import { getProjectById } from '@services/project.service';
import { getUserById } from '@services/user.service';
import { GenericError } from '@utils/errors';
import { mapOrganizationToAPI } from '@utils/mapper/organization';
import { mapProjectToAPI } from '@utils/mapper/project';
import { mapUserToAPI } from '@utils/mapper/user';
import type { Types } from 'mongoose';
import type { SessionContext } from '@/types/session.types';

export const CLI_SESSION_TOKEN_PREFIX = 'clisession_';
const CLI_SESSION_EXPIRES_MS = 2 * 60 * 60 * 1000; // 2 hours

export const isCliSessionToken = (token: string): boolean =>
  token.startsWith(CLI_SESSION_TOKEN_PREFIX);

export const createCliSessionToken = async (
  userId: string | Types.ObjectId,
  organizationId: string,
  projectId: string
): Promise<{ token: string; expiresAt: Date }> => {
  const token = CLI_SESSION_TOKEN_PREFIX + randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + CLI_SESSION_EXPIRES_MS);

  await CliSessionTokenModel.create({
    token,
    userId,
    organizationId,
    projectId,
    expiresAt,
  });

  return { token, expiresAt };
};

export const getCliSessionTokenContext = async (
  token: string
): Promise<SessionContext> => {
  if (!isCliSessionToken(token)) {
    throw new GenericError('INVALID_ACCESS_TOKEN');
  }

  const stored = await CliSessionTokenModel.findOne({ token: String(token) });

  if (!stored) {
    throw new GenericError('INVALID_ACCESS_TOKEN');
  }

  if (new Date() > stored.expiresAt) {
    await CliSessionTokenModel.deleteOne({ token: String(token) });
    throw new GenericError('EXPIRED_ACCESS_TOKEN');
  }

  const [user, project, organization] = await Promise.all([
    getUserById(String(stored.userId)),
    getProjectById(stored.projectId),
    getOrganizationById(stored.organizationId),
  ]);

  if (!user || !project || !organization) {
    throw new GenericError('INVALID_ACCESS_TOKEN');
  }

  return {
    user: mapUserToAPI(user),
    project: mapProjectToAPI(project),
    organization: mapOrganizationToAPI(organization),
    authType: 'session',
  };
};
