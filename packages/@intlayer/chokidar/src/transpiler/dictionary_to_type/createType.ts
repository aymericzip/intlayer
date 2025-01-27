import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getConfiguration, ESMxCJSRequire } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core';
import { kebabCaseToCamelCase } from '../../utils';

const { content } = getConfiguration();
const { typesDir } = content;

const requireUncached = (module: string) => {
  delete ESMxCJSRequire.cache[ESMxCJSRequire.resolve(module)];
  return ESMxCJSRequire(module);
};

export const generateTypeScriptType = async (
  typeName: string,
  jsonString: string
) => {
  const { lines } = await quicktypeJSON(typeName, jsonString);

  const linesString: string = lines.join('\n');

  return linesString;
};

const quicktypeJSON = async (typeName: string, jsonString: string) => {
  const jsonInput = jsonInputForTargetLanguage('typescript');

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: 'typescript',
    alphabetizeProperties: true,
    rendererOptions: {
      'just-types': 'true',
      'explicit-unions': 'true',
      'acronym-style': 'camel',
      'prefer-types': 'true',
      readonly: 'false',
    },
  });
};

/**
 * This function generates a TypeScript type definition from a JSON object
 */
export const createTypes = async (
  dictionariesPaths: string[]
): Promise<string[]> => {
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

    const dictionaryNameCamelCase: string = `${kebabCaseToCamelCase(dictionary.key)}Content`;

    const dictionaryContentString: string = JSON.stringify(dictionary);

    const typeDefinition: string = await generateTypeScriptType(
      dictionaryNameCamelCase,
      dictionaryContentString
    );

    const outputPath: string = resolve(typesDir, `${dictionary.key}.d.ts`);

    writeFileSync(outputPath, typeDefinition);

    resultTypesPaths.push(outputPath);
  }

  return resultTypesPaths;
};
