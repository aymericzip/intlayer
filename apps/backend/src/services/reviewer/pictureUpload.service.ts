import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { resizeImage } from '@utils/image/resizeImage';
import { getS3Client } from '@utils/s3/s3Client';

export type ReviewerPictureKind = 'main' | 'cover';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB pre-resize

const RESIZE_CONFIG: Record<ReviewerPictureKind, { width: number; height: number; quality: number }> = {
  main: { width: 1280, height: 720, quality: 82 },
  cover: { width: 1500, height: 500, quality: 80 },
};

export type PictureValidationError = 'UNSUPPORTED_TYPE' | 'TOO_LARGE';

export const validateReviewerPictureUpload = (
  contentType: string,
  contentLength: number
): PictureValidationError | null => {
  if (!ALLOWED_MIME_TYPES.includes(contentType)) return 'UNSUPPORTED_TYPE';
  if (contentLength > MAX_SIZE_BYTES) return 'TOO_LARGE';
  return null;
};

const getPictureKey = (reviewerId: string, kind: ReviewerPictureKind): string =>
  `reviewer-pictures/${reviewerId}-${kind}.jpg`;

export const uploadReviewerPicture = async (
  buffer: Buffer,
  reviewerId: string,
  kind: ReviewerPictureKind,
): Promise<string> => {
  const cfg = RESIZE_CONFIG[kind];
  const { buffer: resized, contentType } = await resizeImage(buffer, cfg);

  const key = getPictureKey(reviewerId, kind);
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: resized,
      ContentType: contentType,
    })
  );

  return `${process.env.S3_PUBLIC_URL}/${key}`;
};

export const deleteReviewerPicture = async (
  imageUrl: string
): Promise<void> => {
  const publicUrl = process.env.S3_PUBLIC_URL ?? '';
  const key = imageUrl.startsWith(publicUrl)
    ? imageUrl.slice(publicUrl.length + 1)
    : null;

  if (!key?.startsWith('reviewer-pictures/')) return;

  const s3Client = getS3Client();
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    })
  );
};
