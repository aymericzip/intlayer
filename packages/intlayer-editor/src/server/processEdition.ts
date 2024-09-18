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
  ArrayExpression,
} from '@babel/types';
import {
  NodeType,
  type KeyPath,
  type ArrayExpressionNode,
  type ObjectExpressionNode,
  type TranslationOrEnumerationNode,
} from '@intlayer/core';
import type { EditedContent } from '@intlayer/design-system';
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
    const nextProperty = getNextProperty(currentObj, key);

    if (!nextProperty)
      throw new Error('Could not find the specified key path.');

    currentObj = nextProperty;
  }

  return currentObj;
};

const getNextProperty = (
  obj: ObjectOrArrayExpression,
  key: KeyPath
): ObjectOrArrayExpression | undefined => {
  if ((key as ObjectExpressionNode).type === 'ObjectExpression') {
    return findInObjectExpression(
      obj as ObjectExpression,
      key as ObjectExpressionNode
    );
  }

  if ((key as ArrayExpressionNode).type === 'ArrayExpression') {
    return (obj as ArrayExpression).elements[
      (key as ArrayExpressionNode).key
    ] as ObjectOrArrayExpression;
  }

  if (
    Object.values(NodeType).includes((key as TranslationOrEnumerationNode).type)
  ) {
    return findInTranslationOrEnumerationNode(
      obj as unknown as CallExpression,
      key as TranslationOrEnumerationNode
    );
  }

  return undefined;
};

const findInObjectExpression = (
  obj: ObjectExpression,
  key: ObjectExpressionNode
): ObjectOrArrayExpression | undefined => {
  const result = obj.properties.find(
    (prop) => 'key' in prop && (prop.key as Identifier).name === key.key
  );

  return result && 'value' in result
    ? (result.value as ObjectOrArrayExpression)
    : undefined;
};

const findInTranslationOrEnumerationNode = (
  obj: CallExpression,
  key: TranslationOrEnumerationNode
): ObjectOrArrayExpression | undefined => {
  const argument = obj.arguments[0] as ObjectExpression;
  const identifierResult = argument.properties.find(
    (prop) => 'key' in prop && (prop.key as Identifier).name === key.key
  ) as ObjectProperty;

  const stringResult = identifierResult.value as StringLiteral;

  return stringResult
    ? (identifierResult as unknown as ObjectOrArrayExpression)
    : identifierResult && 'name' in identifierResult
      ? (identifierResult.name as ObjectOrArrayExpression)
      : undefined;
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

    if (!propertyToUpdate) {
      throw new Error('Could not find the specified key path.');
    }

    if ('value' in propertyToUpdate) {
      (propertyToUpdate.value as StringLiteral).value = newValue; // Update the value of the specified key
    }
  }
};

/**
 * Traverse the AST and update based on key path and new value
 */
const traverseNode = (node: Program, keyPath: KeyPath[], newValue: string) => {
  if (Array.isArray(node.body)) {
    node.body.forEach((subNode) =>
      traverseNode(subNode as unknown as Program, keyPath, newValue)
    );
  } else if (node.body) {
    traverseNode(node.body as Program, keyPath, newValue);
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
  for (const dictionaryPath of Object.keys(editedContent)) {
    const fileContent = readFileSync(dictionaryPath, 'utf-8');
    const parsedBase = parseFileContent(fileContent);
    const parsed = parseFileContent(fileContent);

    for (const { keyPath, newValue } of editedContent[dictionaryPath]) {
      traverseNode(parsed.program, keyPath, newValue);
    }

    await writeUpdatedContent(dictionaryPath, parsedBase, parsed);
  }
};

const parseFileContent = (fileContent: string) =>
  parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

const writeUpdatedContent = async (
  dictionaryPath: string,
  parsedBase: ReturnType<typeof parseFileContent>,
  parsed: ReturnType<typeof parseFileContent>
) => {
  const baseContent = generate(parsedBase).code;
  const updatedContent = generate(parsed).code;

  if (baseContent === updatedContent) {
    console.info(
      `No change made on the dictionary - dictionaryPath: ${dictionaryPath}.`
    );
  } else {
    const formattedContent = await format(updatedContent);
    writeFileSync(dictionaryPath, formattedContent, 'utf-8');
    console.info('Updated the file successfully.');
  }
};
