import { type FSWatcher, mkdirSync, watch } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { writeFileIfChanged } from '../writeFileIfChanged';
import { generateConfigurationContent } from './generateConfigurationContent';

export const isCachedConfigurationUpToDate = async (
  configuration: IntlayerConfig
): Promise<boolean | null> => {
  try {
    const mjsPath = join(configuration.system.configDir, 'configuration.mjs');
    const existingContent = await readFile(mjsPath, 'utf8');
    const expectedContent = generateConfigurationContent(configuration, 'esm');
    return existingContent === expectedContent;
  } catch {
    return null; // Can crash if file doesn't exist yet or config is not defined
  }
};

/**
 * Writes the built configuration (`.intlayer/config`) in both formats.
 *
 * @returns Whether a file changed.
 */
export const writeConfiguration = async (
  configuration: IntlayerConfig
): Promise<boolean> => {
  const { configDir } = configuration.system;

  await mkdir(configDir, { recursive: true });

  const writtenFiles = await Promise.all([
    writeFileIfChanged(
      join(configDir, 'configuration.mjs'),
      generateConfigurationContent(configuration, 'esm')
    ),
    writeFileIfChanged(
      join(configDir, 'configuration.cjs'),
      generateConfigurationContent(configuration, 'cjs')
    ),
  ]);

  return writtenFiles.includes(true);
};

/** Editor settings the built configuration can be overridden with. */
export type BuiltEditorOverride = Partial<
  Pick<IntlayerConfig['editor'], 'enabled' | 'editorURL'>
>;

/**
 * Writes the built configuration (`.intlayer/config`) with editor settings
 * overridden, leaving the user configuration file untouched. Lets the visual
 * editor connect to the application when the configuration disables it, or
 * points at another URL. The next configuration build restores the
 * configured values.
 *
 * @returns The overridden keys that differ from the configuration; nothing is
 * written when empty.
 */
export const overrideBuiltEditorConfiguration = async (
  configuration: IntlayerConfig,
  editorOverride: BuiltEditorOverride
): Promise<(keyof BuiltEditorOverride)[]> => {
  const overriddenKeys = (
    Object.keys(editorOverride) as (keyof BuiltEditorOverride)[]
  ).filter(
    (key) =>
      editorOverride[key] !== undefined &&
      editorOverride[key] !== configuration.editor[key]
  );

  if (overriddenKeys.length === 0) return [];

  await writeConfiguration({
    ...configuration,
    editor: { ...configuration.editor, ...editorOverride },
  });

  return overriddenKeys;
};

/** Built configuration files an application rebuild rewrites. */
const BUILT_CONFIGURATION_FILE_NAMES = new Set([
  'configuration.mjs',
  'configuration.cjs',
]);

/** Delay grouping the writes of one configuration rebuild. */
const BUILT_CONFIGURATION_WATCH_DEBOUNCE_MS = 200;

export type WatchBuiltEditorConfigurationOptions = {
  /**
   * Loads the current configuration, so edits made to the configuration file
   * meanwhile are kept.
   */
  loadConfiguration: () => IntlayerConfig | Promise<IntlayerConfig>;
  editorOverride: BuiltEditorOverride;
  /** Called each time the overrides had to be written again. */
  onRestore?: () => void;
  /** Called when loading or writing the configuration fails. */
  onError?: (error: unknown) => void;
};

/**
 * Keeps the editor overrides in the built configuration: an application
 * started or restarted aside (e.g. its dev server) rebuilds `.intlayer/config`
 * with the configured values, so the overrides are written again on every
 * change. Writing identical content is skipped, which ends the loop.
 *
 * @returns Stops watching.
 */
export const watchBuiltEditorConfiguration = (
  configDir: string,
  {
    loadConfiguration,
    editorOverride,
    onRestore,
    onError,
  }: WatchBuiltEditorConfigurationOptions
): (() => void) => {
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let isRestoring = false;
  let hasPendingChange = false;
  let watcher: FSWatcher | undefined;

  const restoreOverrides = async (): Promise<void> => {
    if (isRestoring) {
      hasPendingChange = true;
      return;
    }

    isRestoring = true;

    try {
      const configuration = await loadConfiguration();
      const isRestored = await writeConfiguration({
        ...configuration,
        editor: { ...configuration.editor, ...editorOverride },
      });

      if (isRestored) onRestore?.();
    } catch (error) {
      onError?.(error);
    } finally {
      isRestoring = false;
    }

    if (hasPendingChange) {
      hasPendingChange = false;
      await restoreOverrides();
    }
  };

  const scheduleRestore = (_eventType: string, fileName: string | null) => {
    if (fileName && !BUILT_CONFIGURATION_FILE_NAMES.has(fileName)) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(
      () => void restoreOverrides(),
      BUILT_CONFIGURATION_WATCH_DEBOUNCE_MS
    );
  };

  try {
    mkdirSync(configDir, { recursive: true });
    // The directory, not the files: atomic writes replace their inode
    watcher = watch(configDir, { persistent: false }, scheduleRestore);
    watcher.on('error', (error) => onError?.(error));
  } catch (error) {
    onError?.(error);
  }

  return () => {
    clearTimeout(debounceTimer);
    watcher?.close();
  };
};
