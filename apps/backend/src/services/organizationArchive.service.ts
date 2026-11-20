import { gzipSync } from 'node:zlib';
import { CopyObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { AssetModel } from '@schemas/asset.schema';
import { DictionaryModel } from '@schemas/dictionary.schema';
import { DiscussionModel } from '@schemas/discussion.schema';
import { OrganizationModel } from '@schemas/organization.schema';
import { ProjectModel } from '@schemas/project.schema';
import { TagModel } from '@schemas/tag.schema';
import { GenericError } from '@utils/errors';
import { getS3Client } from '@utils/s3/s3Client';
import { mongo, type Types } from 'mongoose';

/** Prefix of every organization archive in the archive bucket. */
export const ORGANIZATION_ARCHIVE_PREFIX = 'archives/organizations';

/**
 * Private bucket holding organization archives. Kept apart from
 * `S3_BUCKET_NAME`, whose objects are served publicly.
 */
export const getArchiveBucketName = (): string | undefined =>
  process.env.S3_ARCHIVE_BUCKET_NAME || undefined;

/** Folder of one organization archive, e.g. `archives/organizations/<id>/<date>`. */
export const getOrganizationArchivePrefix = (
  organizationId: Types.ObjectId | string,
  archivedAt: Date
): string =>
  `${ORGANIZATION_ARCHIVE_PREFIX}/${String(organizationId)}/${archivedAt
    .toISOString()
    .replace(/[:.]/g, '-')}`;

type ProjectDocument = Record<string, unknown> & {
  oAuth2Access?: Record<string, unknown>[];
  repository?: Record<string, unknown>;
};

/**
 * Drops live credentials from an archived project: access key secrets and
 * bearer tokens, and the repository token. Restored keys must be recreated.
 */
export const removeProjectSecrets = <Project extends ProjectDocument>(
  project: Project
): Project => ({
  ...project,
  oAuth2Access: (project.oAuth2Access ?? []).map(
    ({
      clientSecret: _clientSecret,
      accessToken: _accessToken,
      ...accessKey
    }) => accessKey
  ),
  ...(project.repository
    ? {
        repository: Object.fromEntries(
          Object.entries(project.repository).filter(([key]) => key !== 'token')
        ),
      }
    : {}),
});

/**
 * Archives an organization to the private archive bucket before its deletion:
 * one gzipped Extended JSON file (organization, projects, dictionaries, tags,
 * discussions, asset records) and a copy of every asset file under `assets/`.
 *
 * Secrets are left out (mailer credentials, access key secrets and tokens,
 * repository token). Analytics, AI credit logs and session tokens are not
 * archived.
 *
 * @param organizationId - The organization to archive.
 * @param archivedAt - Archive date, part of the archive path.
 * @returns The archive folder in the archive bucket.
 * @throws GenericError `ORGANIZATION_ARCHIVE_FAILED` when no archive bucket is
 *   configured or an upload fails, so the caller never deletes unarchived data.
 */
export const archiveOrganization = async (
  organizationId: Types.ObjectId,
  archivedAt: Date = new Date()
): Promise<string> => {
  const archiveBucketName = getArchiveBucketName();

  if (!archiveBucketName) {
    throw new GenericError('ORGANIZATION_ARCHIVE_FAILED', {
      organizationId,
      reason: 'S3_ARCHIVE_BUCKET_NAME is not set',
    });
  }

  const organization = await OrganizationModel.findById(organizationId, {
    mailerConfig: 0,
  }).lean();
  const projects = await ProjectModel.find({ organizationId }).lean();
  const projectIds = projects.map((project) => project._id);

  const [dictionaries, tags, discussions, assets] = await Promise.all([
    DictionaryModel.find({ projectIds: { $in: projectIds } }).lean(),
    TagModel.find({
      $or: [{ organizationId }, { projectId: { $in: projectIds } }],
    }).lean(),
    DiscussionModel.find({
      $or: [{ organizationId }, { projectId: { $in: projectIds } }],
    }).lean(),
    AssetModel.find({ projectId: { $in: projectIds } }).lean(),
  ]);

  const archivePrefix = getOrganizationArchivePrefix(
    organizationId,
    archivedAt
  );
  const s3Client = getS3Client();

  const archive = {
    version: 1,
    archivedAt,
    organization,
    projects: projects.map((project) =>
      removeProjectSecrets(project as unknown as ProjectDocument)
    ),
    dictionaries,
    tags,
    discussions,
    assets,
  };

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: archiveBucketName,
        Key: `${archivePrefix}/data.json.gz`,
        Body: gzipSync(mongo.BSON.EJSON.stringify(archive, { relaxed: true })),
        ContentType: 'application/json',
        ContentEncoding: 'gzip',
      })
    );

    for (const asset of assets) {
      await s3Client.send(
        new CopyObjectCommand({
          Bucket: archiveBucketName,
          Key: `${archivePrefix}/${asset.s3Key}`,
          CopySource: encodeURI(`${process.env.S3_BUCKET_NAME}/${asset.s3Key}`),
        })
      );
    }
  } catch (error) {
    throw new GenericError('ORGANIZATION_ARCHIVE_FAILED', {
      organizationId,
      reason: error instanceof Error ? error.message : String(error),
    });
  }

  return archivePrefix;
};
