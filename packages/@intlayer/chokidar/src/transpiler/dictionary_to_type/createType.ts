import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import {
  NodeType,
  type Dictionary,
  type DictionaryValue,
  type TypedNode,
} from '@intlayer/core';
import { getTypeName } from './createModuleAugmentation';

const { content } = getConfiguration();
const { typesDir } = content;

const isESModule = typeof import.meta.url === 'string';
const requireFunction = isESModule ? createRequire(import.meta.url) : require;

const getFirstValue = (obj: Record<string, DictionaryValue>): DictionaryValue =>
  Object.values(obj)[0];

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
export const generateTypeScriptType = (obj: Dictionary): string => {
  let typeDefinition = ``;

  const typeName = getTypeName(obj.id);

  typeDefinition += `export type ${typeName} = `;
  typeDefinition += generateTypeScriptTypeContent(obj as DictionaryValue);
  typeDefinition += ';\n\n';

  return typeDefinition;
};

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const generateTypeScriptTypeContent = (obj: DictionaryValue): string => {
  if (typeof obj !== 'object' || obj === null) {
    return `${typeof obj}`;
  }

  const isReactNodeValue = isReactNode(obj as Record<string, unknown>);

  if (isReactNodeValue) {
    // ReactNode handling
    return `JSX.Element`;
  }

  if (
    // Check if the value is a typed node
    (obj as TypedNode).nodeType === NodeType.Translation
  ) {
    const { nodeType, ...content } = obj as TypedNode;

    const languageValue: DictionaryValue = getFirstValue(
      content as Record<string, DictionaryValue>
    );

    const tsType = generateTypeScriptTypeContent(languageValue);
    return `${tsType}`;
  } else if (
    // Check if the value is a typed node
    (obj as TypedNode).nodeType === NodeType.Enumeration
  ) {
    const { nodeType, ...content } = obj as TypedNode;

    const quantifiedValue: DictionaryValue = getFirstValue(
      content as Record<string, DictionaryValue>
    );

    const tsType = generateTypeScriptTypeContent(quantifiedValue);

    return `(quantity: number) => ${tsType}`;
  } else if (Array.isArray(obj)) {
    // Array handling (simplified, assumes non-empty arrays with uniform type)
    const arrayType = generateTypeScriptTypeContent(obj[0] as DictionaryValue);

    return `${arrayType}[]`;
  }

  let typeDefinition = '{';
  // Nested object, recurse
  for (const [key, value] of Object.entries(obj)) {
    const isLast =
      Object.keys(obj).indexOf(key) === Object.keys(obj).length - 1;

    const nestedType = generateTypeScriptTypeContent(value as DictionaryValue);

    typeDefinition += `'${key}': ${nestedType}`;

    if (!isLast) {
      typeDefinition += ',';
    }
  }
  typeDefinition += '}';
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
    const dictionary: Dictionary = requireFunction(dictionaryPath);
    const dictionaryName: string = dictionary.id;
    const typeDefinition: string = generateTypeScriptType(dictionary);

    const outputPath: string = resolve(typesDir, `${dictionaryName}.d.ts`);

    writeFileSync(outputPath, typeDefinition);

    resultTypesPaths.push(outputPath);
  }

  return resultTypesPaths;
};
