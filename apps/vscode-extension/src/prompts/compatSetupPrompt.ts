import { existsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { configurationFilesCandidates } from '@intlayer/config/node';
import { detectCompatI18nLibraries } from '@intlayer/engine/cli';
import { type ExtensionContext, env, Uri, window, workspace } from 'vscode';
import { initProject } from '../commands/initProject';

/** Workspace state key set once the user opts out of the suggestion. */
const DISMISSED_STATE_KEY = 'intlayer.compatSetupPrompt.dismissed';

const COMPAT_DOCUMENTATION_URL = 'https://intlayer.org/doc/compatibility';

/** A workspace project using an i18n library Intlayer has a compat adapter for. */
export type CompatSetupCandidate = {
  projectDir: string;
  /** Labels of the detected libraries (e.g. `next-intl / use-intl`). */
  libraryLabels: string[];
};

/** Whether an Intlayer configuration file already sits in `projectDir`. */
const hasIntlayerConfiguration = (projectDir: string): boolean =>
  configurationFilesCandidates.some((fileName) =>
    existsSync(join(projectDir, fileName))
  );

/**
 * Lists the workspace projects that use a compat-compatible i18n library
 * (i18next, next-intl, vue-i18n…) and are not set up with Intlayer yet.
 */
export const findCompatSetupCandidates = async (): Promise<
  CompatSetupCandidate[]
> => {
  const packageJsonUris = await workspace.findFiles(
    '**/package.json',
    '**/node_modules/**',
    200
  );

  const candidates: CompatSetupCandidate[] = [];

  for (const packageJsonUri of packageJsonUris) {
    const projectDir = dirname(packageJsonUri.fsPath);

    if (hasIntlayerConfiguration(projectDir)) {
      continue;
    }

    try {
      const content = await workspace.fs.readFile(packageJsonUri);
      const { dependencies = {}, devDependencies = {} } = JSON.parse(
        new TextDecoder('utf-8').decode(content)
      );
      const libraryLabels = detectCompatI18nLibraries({
        ...dependencies,
        ...devDependencies,
      });

      if (libraryLabels.length > 0) {
        candidates.push({ projectDir, libraryLabels });
      }
    } catch {
      // Unreadable or malformed package.json
    }
  }

  return candidates;
};

/** Builds the notification text for the detected candidates. */
export const getCompatSetupMessage = (
  candidates: CompatSetupCandidate[]
): string => {
  const libraryLabels = [
    ...new Set(candidates.flatMap((candidate) => candidate.libraryLabels)),
  ];
  const location =
    candidates.length === 1
      ? `"${basename(candidates[0].projectDir)}"`
      : `${candidates.length} projects`;

  return `Intlayer detected ${libraryLabels.join(', ')} in ${location}. Set up Intlayer through its compat adapter to keep your existing translation calls and get visual editing, AI translation and type safety.`;
};

/**
 * Suggests running `intlayer init` when the workspace contains a project that
 * uses an i18n library Intlayer can adapt, unless the user opted out for this
 * workspace.
 */
export const promptCompatSetup = async (
  context: ExtensionContext
): Promise<void> => {
  if (context.workspaceState.get<boolean>(DISMISSED_STATE_KEY)) {
    return;
  }

  const candidates = await findCompatSetupCandidates();

  if (candidates.length === 0) {
    return;
  }

  const setUpAction = 'Set up Intlayer';
  const learnMoreAction = 'Learn more';
  const dismissAction = "Don't ask again";

  const selectedAction = await window.showInformationMessage(
    getCompatSetupMessage(candidates),
    setUpAction,
    learnMoreAction,
    dismissAction
  );

  if (selectedAction === setUpAction) {
    await initProject(candidates.map((candidate) => candidate.projectDir));
  } else if (selectedAction === learnMoreAction) {
    await env.openExternal(Uri.parse(COMPAT_DOCUMENTATION_URL));
  } else if (selectedAction === dismissAction) {
    await context.workspaceState.update(DISMISSED_STATE_KEY, true);
  }
};
