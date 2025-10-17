import { createRequire } from 'node:module';
import { getPackageJsonPath } from './getPackageJsonPath';

export const isESModule = typeof import.meta.url === 'string';

export const ESMxCJSRequire: NodeJS.Require = createRequire(
  getPackageJsonPath().packageJsonPath
);
