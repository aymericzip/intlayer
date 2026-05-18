import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@utils/s3/s3Client';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const validateAvatarUpload = (
  contentType: string,
  contentLength: number
): string | null => {
  if (!ALLOWED_MIME_TYPES.includes(contentType)) {
    return `Unsupported image type: ${contentType}. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`;
  }
  if (contentLength > MAX_SIZE_BYTES) {
    return `File too large (${contentLength} bytes). Max: ${MAX_SIZE_BYTES} bytes`;
  }
  return null;
};

const getAvatarKey = (userId: string, contentType: string): string => {
  const ext = contentType.split('/')[1] ?? 'jpg';
  return `avatars/${userId}.${ext}`;
};

export const uploadUserAvatar = async (
  buffer: Buffer,
  userId: string,
  contentType: string
): Promise<string> => {
  const key = getAvatarKey(userId, contentType);
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
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
