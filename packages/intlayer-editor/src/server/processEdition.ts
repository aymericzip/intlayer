/* eslint-disable sonarjs/cognitive-complexity */
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { parse } from '@babel/parser';
import type {
  ObjectExpression,
  VariableDeclarator,
  Program,
  Identifier,
  StringLiteral,
  AssignmentExpression,
  ObjectProperty,
  CallExpression,
  ObjectMethod,
  SpreadElement,
  ArrayExpression,
} from '@babel/types';
import {
  NodeType,
  type KeyPath,
  type ArrayExpressionNode,
  type ObjectExpressionNode,
  type TranslationOrEnumerationNode,
} from '@intlayer/core';
import type { EditedContent } from '../client/index';
import { format } from './formatPrettier';

const requireFunction =
  typeof import.meta.url === 'undefined'
    ? require
    : createRequire(import.meta.url);

const { default: generate } = requireFunction('@babel/generator');

type ObjectOrArrayExpression = ObjectExpression | ArrayExpression;

/**
 * Helper function to find a nested property in an ObjectExpression based on a key path
 */
const findNestedProperty = (
  obj: ObjectOrArrayExpression,
  keyPath: KeyPath[]
): ObjectOrArrayExpression | undefined => {
  let currentObj: ObjectOrArrayExpression = obj;

  for (const key of keyPath) {
    let foundProperty:
      | ObjectProperty
      | ObjectMethod
      | SpreadElement
      | undefined;

    if (
      // if the keyPath is an object, select the related node
      (key as ObjectExpressionNode).type === 'ObjectExpression'
    ) {
      const result = (currentObj as ObjectExpression).properties.find(
        (prop) =>
          'key' in prop &&
          (prop.key as Identifier).name === (key as ObjectExpressionNode).key
      );

      if (result && 'value' in result) {
        currentObj = result.value as ObjectExpression;
      } else {
        return undefined;
      }

      foundProperty = result;
    }

    if (
      // if the keyPath is an array, select the related node
      (key as ArrayExpressionNode).type === 'ArrayExpression'
    ) {
      const result = (currentObj as ArrayExpression).elements[
        (key as ArrayExpressionNode).key
      ] as unknown as ObjectProperty;

      currentObj = result as unknown as ObjectExpression;
    }

    if (
      // if the keypath is a translation or enumeration node, go across the function and select the related node
      Object.values(NodeType).includes(
        (key as TranslationOrEnumerationNode).type
      )
    ) {
      const result = (
        (currentObj as unknown as CallExpression)
          .arguments[0] as ObjectExpression
      ).properties.find(
        (prop) => 'key' in prop && (prop.key as Identifier).name === key.key
      );
      if (result && 'value' in result) {
        currentObj = result.value as ObjectExpression;
      } else {
        return undefined;
      }

      foundProperty = result;
    }
  }

  return currentObj;
};

/**
 * Find and update specific content based on key path
 */
const findAndUpdate = (
  objExpr: ObjectExpression,
  keyPath: KeyPath[],
  newValue: string
) => {
  const lastKey = keyPath[keyPath.length - 1]; // Get the last key in the path

  if (lastKey) {
    const propertyToUpdate = findNestedProperty(objExpr, keyPath); // Traverse the key path

    if (propertyToUpdate && 'value' in propertyToUpdate) {
      (propertyToUpdate as unknown as StringLiteral).value = newValue; // Update the value of the specified key
    }
  }
};

/**
 * Traverse the AST and update based on key path and new value
 */
const traverseNode = (node: Program, keyPath: KeyPath[], newValue: string) => {
  if (Array.isArray(node.body)) {
    (node.body as unknown as Program[]).forEach((subNode) =>
      traverseNode(subNode, keyPath, newValue)
    );
  } else if (node.body) {
    traverseNode(node.body, keyPath, newValue);
  }

  if (
    // For ES Module (e.g., `const variable = ...;  export default variable`)
    'declarations' in node
  ) {
    (node.declarations as VariableDeclarator[]).forEach((declaration) => {
      if (declaration.init?.type === 'ObjectExpression') {
        findAndUpdate(declaration.init, keyPath, newValue);
      }
    });
  }

  if (
    // For ES Module (e.g., `export default { ... }`)
    'declaration' in node &&
    (node.declaration as ObjectExpression).type === 'ObjectExpression'
  ) {
    return findAndUpdate(
      node.declaration as ObjectExpression,
      keyPath,
      newValue
    );
  }

  if (
    // For CommonJS (e.g., `module.exports = ...`)
    'expression' in node &&
    (node.expression as AssignmentExpression).right.type === 'ObjectExpression'
  ) {
    return findAndUpdate(
      (node.expression as AssignmentExpression).right as ObjectExpression,
      keyPath,
      newValue
    );
  }
};

/**
 * Edit the content of a file based on the key path and new value
 */
export const processEdition = async (editedContent: EditedContent) => {
  // Loop into each dictionary path
  for (const dictionaryPath of Object.keys(editedContent)) {
    // Read the file
    const fileContent = readFileSync(dictionaryPath, 'utf-8');

    // Parse the content with TypeScript support
    const parsed = parse(fileContent, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    // Loop into each key path and new value
    for (const { keyPath, newValue } of editedContent[dictionaryPath]) {
      // Update values based on key paths
      traverseNode(parsed.program, keyPath, newValue);
    }

    // Generate the updated code
    const updatedContent = generate(parsed).code;

    if (fileContent === updatedContent) {
      console.info(`Could not find specified key path in ${dictionaryPath}.`);
    } else {
      const formattedContent = await format(updatedContent);

      // Write back to the file
      writeFileSync(dictionaryPath, formattedContent, 'utf-8');

      console.info('Updated the file successfully.');
    }
  }
};
