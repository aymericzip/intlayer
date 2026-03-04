import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

/**
 * Resolves a unique dictionary key, checking for existing dictionaries and files.
 * Note: this chokidar-specific variant fetches unmergedDictionaries internally
 * from the configuration (unlike the `@intlayer/babel` version which takes it as a parameter).
 */
export const resolveDictionaryKey = (
  initialKey: string,
  filePath: string,
  configuration: IntlayerConfig,
  unmergedDictionaries?: Record<string, unknown>,
  usedKeys: Set<string> = new Set()
): string => {
  const dicts =
    unmergedDictionaries ?? getUnmergedDictionaries(configuration) ?? {};
  const { fileExtensions } = configuration.content;
  const dirName = dirname(filePath);
  const firstExtension = fileExtensions[0];
  const extension = firstExtension.startsWith('.')
    ? firstExtension
    : `.${firstExtension}`;

  let index = 0;
  while (index < 100) {
    const keyToTest = index === 0 ? initialKey : `${initialKey}${index}`;
    const dictionaries = dicts[keyToTest] as Dictionary[] | undefined;
    const contentFilePath = join(dirName, `${keyToTest}${extension}`);
    const isKeyUsed = usedKeys.has(keyToTest);
    const hasDictionaries = dictionaries && dictionaries.length > 0;
    const fileExists = existsSync(contentFilePath);

    if (!isKeyUsed && !hasDictionaries && !fileExists) {
      return keyToTest;
    }
    index++;
  }
  return initialKey;
};
