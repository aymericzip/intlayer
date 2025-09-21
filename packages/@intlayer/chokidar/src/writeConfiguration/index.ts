import type { IntlayerConfig } from '@intlayer/config';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { writeJsonIfChanged } from '../writeJsonIfChanged';

export const writeConfiguration = async (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { configDir } = content;

  // Ensure target directory exists
  // configDir is expected to be the directory where configuration.json will live
  await mkdir(configDir, { recursive: true });

  const configFilePath = join(configDir, 'configuration.json');

  await writeJsonIfChanged(configFilePath, configuration);
};
