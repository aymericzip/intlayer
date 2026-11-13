import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { assertPathWithin, normalizePath } from '@intlayer/config/utils';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';

/**
 * Returns the component path stored in `componentFilePath`: relative to the
 * project root, POSIX separators, so it is stable across machines.
 */
export const getComponentFilePath = (
  filePath: string,
  configuration: IntlayerConfig
): string =>
  normalizePath(relative(configuration.system.baseDir, resolve(filePath)));

/**
 * Whether the dictionaries already declared under a key were extracted from
 * this component. Dictionaries without `componentFilePath` (hand-written,
 * remote, or translations added afterwards) do not claim the key.
 */
const isOwnedByComponent = (
  dictionaries: Dictionary[],
  componentFilePath: string
): boolean => {
  const owners = dictionaries
    .map((dictionary) => dictionary.componentFilePath)
    .filter((owner): owner is string => Boolean(owner));

  return (
    owners.length > 0 && owners.every((owner) => owner === componentFilePath)
  );
};

/**
 * Resolves a unique dictionary key, checking for existing dictionaries and files.
 * A key already used by a dictionary extracted from the same component is
 * reused, so the key stays stable when the component is not rewritten.
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
  const componentFilePath = getComponentFilePath(filePath, configuration);

  const dirName = dirname(filePath);
  const firstExtension = fileExtensions[0] ?? '.ts';
  const extension = firstExtension.startsWith('.')
    ? firstExtension
    : `.${firstExtension}`;

  let index = 0;

  while (index < 100) {
    const keyToTest = index === 0 ? initialKey : `${initialKey}${index}`;
    const dictionaries = dicts[keyToTest] as Dictionary[] | undefined;
    const contentFilePath = join(dirName, `${keyToTest}${extension}`);

    assertPathWithin(resolve(contentFilePath), dirName);

    const isKeyUsed = usedKeys.has(keyToTest);
    const hasDictionaries = dictionaries && dictionaries.length > 0;

    if (
      !isKeyUsed &&
      hasDictionaries &&
      isOwnedByComponent(dictionaries, componentFilePath)
    ) {
      return keyToTest;
    }

    const fileExists = existsSync(contentFilePath);

    if (!isKeyUsed && !hasDictionaries && !fileExists) {
      return keyToTest;
    }
    index++;
  }

  return initialKey;
};
