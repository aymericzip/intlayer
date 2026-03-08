import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@utils/s3/s3Client';

/**
 * Derives a deterministic S3 key from a website URL.
 * e.g. "https://intlayer.org" → "screenshots/intlayer_org.jpg"
 */
const getScreenshotKey = (websiteUrl: string): string => {
  const { hostname, pathname } = new URL(websiteUrl);
  const slug = (hostname + pathname)
    .replace(/\/$/, '')
    .replaceAll('.', '_')
    .replace(/[^a-z0-9.\-_]/gi, '_');

  return `screenshots/${slug}.jpg`;
};

/**
 * Uploads a screenshot buffer to S3/R2 and returns the public URL.
 * Uses the website URL as a deterministic key so re-scans overwrite the existing image.
 */
export const uploadShowcaseScreenshot = async (
  screenshotBuffer: Buffer,
  websiteUrl: string
): Promise<string> => {
  const key = getScreenshotKey(websiteUrl);
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: screenshotBuffer,
      ContentType: 'image/jpeg',
    })
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
};

/**
 * Deletes a previously uploaded screenshot from S3/R2.
 * Accepts either the full public URL or just the key.
 */
export const deleteShowcaseScreenshot = async (
  imageUrl: string
): Promise<void> => {
  // Extract everything after the R2_PUBLIC_URL prefix, or fall back to the last segment
  const publicUrl = process.env.R2_PUBLIC_URL ?? '';
  const key = imageUrl.startsWith(publicUrl)
    ? imageUrl.slice(publicUrl.length + 1)
    : imageUrl.split('/').pop();

  if (!key) return;

  const s3Client = getS3Client();
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    })
  );
};
