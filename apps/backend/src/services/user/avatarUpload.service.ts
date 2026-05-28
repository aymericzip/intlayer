import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { resizeImage } from '@utils/image/resizeImage';
import { getS3Client } from '@utils/s3/s3Client';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB pre-resize

export type AvatarValidationError = 'UNSUPPORTED_TYPE' | 'TOO_LARGE';

export const validateAvatarUpload = (
  contentType: string,
  contentLength: number
): AvatarValidationError | null => {
  if (!ALLOWED_MIME_TYPES.includes(contentType)) return 'UNSUPPORTED_TYPE';
  if (contentLength > MAX_SIZE_BYTES) return 'TOO_LARGE';
  return null;
};

const getAvatarKey = (userId: string): string => `avatars/${userId}.jpg`;

export const uploadUserAvatar = async (
  buffer: Buffer,
  userId: string
): Promise<string> => {
  const { buffer: resized, contentType } = await resizeImage(buffer, {
    width: 256,
    height: 256,
    quality: 85,
  });

  const key = getAvatarKey(userId);
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

export const deleteUserAvatar = async (imageUrl: string): Promise<void> => {
  const publicUrl = process.env.S3_PUBLIC_URL ?? '';
  const key = imageUrl.startsWith(publicUrl)
    ? imageUrl.slice(publicUrl.length + 1)
    : null;

  // Only delete avatars we own — skip external URLs (Google, GitHub, etc.)
  if (!key?.startsWith('avatars/')) return;

  const s3Client = getS3Client();
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    })
  );
};
