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
