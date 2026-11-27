import { extractErrorMessage } from '@intlayer/config/utils';
import { getContentWatcherOwner } from '@intlayer/engine/utils';
import { type Disposable, window, workspace } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import {
  getCachedConfig,
  isContentDeclarationFile,
} from '../utils/intlayerCache';
import { prefix } from '../utils/logFunctions';
import { rebuildContentDeclaration } from '../utils/rebuildContentDeclaration';

/** Debounces bursts of saves on the same file (e.g. format on save). */
const REBUILD_DELAY_MS = 300;

/** Files saved by a flow that rebuilds them itself, as one batch. */
const selfRebuiltFilePaths = new Set<string>();

/**
 * Run `saveAndRebuild` — which saves `filePaths` then rebuilds them itself —
 * without the save watcher rebuilding each file a second time.
 */
export const withoutSaveRebuild = async <Result>(
  filePaths: string[],
  saveAndRebuild: () => Promise<Result>
): Promise<Result> => {
  for (const filePath of filePaths) selfRebuiltFilePaths.add(filePath);

  try {
    return await saveAndRebuild();
  } finally {
    for (const filePath of filePaths) selfRebuiltFilePaths.delete(filePath);
  }
};

/**
 * Watches content declaration file saves and rebuilds the dictionary when no
 * other Intlayer watcher owns the project.
 *
 * `intlayer watch` and the Next.js dev server take the content watcher lock
 * (`.intlayer/intlayer-content-watcher.lock`) while they run. When a live
 * process holds it, that process rebuilds on its own, so the extension stands
 * down. This keeps dictionaries up to date when no watcher is running.
 */
export const contentFileSaveWatcher = (): Disposable => {
  const pendingTimers = new Map<string, NodeJS.Timeout>();

  const subscription = workspace.onDidSaveTextDocument(async (document) => {
    const filePath = document.uri.fsPath;

    if (selfRebuiltFilePaths.has(filePath)) return;

    const projectDir = findProjectRoot(filePath);

    if (!projectDir) return;

    const configuration = await getCachedConfig(projectDir);

    if (!isContentDeclarationFile(filePath, configuration)) return;

    clearTimeout(pendingTimers.get(filePath));

    const timer = setTimeout(async () => {
      pendingTimers.delete(filePath);

      if (selfRebuiltFilePaths.has(filePath)) return;

      try {
        // Checked at rebuild time rather than on save: a watcher may have
        // started or stopped in between. Stale locks from dead processes are
        // reclaimed by `getContentWatcherOwner` and read as "no owner".
        if (await getContentWatcherOwner(configuration)) return;

        if (await rebuildContentDeclaration(filePath, configuration)) {
          await window.showInformationMessage(`${prefix}Dictionary rebuilt.`);
        }
      } catch (error) {
        await window.showErrorMessage(
          `${prefix}Auto-rebuild failed: ${extractErrorMessage(error)}`
        );
      }
    }, REBUILD_DELAY_MS);

    pendingTimers.set(filePath, timer);
  });

  return {
    dispose: () => {
      subscription.dispose();

      for (const timer of pendingTimers.values()) {
        clearTimeout(timer);
      }

      pendingTimers.clear();
    },
  };
};
