/**
 * Scheduled job: emails access key owners 3 days before their key expires, and
 * once it has expired.
 *
 * Meant for a Coolify scheduled task on the backend container (hourly):
 *   bun dist/esm/jobs/notifyAccessKeyExpirations.mjs
 *
 * Each email is claimed atomically before sending, so overlapping runs never
 * send it twice.
 */
import { logger } from '@logger';
import { processAccessKeyExpirations } from '@services/accessKeyNotification.service';
import { getMongoDBUri } from '@utils/mongoDB/getMongoDBUri';
import dotenv from 'dotenv';
import { connect, disconnect } from 'mongoose';

const environment = process.env.NODE_ENV || 'development';

dotenv.config({
  path: [
    `.env.${environment}.local`,
    `.env.${environment}`,
    '.env.local',
    '.env',
  ],
  quiet: true,
});

/** Runs the job once and returns the process exit code. */
const runJob = async (): Promise<number> => {
  await connect(getMongoDBUri());

  try {
    const sentCount = await processAccessKeyExpirations();

    logger.info(`Access key expiration emails sent: ${sentCount}`);

    return 0;
  } catch (error) {
    logger.error(
      `Access key expiration job failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    return 1;
  } finally {
    await disconnect();
  }
};

process.exit(await runJob());
