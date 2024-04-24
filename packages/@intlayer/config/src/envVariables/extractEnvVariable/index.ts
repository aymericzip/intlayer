import { type Platform, getPlatform } from '../detectPlatform';
import { extractNextEnvVariable } from './next';
import { extractReactAppEnvVariable } from './react_app';
import type { IntlayerConfigEnvVariable } from './types';
import { extractEmptyEnvVariable } from './undefined_platform';
import { extractViteEnvVariable } from './vite';

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
