import { basename } from 'node:path';
import { compareVersions } from '@intlayer/config/utils';
import { type ExtensionContext, window } from 'vscode';
import { findAllProjectRoots } from '../utils/findProjectRoot';
import { getInstalledIntlayerVersion } from '../utils/getInstalledIntlayerVersion';
import { runIntlayerCliInTerminal } from '../utils/runIntlayerCli';

/**
 * Workspace state key holding the extension version the user dismissed the
 * suggestion for, so the next extension release suggests it again.
 */
const DISMISSED_VERSION_STATE_KEY = 'intlayer.upgradePrompt.dismissedVersion';

/** A workspace project whose `intlayer` package is older than the extension. */
export type OutdatedIntlayerProject = {
  projectDir: string;
  installedVersion: string;
};

/** Reduces a version to its `major.minor.patch` core (drops `-canary.1`…). */
const getVersionCore = (version: string): string => version.split(/[-+]/)[0];

/** Whether the installed `intlayer` version is lower than the extension's. */
export const isIntlayerVersionOutdated = (
  installedVersion: string,
  extensionVersion: string
): boolean =>
  compareVersions(
    getVersionCore(installedVersion),
    '<',
    getVersionCore(extensionVersion)
  );

/** Lists the projects whose installed `intlayer` is older than the extension. */
export const findOutdatedIntlayerProjects = (
  projectDirs: string[],
  extensionVersion: string
): OutdatedIntlayerProject[] =>
  projectDirs.flatMap((projectDir) => {
    const installedVersion = getInstalledIntlayerVersion(projectDir);

    return installedVersion &&
      isIntlayerVersionOutdated(installedVersion, extensionVersion)
      ? [{ projectDir, installedVersion }]
      : [];
  });

/** Builds the notification text for the outdated projects. */
export const getUpgradePromptMessage = (
  outdatedProjects: OutdatedIntlayerProject[],
  extensionVersion: string
): string => {
  const subject =
    outdatedProjects.length === 1
      ? `"${basename(outdatedProjects[0].projectDir)}" uses Intlayer ${outdatedProjects[0].installedVersion}`
      : `${outdatedProjects.length} projects use an Intlayer version`;

  return `${subject}, older than the Intlayer extension (${extensionVersion}). Run \`intlayer upgrade\` to keep the packages and the extension aligned.`;
};

/**
 * Suggests running `intlayer upgrade` when a workspace project has an
 * `intlayer` package older than the extension, unless the user dismissed it
 * for this extension version.
 */
export const promptIntlayerUpgrade = async (
  context: ExtensionContext
): Promise<void> => {
  const extensionVersion: string = context.extension.packageJSON.version;

  if (
    context.workspaceState.get<string>(DISMISSED_VERSION_STATE_KEY) ===
    extensionVersion
  ) {
    return;
  }

  const outdatedProjects = findOutdatedIntlayerProjects(
    await findAllProjectRoots(),
    extensionVersion
  );

  if (outdatedProjects.length === 0) return;

  const upgradeAction = 'Run intlayer upgrade';
  const dismissAction = "Don't ask again";

  const selectedAction = await window.showInformationMessage(
    getUpgradePromptMessage(outdatedProjects, extensionVersion),
    upgradeAction,
    dismissAction
  );

  if (selectedAction === upgradeAction) {
    for (const { projectDir } of outdatedProjects) {
      runIntlayerCliInTerminal(projectDir, {
        terminalName: `Intlayer upgrade (${basename(projectDir)})`,
        args: ['upgrade'],
        // `upgrade` takes no configuration options
        forwardEnvironment: false,
      });
    }
  } else if (selectedAction === dismissAction) {
    await context.workspaceState.update(
      DISMISSED_VERSION_STATE_KEY,
      extensionVersion
    );
  }
};
