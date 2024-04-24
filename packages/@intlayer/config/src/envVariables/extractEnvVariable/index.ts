import { Platform } from '../detectPlatform';
import { getPlatform } from '../detectPlatform';
import { extractNextEnvVariable } from './next';
import { extractReactAppEnvVariable } from './react_app';
import { extractViteEnvVariable } from './vite';
import { extractEmptyEnvVariable } from './undefined_platform';
import { IntlayerConfigEnvVariable } from './types';

export const extractEnvVariable = (): IntlayerConfigEnvVariable => {
  const platform: Platform = getPlatform();

  if (platform === 'vite') {
    return extractViteEnvVariable();
  } else if (platform === 'next') {
    return extractNextEnvVariable();
  } else if (platform === 'react_app') {
    return extractReactAppEnvVariable();
  }

  return extractEmptyEnvVariable();
};
