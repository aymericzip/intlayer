import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core';

const { content } = getConfiguration();
const { typesDir } = content;

const isESModule = typeof import.meta.url === 'string';
const requireFunction = isESModule ? createRequire(import.meta.url) : require;

const kebabCaseToCammelCase = (name: string): string =>
  name
    .split(/[\s\-_]+/) // Regular expression to match space, hyphen, or underscore
    .map((word, index) => {
      if (index === 0) {
        return word; // Return the first word as is
      }
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of subsequent words
    })
    .join(''); // Join all the segments into one string

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
    const dictionary: Dictionary = requireFunction(dictionaryPath);
    const dictionaryName: string = dictionary.id;
    const dictionaryNameCamelCase: string =
      kebabCaseToCammelCase(dictionaryName) + 'Content';

    const dictionaryContentString: string = JSON.stringify(dictionary);

    const typeDefinition: string = await generateTypeScriptType(
      dictionaryNameCamelCase,
      dictionaryContentString
    );

    const outputPath: string = resolve(typesDir, `${dictionaryName}.d.ts`);

    writeFileSync(outputPath, typeDefinition);

    resultTypesPaths.push(outputPath);
  }

  return resultTypesPaths;
};
