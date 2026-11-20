/**
 * Scheduled job: warns organizations nobody used for 6 months, then deletes
 * them with all their data 30 days later unless someone signs in.
 *
 * Meant for a Coolify scheduled task on the backend container (daily):
 *   bun dist/esm/jobs/purgeInactiveOrganizations.mjs             # apply
 *   bun dist/esm/jobs/purgeInactiveOrganizations.mjs --dry-run   # report only
 *
 * Never runs on self-hosted instances.
 */
import { logger } from '@logger';
import { processInactiveOrganizations } from '@services/inactiveOrganization.service';
import { isSelfHosted } from '@utils/isSelfHosted';
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
  if (isSelfHosted()) {
    logger.info('Inactive organization purge skipped on self-hosted instances');
    return 0;
  }

  const isDryRun = process.argv.includes('--dry-run');

  await connect(getMongoDBUri());

  try {
    const report = await processInactiveOrganizations({ isDryRun });

    logger.info(
      `Inactive organizations${isDryRun ? ' (dry run)' : ''}: ${
        report.warn.length
      } warned, ${report.delete.length} deleted, ${
        report.cancel.length
      } deletion(s) cancelled`,
      report
    );

    return 0;
  } catch (error) {
    logger.error(
      `Inactive organization purge failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    return 1;
  } finally {
    await disconnect();
  }
};

process.exit(await runJob());
