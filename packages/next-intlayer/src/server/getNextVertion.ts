import { readFileSync } from 'node:fs';
import { ESMxCJSRequire } from '@intlayer/config';

export const getNextVersion = () => {
  try {
    const nextConfigPath = ESMxCJSRequire.resolve('next/package.json');

    const nextPkg = JSON.parse(readFileSync(nextConfigPath, 'utf-8'));

    return nextPkg.version;
  } catch (_e) {
    return undefined;
  }
};
