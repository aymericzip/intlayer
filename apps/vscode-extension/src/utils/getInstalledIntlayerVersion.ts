import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

/** Packages providing the `intlayer` binary, in resolution order. */
const INTLAYER_CLI_PACKAGES = ['intlayer', 'intlayer-cli'] as const;

/**
 * Version of the `intlayer` CLI installed for a project (resolved like Node
 * does from the project, so hoisted monorepo installs are found), or
 * `undefined` when none is installed.
 */
export const getInstalledIntlayerVersion = (
  projectDir: string
): string | undefined => {
  const projectRequire = createRequire(join(projectDir, 'package.json'));

  for (const packageName of INTLAYER_CLI_PACKAGES) {
    try {
      const packageJsonPath = projectRequire.resolve(
        `${packageName}/package.json`
      );
      const { version } = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
        version?: string;
      };

      if (version) return version;
    } catch {
      // Not installed
    }
  }

  return undefined;
};
