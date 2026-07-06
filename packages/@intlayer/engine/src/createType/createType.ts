import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';

export const generateTypeScriptType = (
  dictionary: Dictionary | QualifiedDictionaryGroup
) => {
  const jsonString = JSON.stringify(dictionary, null, 2);

  return `/* eslint-disable */\nexport default ${jsonString} as const;\n`;
};
/**
 * This function generates a TypeScript type definition from a JSON object
 */
export const createTypes = async (
  dictionaries: (Dictionary | QualifiedDictionaryGroup)[],
  configuration: IntlayerConfig
): Promise<string[]> => {
  const { system } = configuration;
  const { typesDir } = system;

  // Create type folders if they don't exist
  await mkdir(typesDir, { recursive: true });

  const results = await parallelize(
    dictionaries,
    async (dictionary): Promise<string | undefined> => {
      if (!dictionary.key) {
        return undefined;
      }

      const typeDefinition: string = generateTypeScriptType(dictionary);

      const outputPath: string = resolve(typesDir, `${dictionary.key}.ts`);

      // Skip the write when the type definition is unchanged, so warm
      // rebuilds don't churn mtimes and re-trigger the TS server.
      await writeFileIfChanged(outputPath, typeDefinition);

      return outputPath;
    }
  );

  return results.filter(Boolean) as string[];
};
