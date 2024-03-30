import { buildConfigurationFields } from './buildConfigurationFields';
import { BASE_DIR_PATH } from './defaultValues/server';
import { loadConfigurationFile } from './loadConfigurationFile';
import type { CustomIntlayerConfig, IntlayerConfig } from './types';

const storedConfiguration: IntlayerConfig | undefined = undefined;

export const getConfiguration = (
  baseDirPath = BASE_DIR_PATH
): IntlayerConfig => {
  if (storedConfiguration) {
    return storedConfiguration;
  }

  const customConfiguration: CustomIntlayerConfig | undefined =
    loadConfigurationFile(baseDirPath);

  return buildConfigurationFields(customConfiguration);
};
