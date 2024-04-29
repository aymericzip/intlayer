import * as fs from 'fs';
import { createRequire } from 'module';
import { parse } from '@babel/parser';
import type {
  ObjectExpression,
  VariableDeclarator,
  Program,
  Identifier,
  StringLiteral,
  AssignmentExpression,
} from '@babel/types';
import prettier from 'prettier';
import type { ReactNode } from 'react';

const requireFunction =
  typeof import.meta.url === 'undefined'
    ? require
    : createRequire(import.meta.url);

const { default: generate } = requireFunction('@babel/generator');

/**
 * Helper function to find a nested property in an ObjectExpression based on a key path
 */
const findNestedProperty = (
  obj: ObjectExpression,
  keyPath: string[]
): ObjectExpression | undefined => {
  let currentObj = obj;
  for (const key of keyPath) {
    const foundProperty = currentObj.properties.find(
      (prop) => 'key' in prop && (prop.key as Identifier).name === key
    );
    if (
      foundProperty &&
      'value' in foundProperty &&
      foundProperty.value.type === 'ObjectExpression'
    ) {
      currentObj = foundProperty.value;
    } else {
      return undefined;
    }
  }
  return currentObj;
};

/**
 * Find and update specific content based on key path
 */
const findAndUpdate = (
  objExpr: ObjectExpression,
  keyPath: string[],
  newValue: ReactNode
) => {
  const lastKey = keyPath.pop(); // Get the last key in the path
  if (lastKey) {
    const nestedProperty = findNestedProperty(objExpr, keyPath); // Traverse the key path

    if (nestedProperty) {
      const propertyToUpdate = nestedProperty.properties.find(
        (prop) => 'key' in prop && (prop.key as Identifier).name === lastKey
      );

      if (propertyToUpdate && 'value' in propertyToUpdate) {
        (propertyToUpdate.value as StringLiteral).value = newValue as string; // Update the value of the specified key
      }
    }
  }
};

/**
 * Traverse the AST and update based on key path and new value
 */
const traverseNode = (
  node: Program,
  keyPath: string[],
  newValue: ReactNode
) => {
  if (Array.isArray(node.body)) {
    (node.body as unknown as Program[]).forEach((subNode) =>
      traverseNode(subNode, keyPath, newValue)
    );
  } else if (node.body) {
    traverseNode(node.body, keyPath, newValue);
  }

  if ('declarations' in node) {
    // For ES Module (e.g., `const variable = ...`)
    (node.declarations as VariableDeclarator[]).forEach((declaration) => {
      if (declaration.init?.type === 'ObjectExpression') {
        findAndUpdate(declaration.init, keyPath, newValue);
      }
    });
  }

  if (
    'expression' in node &&
    (node.expression as AssignmentExpression).right.type === 'ObjectExpression'
  ) {
    // For CommonJS (e.g., `module.exports = ...`)
    findAndUpdate(
      (node.expression as AssignmentExpression).right as ObjectExpression,
      keyPath,
      newValue
    );
  }
};

/**
 * Format the content with Prettier
 */
const format = async (content: string) => {
  // Resolve the configuration from the project
  let options: prettier.Options = {};

  try {
    // Resolve the prettier configuration from the project
    options =
      (await prettier.resolveConfig(content, {
        editorconfig: true,
      })) ?? {};
  } catch (error) {
    console.error('Failed to resolve Prettier configuration:', error);
  }

  // Add the parser option to the resolved config
  const config: prettier.Options = { ...options, parser: 'typescript' };

  return prettier.format(content, config);
};

/**
 * Edit the content of a file based on the key path and new value
 */
export const editContent = async (
  filePath: string,
  keyPath: string[],
  newValue: ReactNode
) => {
  // Read the file
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse the content with TypeScript support
  const parsed = parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  // Update values based on key paths
  traverseNode(parsed.program, keyPath, newValue);

  // Generate the updated code
  const updatedContent = generate(parsed).code;

  if (fileContent === updatedContent) {
    console.info(`Could not find specified key path in ${filePath}.`);
  } else {
    const formattedContent = await format(updatedContent);

    // Write back to the file
    fs.writeFileSync(filePath, formattedContent, 'utf-8');

    console.info('Updated the file successfully.');
  }
};
