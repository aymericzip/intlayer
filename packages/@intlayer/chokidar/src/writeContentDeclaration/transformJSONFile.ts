import type { Dictionary } from '@intlayer/types';
import {
  IndentationText,
  Node,
  type ObjectLiteralExpression,
  Project,
  QuoteKind,
  SyntaxKind,
} from 'ts-morph';

/**
 * Checks if a value is a plain object (and not null/array)
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Safely formats a key for use in object literals.
 * Always quotes keys to ensure compatibility with standard JSON files.
 */
const stringifyKey = (objectKey: string): string => {
  return JSON.stringify(objectKey);
};

/**
 * Robustly finds a property in an ObjectLiteralExpression.
 * Handles cases where the property name in the source file is quoted ("key") or unquoted (key).
 */
const getMatchingProperty = (node: ObjectLiteralExpression, key: string) => {
  return node.getProperties().find((prop) => {
    // We only care about property assignments (key: value)
    if (Node.isPropertyAssignment(prop)) {
      const propName = prop.getName();
      // Check for strict match (unquoted identifier) or quoted match (string literal)
      // We check both double and single quotes to handle JSONC/JSON5 variations.
      return (
        propName === key || propName === `"${key}"` || propName === `'${key}'`
      );
    }
    return false;
  });
};

/**
 * Recursively updates the AST object literal with new data.
 */
const updateObjectLiteral = (
  node: ObjectLiteralExpression,
  data: Record<string, any>
) => {
  for (const [key, val] of Object.entries(data)) {
    // Skip undefined values.
    if (val === undefined) continue;

    const stringifiedValue = JSON.stringify(val, null, 2);

    // Safety check: ensure we have a string unless we are recursing into an object
    if (stringifiedValue === undefined && !isPlainObject(val)) continue;

    // Use robust lookup instead of node.getProperty(key)
    const existingProp = getMatchingProperty(node, key);

    if (isPlainObject(val)) {
      if (existingProp && Node.isPropertyAssignment(existingProp)) {
        const initializer = existingProp.getInitializer();

        if (Node.isObjectLiteralExpression(initializer)) {
          // Recurse into nested object
          updateObjectLiteral(initializer, val);
        } else {
          // Property exists but is not an object (e.g. was null or number), overwrite with new object
          existingProp.setInitializer(stringifiedValue!);
        }
      } else if (existingProp) {
        // Property exists but isn't a simple assignment, overwrite it safely
        existingProp.replaceWithText(
          `${stringifyKey(key)}: ${stringifiedValue}`
        );
      } else {
        // Property doesn't exist, add it
        node.addPropertyAssignment({
          name: stringifyKey(key),
          initializer: stringifiedValue!,
        });
      }
    } else {
      // Handling Primitives / Arrays
      if (existingProp && Node.isPropertyAssignment(existingProp)) {
        existingProp.setInitializer(stringifiedValue!);
      } else if (existingProp) {
        existingProp.replaceWithText(
          `${stringifyKey(key)}: ${stringifiedValue}`
        );
      } else {
        node.addPropertyAssignment({
          name: stringifyKey(key),
          initializer: stringifiedValue!,
        });
      }
    }
  }
};

export const transformJSONFile = (
  fileContent: string,
  dictionary: Dictionary
): string => {
  // Initialize a virtual project
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Double,
    },
  });

  // Wrap content in a variable declaration so it acts as a valid SourceFile
  const dummyFileName = 'temp.ts';
  const wrappedContent = `const _config = ${fileContent.trim() || '{}'}`;
  const sourceFile = project.createSourceFile(dummyFileName, wrappedContent);

  // Locate the object literal
  const varDecl = sourceFile.getVariableDeclaration('_config');
  const objectLiteral = varDecl?.getInitializerIfKind(
    SyntaxKind.ObjectLiteralExpression
  );

  if (!objectLiteral) {
    // Fallback if parsing failed
    return JSON.stringify(dictionary, null, 2);
  }

  // Update the AST
  updateObjectLiteral(objectLiteral, dictionary);

  // Format text to ensure new properties are aligned
  sourceFile.formatText();

  // Extract the object literal text.
  return objectLiteral.getText();
};
