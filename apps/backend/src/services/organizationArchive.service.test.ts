import { Types } from 'mongoose';
import { afterEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();

vi.mock('@utils/s3/s3Client', () => ({
  getS3Client: () => ({ send: sendMock }),
}));
vi.mock('@schemas/organization.schema', () => ({ OrganizationModel: {} }));
vi.mock('@schemas/project.schema', () => ({ ProjectModel: {} }));
vi.mock('@schemas/dictionary.schema', () => ({ DictionaryModel: {} }));
vi.mock('@schemas/tag.schema', () => ({ TagModel: {} }));
vi.mock('@schemas/discussion.schema', () => ({ DiscussionModel: {} }));
vi.mock('@schemas/asset.schema', () => ({ AssetModel: {} }));

const {
  archiveOrganization,
  getOrganizationArchivePrefix,
  removeProjectSecrets,
} = await import('./organizationArchive.service');

const originalArchiveBucketName = process.env.S3_ARCHIVE_BUCKET_NAME;

afterEach(() => {
  process.env.S3_ARCHIVE_BUCKET_NAME = originalArchiveBucketName;
  sendMock.mockReset();
});

describe('removeProjectSecrets', () => {
  it('drops access key secrets, tokens and the repository token', () => {
    const project = removeProjectSecrets({
      name: 'Website',
      oAuth2Access: [
        {
          clientId: 'client',
          clientSecret: 'secret',
          accessToken: ['token'],
          name: 'CI',
        },
      ],
      repository: { provider: 'github', token: 'repository-token' },
    });

    expect(project).toEqual({
      name: 'Website',
      oAuth2Access: [{ clientId: 'client', name: 'CI' }],
      repository: { provider: 'github' },
    });
  });
});

describe('getOrganizationArchivePrefix', () => {
  it('builds a key-safe folder per organization and date', () => {
    expect(
      getOrganizationArchivePrefix(
        'org-id',
        new Date('2026-11-20T03:00:00.000Z')
      )
    ).toBe('archives/organizations/org-id/2026-11-20T03-00-00-000Z');
  });
});

describe('archiveOrganization', () => {
  it('refuses to archive without a private archive bucket', async () => {
    delete process.env.S3_ARCHIVE_BUCKET_NAME;

    await expect(archiveOrganization(new Types.ObjectId())).rejects.toThrow();
    expect(sendMock).not.toHaveBeenCalled();
  });
});
