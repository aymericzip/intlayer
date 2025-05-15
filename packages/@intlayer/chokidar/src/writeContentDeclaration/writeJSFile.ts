import generator from '@babel/generator';
import * as babelParser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { appLogger, logger } from '@intlayer/config';
import { Dictionary, TranslationContent, TypedNode } from '@intlayer/core';
import { readFile, writeFile } from 'fs/promises';
import { formatCode } from './formatCode';

/**
 * Updates a JavaScript/TypeScript file based on the provided JSON instructions.
 * It targets a specific dictionary object within the file (identified by its 'key' property)
 * and updates its 'content' entries. Currently, it focuses on modifying arguments
 * of 't' (translation) function calls.
 */
export const writeJSFile = async (
  filePath: string,
  dictionary: Dictionary
): Promise<void> => {
  const { key: dictionaryIdentifierKey, content: updatesToApply } = dictionary;

  let sourceCode: string;
  try {
    sourceCode = await readFile(filePath ?? '', 'utf-8');
  } catch (error) {
    const err = error as Error;
    appLogger(`Failed to read file: ${filePath}`, {
      level: 'error',
    });
    throw new Error(`Failed to read file ${filePath}: ${err.message}`);
  }

  const ast = babelParser.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
    tokens: true,
  });

  let dictionaryObjectPath: NodePath<t.ObjectExpression> | null = null;
  let dictionaryIdentifier: string | null = null;

  // First look for direct objects with the right key, regardless of variable assignments
  traverse(ast, {
    ObjectExpression(path) {
      if (dictionaryObjectPath) return; // Already found

      // Check if this object has a key property with the right value
      const keyProp = path.node.properties.find((prop) => {
        if (!t.isObjectProperty(prop)) return false;
        if (!t.isIdentifier(prop.key) && !t.isStringLiteral(prop.key))
          return false;

        const keyName = t.isIdentifier(prop.key)
          ? prop.key.name
          : prop.key.value;

        if (keyName !== 'key' || !t.isStringLiteral(prop.value)) return false;

        // Unescape the value for comparison
        const propValue = prop.value.value;
        // Compare actual string content, not just raw representation
        return propValue === dictionaryIdentifierKey;
      });

      if (keyProp) {
        dictionaryObjectPath = path;
        path.stop();
      }
    },
  });

  // If not found directly, look for variable declarations and exports
  if (!dictionaryObjectPath) {
    appLogger(`Looking for variable declarations`, {
      isVerbose: true,
    });

    // Collect all variable declarations with objects
    const candidateVars: { id: string; path: NodePath<t.ObjectExpression> }[] =
      [];

    traverse(ast, {
      VariableDeclarator(path) {
        const { node } = path;
        if (!t.isIdentifier(node.id)) return;

        let objPath: NodePath<t.ObjectExpression> | null = null;

        // Direct object assignment
        if (node.init && t.isObjectExpression(node.init)) {
          objPath = path.get('init') as NodePath<t.ObjectExpression>;
        }
        // Object with TS type assertion (satisfies/as)
        else if (
          node.init &&
          (t.isTSAsExpression(node.init) || t.isTSTypeAssertion(node.init)) &&
          t.isObjectExpression(node.init.expression)
        ) {
          objPath = path.get('init.expression') as NodePath<t.ObjectExpression>;
        }

        if (objPath) {
          candidateVars.push({ id: node.id.name, path: objPath });
        }
      },
    });

    appLogger(`Found ${candidateVars.length} candidate variables`, {
      isVerbose: true,
    });

    // Check each candidate for the key property
    for (const { id, path } of candidateVars) {
      const keyProp = path.node.properties.find((prop) => {
        if (!t.isObjectProperty(prop)) return false;
        if (!t.isIdentifier(prop.key) && !t.isStringLiteral(prop.key))
          return false;

        const keyName = t.isIdentifier(prop.key)
          ? prop.key.name
          : prop.key.value;
        return (
          keyName === 'key' &&
          t.isStringLiteral(prop.value) &&
          prop.value.value === dictionaryIdentifierKey
        );
      });

      if (keyProp) {
        appLogger(`Found match in variable: ${id}`);
        dictionaryObjectPath = path;
        dictionaryIdentifier = id;
        break;
      }
    }

    // If still not found, dump all object expressions for debugging
    if (!dictionaryObjectPath) {
      appLogger('Could not find dictionary object. Dumping all objects:', {
        isVerbose: true,
      });
      traverse(ast, {
        ObjectExpression(path) {
          const props = path.node.properties
            .map((prop) => {
              if (!t.isObjectProperty(prop)) return 'non-object-property';
              if (!t.isIdentifier(prop.key) && !t.isStringLiteral(prop.key))
                return 'complex-key';

              const keyName = t.isIdentifier(prop.key)
                ? prop.key.name
                : prop.key.value;
              let valueDesc = 'unknown-value';

              if (t.isStringLiteral(prop.value)) {
                valueDesc = `"${prop.value.value}"`;
              }

              return `${keyName}: ${valueDesc}`;
            })
            .join(', ');

          appLogger(`Object: { ${props} }`);
        },
      });
    }
  }

  if (!dictionaryObjectPath) {
    throw new Error(
      `Could not find dictionary object with key '${dictionaryIdentifierKey}' in ${filePath}`
    );
  }

  // Find the 'content' property within the identified dictionary object
  const contentPropertyPath = (
    (dictionaryObjectPath as any).get('properties') as NodePath<
      t.ObjectProperty | t.SpreadElement | t.ObjectMethod
    >[]
  ).find((propPath) => {
    if (!propPath.isObjectProperty()) return false;
    const propNode = propPath.node;
    const keyName = t.isIdentifier(propNode.key)
      ? propNode.key.name
      : t.isStringLiteral(propNode.key)
        ? propNode.key.value
        : null;
    return keyName === 'content';
  });

  if (
    !contentPropertyPath ||
    !contentPropertyPath.isObjectProperty() ||
    !(contentPropertyPath.get('value') as NodePath).isObjectExpression()
  ) {
    throw new Error(
      `Could not find 'content' object property, or it's not an object, in dictionary in ${filePath}`
    );
  }

  const contentObjectPath = contentPropertyPath.get(
    'value'
  ) as NodePath<t.ObjectExpression>;

  // Apply updates to each entry specified in the JSON
  for (const [entryKeyToUpdate, newEntryData] of Object.entries(
    updatesToApply
  )) {
    const targetPropertyPath = (
      contentObjectPath.get('properties') as NodePath<
        t.ObjectProperty | t.SpreadElement | t.ObjectMethod
      >[]
    ).find((propPath) => {
      if (!propPath.isObjectProperty()) return false;
      const propNode = propPath.node;
      const keyName = t.isIdentifier(propNode.key)
        ? propNode.key.name
        : t.isStringLiteral(propNode.key)
          ? propNode.key.value
          : null;
      return keyName === entryKeyToUpdate;
    });

    if (!targetPropertyPath || !targetPropertyPath.isObjectProperty()) {
      appLogger(
        `Key '${entryKeyToUpdate}' not found in content object of ${filePath}. Skipping update for this key.`,
        {
          level: 'warn',
          isVerbose: true,
        }
      );
      continue;
    }

    const callExpressionPath = targetPropertyPath.get('value') as NodePath; // Path to the value, e.g., t(...)

    // Handle different types of values
    if (callExpressionPath.isCallExpression()) {
      const calleeNode = (callExpressionPath.node as t.CallExpression).callee;
      const calleeName = t.isIdentifier(calleeNode) ? calleeNode.name : null;

      // Handle 't' function calls
      if (
        (newEntryData as TypedNode).nodeType === 'translation' &&
        calleeName === 't'
      ) {
        const args = (callExpressionPath.node as t.CallExpression).arguments;
        if (args.length === 0 || !t.isObjectExpression(args[0])) {
          appLogger(
            `'t' call for '${entryKeyToUpdate}' in ${filePath} does not have an object literal as its first argument. Skipping.`,
            {
              level: 'warn',
              isVerbose: true,
            }
          );
          continue;
        }

        const translationsObjectAstNode = args[0] as t.ObjectExpression;
        const processedLangKeysInJsonUpdate = new Set<string>();

        // Update existing language properties in the AST node
        translationsObjectAstNode.properties.forEach((prop: any) => {
          if (t.isObjectProperty(prop)) {
            const langKeyNode = prop.key;
            const astLangKeyName = t.isIdentifier(langKeyNode)
              ? langKeyNode.name
              : t.isStringLiteral(langKeyNode)
                ? langKeyNode.value
                : null;

            if (
              astLangKeyName &&
              (newEntryData as TranslationContent).translation.hasOwnProperty(
                astLangKeyName
              )
            ) {
              prop.value = t.stringLiteral(
                String(
                  (newEntryData as TranslationContent).translation[
                    astLangKeyName
                  ]
                )
              );
              processedLangKeysInJsonUpdate.add(astLangKeyName);
            }
          }
        });

        // Add new language properties from the JSON update that were not originally in the AST node
        for (const [jsonLangKey, jsonLangValue] of Object.entries(
          (newEntryData as TranslationContent).translation
        )) {
          if (!processedLangKeysInJsonUpdate.has(jsonLangKey)) {
            const newKeyNode = t.isValidIdentifier(jsonLangKey)
              ? t.identifier(jsonLangKey)
              : t.stringLiteral(jsonLangKey);
            translationsObjectAstNode.properties.push(
              t.objectProperty(
                newKeyNode,
                t.stringLiteral(String(jsonLangValue))
              )
            );
          }
        }
      }
      // Handle other function calls in the future
      else {
        appLogger(
          `Unhandled callee '${calleeName || 'unknown'}' for key '${entryKeyToUpdate}' in ${filePath}.`,
          { level: 'warn', isVerbose: true }
        );
      }
    }
    // Handle direct string literals
    else if (callExpressionPath.isStringLiteral()) {
      // For string literals, directly replace with the new value
      if (typeof newEntryData === 'string') {
        targetPropertyPath
          .get('value')
          .replaceWith(t.stringLiteral(newEntryData));
      } else if ((newEntryData as any).translation) {
        // Handle translation content (use first available translation)
        const translations = (newEntryData as TranslationContent).translation;
        const firstValue = Object.values(translations)[0];
        if (firstValue) {
          targetPropertyPath
            .get('value')
            .replaceWith(t.stringLiteral(String(firstValue)));
        }
      } else {
        appLogger(
          `Unhandled data structure for string replacement at '${entryKeyToUpdate}' in ${filePath}.`,
          { level: 'warn', isVerbose: true }
        );
      }
    }
    // Handle other value types (objects, arrays, etc.)
    else {
      const valueType = callExpressionPath.node.type;
      appLogger(
        `Updating value of type ${valueType} for '${entryKeyToUpdate}' in ${filePath}`,
        { level: 'info', isVerbose: true }
      );

      // For simple values like strings, use direct replacement
      if (typeof newEntryData === 'string') {
        targetPropertyPath
          .get('value')
          .replaceWith(t.stringLiteral(newEntryData));
      }
      // For translation content, use a smart approach
      else if ((newEntryData as any).translation) {
        // Extract just the value relevant to this file's locale
        const translations = (newEntryData as TranslationContent).translation;

        // Try to determine locale from file path (assuming a pattern like .fr.content.ts)
        const localeMatch = filePath.match(/\.([a-z]{2})\.content\.(ts|js)$/i);
        const locale = localeMatch
          ? localeMatch[1]
          : Object.keys(translations)[0];

        if (translations[locale]) {
          targetPropertyPath
            .get('value')
            .replaceWith(t.stringLiteral(String(translations[locale])));
        } else {
          // Fallback to first translation
          const firstValue = Object.values(translations)[0];
          if (firstValue) {
            targetPropertyPath
              .get('value')
              .replaceWith(t.stringLiteral(String(firstValue)));
          }
        }
      } else {
        appLogger(
          `Cannot update value of type ${valueType} for '${entryKeyToUpdate}' in ${filePath}. Unsupported data structure.`,
          { level: 'warn', isVerbose: true }
        );
      }
    }
  }

  // Generate JavaScript/TypeScript code from the modified AST
  const generatedCode = generator(ast, {
    retainLines: true,
    comments: true,
    jsescOption: {
      minimal: true, // This ensures Unicode characters are not escaped
    },
  }).code;

  let finalCode = generatedCode;

  finalCode = await formatCode(filePath, finalCode);

  // Write the modified code back to the file
  try {
    await writeFile(filePath, finalCode, 'utf-8');
    logger(`Successfully updated ${filePath}`, {
      level: 'info',
      isVerbose: true,
    });
  } catch (error) {
    const err = error as Error;
    logger(`Failed to write updated file: ${filePath}`, {
      level: 'error',
    });
    throw new Error(`Failed to write updated file ${filePath}: ${err.message}`);
  }
};
