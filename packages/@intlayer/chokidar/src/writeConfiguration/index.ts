import type { IntlayerConfig } from '@intlayer/config';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export const writeConfiguration = (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { configDir } = content;

  // Create main directory if it doesn't exist
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }

  const configFilePath = join(configDir, 'configuration.json');

  writeFileSync(configFilePath, JSON.stringify(configuration, null, 2));
};
