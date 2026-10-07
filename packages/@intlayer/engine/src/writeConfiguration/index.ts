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

export const writeConfiguration = async (configuration: IntlayerConfig) => {
  const { configDir } = configuration.system;

  await mkdir(configDir, { recursive: true });

  await Promise.all([
    writeFileIfChanged(
      join(configDir, 'configuration.mjs'),
      generateConfigurationContent(configuration, 'esm')
    ),
    writeFileIfChanged(
      join(configDir, 'configuration.cjs'),
      generateConfigurationContent(configuration, 'cjs')
    ),
  ]);
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
