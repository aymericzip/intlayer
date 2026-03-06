import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@utils/s3/s3Client';

/**
 * Uploads a screenshot buffer to S3/R2 and returns the public URL.
 */
export const uploadShowcaseScreenshot = async (
  screenshotBuffer: Buffer
): Promise<string> => {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: screenshotBuffer,
      ContentType: 'image/jpeg',
    })
  );

  const imageUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

  return imageUrl;
};
