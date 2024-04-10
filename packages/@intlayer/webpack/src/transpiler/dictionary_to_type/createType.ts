import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type {
  Content,
  ContentModule,
  TranslationContent,
} from '@intlayer/core';
import { getTypeName } from './createModuleAugmentation';

const { typesDir } = getConfiguration();

/**
 *
 * This function generates a TypeScript type definition from a JSON object
 *
 * Example:
 *
 * const input = {
 *  id: '1',
 *  name: 'John Doe',
 *  address: {
 *      id: '2',
 *      street: '123 Main St',
 *      city: 'Springfield',
 *  }
 * };
 *
 * const result = generateTypeScriptType(input, 'RootObject');
 * console.log(result);
 *
 * Output:
 *
 * type RootObject = {
 *  id: '1',
 *  name: string,
 *  address: {
 *      id: '2',
 *      street: string,
 *      city: string,
 *  },
 * };
 *
 */
export const generateTypeScriptType = (obj: ContentModule): string => {
  let typeDefinition = ``;

  const typeName = getTypeName(obj.id);

  typeDefinition += `export type ${typeName} = {\n`;
  typeDefinition += generateTypeScriptTypeContent(obj);
  typeDefinition += '};\n\n';

  return typeDefinition;
};

export const generateTypeScriptTypeContent = (obj: Content): string => {
  let typeDefinition = ``;

  for (const [key, value] of Object.entries(obj)) {
    if (
      // Check if the value is a translation object
      typeof value === 'object' &&
      (value as TranslationContent).type === 'translation'
    ) {
      typeDefinition += `  ${key}: string,\n`;
    } else if (
      // Check if the value is a nested object
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      // Nested object, recurse
      const nestedType = generateTypeScriptTypeContent(value as Content);
      typeDefinition += `  ${key}: {${nestedType}},\n`;
    } else if (
      // Check if the value is an array
      Array.isArray(value)
    ) {
      // Array handling (simplified, assumes non-empty arrays with uniform type)
      const arrayType = typeof value[0];
      typeDefinition += `  ${key}: ${arrayType}[],\n`;
    } else if (
      // Check if the value is an 'id'
      typeof value === 'string' &&
      key === 'id'
    ) {
      // Special handling for 'id' field
      const tsType = `"${value}"`;
      typeDefinition += `  ${key}: ${tsType},\n`;
    } else {
      // Primitive type
      const tsType = typeof value;
      typeDefinition += `  ${key}: ${tsType},\n`;
    }
  }

  return typeDefinition;
};

/**
 * This function generates a TypeScript type definition from a JSON object
 */
export const createTypes = (dictionariesPaths: string[]): string[] => {
  const resultTypesPaths: string[] = [];

  // Create type folders if they don't exist
  if (!existsSync(typesDir)) {
    mkdirSync(typesDir, { recursive: true });
  }

  for (const dictionaryPath of dictionariesPaths) {
    const contentModule: ContentModule = require(dictionaryPath);
    const dictionaryName: string = contentModule.id;
    const typeDefinition: string = generateTypeScriptType(contentModule);

    const outputPath = resolve(typesDir, `${dictionaryName}.d.ts`);

    writeFileSync(outputPath, typeDefinition);

    resultTypesPaths.push(outputPath);
  }

  return resultTypesPaths;
};
