// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/changeset-version.js

import { exec } from 'node:child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// This script is used by the `release.yml` workflow to update the version of the packages being released.
// The standard step is only to run `changeset version` but this does not update the package-lock.yaml file.
// So we also run `pnpm install`, which does this update.
// This is a workaround until this is handled automatically by `changeset version`.
// See https://github.com/changesets/changesets/issues/421.

const runChangesetVersion = async () => {
  try {
    console.log('Running changeset version...');
    await execAsync('npx changeset version');

    console.log('Updating lockfile with pnpm install...');
    await execAsync('pnpm install --frozen-lockfile=false');

    console.log('Changeset version completed successfully');
  } catch (error) {
    console.error('Error during changeset version:', error);
    process.exit(1);
  }
};

runChangesetVersion();
