import { describe, expect, it } from 'vitest';
import type { ProjectAPI } from '@/types/project.types';
import { mapProjectToAPI } from './project';

const project = {
  id: '0123456789abcdef01234567',
  name: 'Project',
  organizationId: '0123456789abcdef01234568',
  membersIds: [],
  adminsIds: [],
  creatorId: '0123456789abcdef01234569',
  createdAt: 0,
  updatedAt: 0,
  oAuth2Access: [
    {
      id: 'key-id',
      name: 'CI',
      grants: ['dictionary:read'],
      clientId: 'client-id',
      clientSecret: 'client-secret',
      accessToken: ['live-bearer-token'],
      userId: '0123456789abcdef01234569',
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  repository: {
    provider: 'github',
    owner: 'owner',
    repository: 'repo',
    branch: 'main',
    url: 'https://github.com/owner/repo',
    configFilePath: 'intlayer.config.ts',
    token: 'repo-scoped-token',
  },
} as unknown as ProjectAPI;

describe('mapProjectToAPI', () => {
  it('removes the live bearer tokens of access keys', () => {
    const accessKey = mapProjectToAPI(project).oAuth2Access[0];

    expect(accessKey).not.toHaveProperty('accessToken');
    // The secret is still shown to members (dashboard copy + CLI login)
    expect(accessKey.clientSecret).toBe('client-secret');
  });

  it('removes the repo-scoped git provider token', () => {
    const { repository } = mapProjectToAPI(project);

    expect(repository).not.toHaveProperty('token');
    expect(repository?.owner).toBe('owner');
  });

  it('keeps projects without repository untouched', () => {
    const { repository } = mapProjectToAPI({
      ...project,
      repository: undefined,
    });

    expect(repository).toBeUndefined();
  });
});
