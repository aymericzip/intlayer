import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { clearModuleCache, ESMxCJSRequire } from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { parallelize } from '../utils/parallelize';

export const generateTypeScriptType = (dictionary: Dictionary) => {
  const jsonString = JSON.stringify(dictionary, null, 2);

  return `/* eslint-disable */\nexport default ${jsonString} as const;\n`;
};
/**
 * This function generates a TypeScript type definition from a JSON object
 */
export const createTypes = async (
  dictionariesPaths: string[],
  configuration: IntlayerConfig
): Promise<string[]> => {
  const { build, content } = configuration;
  const { typesDir } = content;

  // Create type folders if they don't exist
  await mkdir(typesDir, { recursive: true });

  const results = await parallelize(
    dictionariesPaths,
    async (dictionaryPath): Promise<string | undefined> => {
      const requireFunction = build.require ?? ESMxCJSRequire;
      clearModuleCache(dictionaryPath);

      const dictionary: Dictionary = requireFunction(dictionaryPath);

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
