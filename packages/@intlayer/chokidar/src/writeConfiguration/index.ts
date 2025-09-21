import type { IntlayerConfig } from '@intlayer/config';
import { join } from 'path';
import { writeJsonIfChanged } from '../writeJsonIfChanged';

export const writeConfiguration = async (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { configDir } = content;

  const configFilePath = join(configDir, 'configuration.json');

  await writeJsonIfChanged(configFilePath, configuration);
};
