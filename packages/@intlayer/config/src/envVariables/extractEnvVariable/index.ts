import { type Platform, getPlatform } from '../detectPlatform';
import { extractNextEnvVariable } from './next';
import { extractReactAppEnvVariable } from './react_app';
import type { IntlayerConfigEnvVariable } from './types';
import { extractEmptyEnvVariable } from './undefined_platform';
import { extractViteEnvVariable } from './vite';

export type ExtractEnvVariableOptions = {
  platform?: Platform;
};

export const extractEnvVariable = (
  options?: ExtractEnvVariableOptions
): IntlayerConfigEnvVariable => {
  const platform: Platform = options?.platform ?? getPlatform();

  if (platform === 'vite') {
    return extractViteEnvVariable();
  } else if (platform === 'next') {
    return extractNextEnvVariable();
  } else if (platform === 'react_app') {
    return extractReactAppEnvVariable();
  }

  return extractEmptyEnvVariable();
};
