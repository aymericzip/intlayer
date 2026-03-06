import { S3Client } from '@aws-sdk/client-s3';

let cachedClient: S3Client | null = null;

export const getS3Client = (): S3Client => {
  if (!cachedClient) {
    cachedClient = new S3Client({
      region: 'auto',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
  }
  return cachedClient;
};
