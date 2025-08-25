import {
  ESMxCJSRequire,
  getConfiguration,
  IntlayerConfig,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

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
export const createTypes = (
  dictionariesPaths: string[],
  configuration: IntlayerConfig = getConfiguration()
): string[] => {
  const { typesDir } = configuration.content;
  const resultTypesPaths: string[] = [];

  // Create type folders if they don't exist
  if (!existsSync(typesDir)) {
    mkdirSync(typesDir, { recursive: true });
  }

  for (const dictionaryPath of dictionariesPaths) {
    const dictionary: Dictionary = requireUncached(dictionaryPath);

    if (!dictionary.key) {
      // Skip dictionary if it doesn't have a key, if not exported as default etc
      continue;
    }

    const typeDefinition: string = generateTypeScriptType(dictionary);

    const outputPath: string = resolve(typesDir, `${dictionary.key}.ts`);

    writeFileSync(outputPath, typeDefinition);

    resultTypesPaths.push(outputPath);
  }

  return resultTypesPaths;
};
