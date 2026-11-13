import { resolve } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorizePath, logger, v } from '@intlayer/config/logger';
import {
  initIntlayer,
  type UpgradeIntlayerPackagesOptions,
  upgradeIntlayerPackages,
  upgradeMCPConfigs,
} from '@intlayer/engine/cli';
import { findProjectRoot, getInitOptionsForSteps, type InitStep } from './init';

export type UpgradeOptions = UpgradeIntlayerPackagesOptions & {
  /** Skip installing / wiring `eslint-plugin-intlayer`. */
  noEslint?: boolean;
  /** Skip installing / wiring `prettier-plugin-intlayer`. */
  noPrettier?: boolean;
};

/**
 * Upgrades every Intlayer package of the project (framework integrations,
 * `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`,
 * `@intlayer/mcp`…) to the given dist-tag, then brings the tooling around
 * them up to date: lint / Prettier plugins installed and registered when the
 * project lints or formats, and MCP entries pointed at the same dist-tag.
 */
export const upgrade = async (
  projectRoot?: string,
  options?: UpgradeOptions
) => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );
  const distTag = options?.distTag ?? 'latest';

  await upgradeIntlayerPackages(root, options);

  if (options?.dryRun) return;

  const toolingSteps: InitStep[] = [
    ...(options?.noEslint ? [] : (['eslint'] as const)),
    ...(options?.noPrettier ? [] : (['prettier'] as const)),
  ];

  if (toolingSteps.length > 0) {
    await initIntlayer(
      root,
      getInitOptionsForSteps(toolingSteps, {
        // Missing plugins are installed at the dist-tag being upgraded to.
        upgradeToVersion: distTag,
        skipFinalMessage: true,
      })
    );
  }

  const updatedMCPConfigPaths = await upgradeMCPConfigs(root, distTag);

  for (const configPath of updatedMCPConfigPaths) {
    logger(
      `${v} Pointed the Intlayer MCP server of ${colorizePath(configPath)} at ${colorizePath(`@intlayer/mcp@${distTag}`, ANSIColors.MAGENTA)}`
    );
  }
};
