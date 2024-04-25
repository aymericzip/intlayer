import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import {
  NodeType,
  type Content,
  type ContentModule,
  type TypedNode,
} from '@intlayer/core';
import { getTypeName } from './createModuleAugmentation';

const { content, internationalization } = getConfiguration();
const { typesDir } = content;

const isESModule = typeof import.meta.url === 'string';
const requireFunction = isESModule ? createRequire(import.meta.url) : require;

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

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' &&
  typeof node?.props !== 'undefined' &&
  typeof node?.type !== 'undefined';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const generateTypeScriptTypeContent = (obj: Content): string => {
  if (typeof obj !== 'object' || obj === null) {
    return `${typeof obj}`;
  }

  const isReactNodeValue = isReactNode(obj as Record<string, unknown>);

  if (isReactNodeValue) {
    // ReactNode handling
    return `JSX.Element`;
  }

  let typeDefinition = ``;
  for (const [key, value] of Object.entries(obj)) {
    const nodeType: NodeType | undefined = (value as TypedNode)?.nodeType;
    type ValueKey = keyof typeof value;

    if (
      // Check if the value is a typed node
      typeof value === 'object' &&
      nodeType === NodeType.Translation
    ) {
      const tsType = generateTypeScriptTypeContent(
        value?.[internationalization.defaultLocale as ValueKey]
      );
      typeDefinition += `  ${key}: ${tsType},\n`;
    } else if (
      // Check if the value is a typed node
      typeof value === 'object' &&
      nodeType === NodeType.Enumeration
    ) {
      const tsType = generateTypeScriptTypeContent(
        value?.[internationalization.defaultLocale as ValueKey] as Content
      );

      typeDefinition += `  ${key}: (quantity: number) => ${tsType},\n`;
    } else if (
      // Check if the value is a nested object
      typeof value === 'object'
    ) {
      const isArray = Array.isArray(value);

      if (isArray) {
        // Array handling (simplified, assumes non-empty arrays with uniform type)
        const arrayType = generateTypeScriptTypeContent(value as Content);

        typeDefinition += `  ${key}: ${arrayType}[],\n`;
      } else {
        // Nested object, recurse
        const nestedType = generateTypeScriptTypeContent(value as Content);

        typeDefinition += `  ${key}: {${nestedType}},\n`;
      }
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
    const contentModule: ContentModule = requireFunction(dictionaryPath);
    const dictionaryName: string = contentModule.id;
    const typeDefinition: string = generateTypeScriptType(contentModule);

    const outputPath = resolve(typesDir, `${dictionaryName}.d.ts`);

    writeFileSync(outputPath, typeDefinition);

    resultTypesPaths.push(outputPath);
  }

  return resultTypesPaths;
};
