import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@utils/s3/s3Client';

/**
 * Uploads a screenshot buffer to S3/R2 and returns the public URL.
 */
export const uploadShowcaseScreenshot = async (
  screenshotBuffer: Buffer
): Promise<string> => {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
  const s3Client = getS3Client();

  console.log({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: screenshotBuffer,
    ContentType: 'image/jpeg',
  });

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: screenshotBuffer,
      ContentType: 'image/jpeg',
    })
  );

  const imageUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

  return imageUrl;
};

/**
 * Deletes a previously uploaded screenshot from S3/R2.
 * Accepts the full public URL and extracts the key from the last path segment.
 */
export const deleteShowcaseScreenshot = async (
  imageUrl: string
): Promise<void> => {
  const key = imageUrl.split('/').pop();
  if (!key) return;

  const s3Client = getS3Client();
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    })
  );
};
