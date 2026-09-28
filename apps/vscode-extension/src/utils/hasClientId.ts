import { getConfiguration } from '@intlayer/config/node';
import { getConfigurationOptions } from './getConfiguration';

/**
 * Check if the project has editor.clientId configured
 */
export const hasClientId = async (projectDir: string): Promise<boolean> => {
  try {
    const configOptions = await getConfigurationOptions(projectDir, false);
    const config = getConfiguration(configOptions);
    return Boolean(config.editor?.clientId && config.editor?.clientSecret);
  } catch {
    return false;
  }
};
