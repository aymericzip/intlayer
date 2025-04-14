import { ESMxCJSRequire } from '@intlayer/config';
import { readFileSync } from 'fs';

export const getNextVersion = () => {
  try {
    const nextConfigPath = ESMxCJSRequire.resolve('next/package.json');

    const nextPkg = JSON.parse(readFileSync(nextConfigPath, 'utf-8'));

    return nextPkg.version;
  } catch (e) {
    return undefined;
  }
};
