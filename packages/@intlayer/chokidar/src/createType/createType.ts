import {
  ESMxCJSRequire,
  getConfiguration,
  IntlayerConfig,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { parallelize } from '../utils/parallelize';

const requireUncached = (module: string) => {
  delete ESMxCJSRequire.cache[ESMxCJSRequire.resolve(module)];
  return ESMxCJSRequire(module);
};

export const generateTypeScriptType = (dictionary: Dictionary) => {
  const jsonString = JSON.stringify(dictionary, null, 2);

  return `/* eslint-disable */\nexport default ${jsonString} as const;\n`;
};
/**
 * This function generates a TypeScript type definition from a JSON object
 */
export const createTypes = async (
  dictionariesPaths: string[],
  configuration: IntlayerConfig = getConfiguration()
): Promise<string[]> => {
  const { typesDir } = configuration.content;

  // Create type folders if they don't exist
  await mkdir(typesDir, { recursive: true });

  const results = await parallelize(
    dictionariesPaths,
    async (dictionaryPath): Promise<string | undefined> => {
      const dictionary: Dictionary = requireUncached(dictionaryPath);

      if (!dictionary.key) {
        return undefined;
      }

      const typeDefinition: string = generateTypeScriptType(dictionary);

      const outputPath: string = resolve(typesDir, `${dictionary.key}.ts`);

      await writeFile(outputPath, typeDefinition);

      return outputPath;
    }
  );

  return results.filter(Boolean) as string[];
};
