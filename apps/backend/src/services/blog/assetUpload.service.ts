import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@utils/s3/s3Client';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
] as const;

/** Maximum raw file size accepted before upload (10 MB). */
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export type AssetValidationError = 'UNSUPPORTED_TYPE' | 'TOO_LARGE';

/**
 * Validates an asset upload before sending it to S3.
 * Returns an error code on failure, null on success.
 */
export const validateAssetUpload = (
  contentType: string,
  contentLength: number
): AssetValidationError | null => {
  if (
    !ALLOWED_MIME_TYPES.includes(
      contentType as (typeof ALLOWED_MIME_TYPES)[number]
    )
  ) {
    return 'UNSUPPORTED_TYPE';
  }

  if (contentLength > MAX_SIZE_BYTES) return 'TOO_LARGE';

  return null;
};

/** Returns the extension to use for the stored file given a MIME type. */
const getExtensionForMimeType = (mimeType: string): string => {
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/svg+xml': '.svg',
  };
  return map[mimeType] ?? '.bin';
};

/**
 * Derives a safe S3 key for an asset.
 * Pattern: assets/{projectId}/{uuid}{ext}
 */
const getAssetKey = (
  projectId: string,
  originalName: string,
  mimeType: string
): string => {
  const uuid = randomUUID();
  const ext =
    extname(originalName).toLowerCase() || getExtensionForMimeType(mimeType);
  return `assets/${projectId}/${uuid}${ext}`;
};

export type UploadAssetResult = {
  /** S3 object key — stored in DB for future deletion. */
  s3Key: string;
  /** Publicly accessible CDN URL. */
  publicUrl: string;
  /** Bytes actually stored (same as the input buffer length). */
  size: number;
};

/**
 * Uploads an asset buffer to S3 and returns its public URL and key.
 */
export const uploadAsset = async (
  buffer: Buffer,
  projectId: string,
  originalName: string,
  mimeType: string
): Promise<UploadAssetResult> => {
  const key = getAssetKey(projectId, originalName, mimeType);
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );

  const publicUrl = `${process.env.S3_PUBLIC_URL}/${key}`;

  return { s3Key: key, publicUrl, size: buffer.length };
};

/**
 * Deletes an asset from S3 by its stored key.
 */
export const deleteAssetFromS3 = async (s3Key: string): Promise<void> => {
  // Guard: only delete keys inside our assets prefix
  if (!s3Key.startsWith('assets/')) return;

  const s3Client = getS3Client();

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
    })
  );
};
