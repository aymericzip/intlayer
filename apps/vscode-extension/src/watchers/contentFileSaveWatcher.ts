import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import { getConfiguration } from '@intlayer/config/node';
import {
  buildDictionary,
  createTypes,
  loadLocalDictionaries,
} from '@intlayer/engine/build';
import { getContentWatcherOwner } from '@intlayer/engine/utils';
import { type Disposable, window, workspace } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

/** Debounces bursts of saves on the same file (e.g. format on save). */
const REBUILD_DELAY_MS = 300;

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
    const projectDir = findProjectRoot(filePath);
    if (!projectDir) return;

    const configOptions = await getConfigurationOptions(projectDir, false);
    const config = getConfiguration(configOptions);

    const fileExtensions = config.content?.fileExtensions ?? FILE_EXTENSIONS;

    if (!fileExtensions.some((ext) => filePath.endsWith(ext))) return;

    const existing = pendingTimers.get(filePath);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(async () => {
      pendingTimers.delete(filePath);

      try {
        // Checked at rebuild time rather than on save: a watcher may have
        // started or stopped in between. Stale locks from dead processes are
        // reclaimed by `getContentWatcherOwner` and read as "no owner".
        if (await getContentWatcherOwner(config)) return;

        const localeDictionaries = await loadLocalDictionaries(
          filePath,
          config
        );
        if (!localeDictionaries.length) return;

        const dictionariesOutput = await buildDictionary(
          localeDictionaries,
          config
        );
        const updatedDictionaries = Object.values(
          dictionariesOutput?.mergedDictionaries ?? {}
        ).map((updatedDictionary) => updatedDictionary.dictionary);

        await createTypes(updatedDictionaries, config);

        await window.showInformationMessage(`${prefix}Dictionary rebuilt.`);
      } catch (error) {
        await window.showErrorMessage(
          `${prefix}Auto-rebuild failed: ${(error as Error).message}`
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
