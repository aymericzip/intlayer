import type { IntlayerConfig } from '@intlayer/config';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const writeConfiguration = (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { configDir } = content;

  const configFilePath = join(configDir, 'configuration.json');

  writeFileSync(configFilePath, JSON.stringify(configuration, null, 2));
};
