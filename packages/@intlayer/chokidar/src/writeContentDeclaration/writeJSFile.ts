import generator from '@babel/generator';
import * as babelParser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { getAppLogger, logger } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import {
  Dictionary,
  NodeType,
  TranslationContent,
  TypedNode,
} from '@intlayer/core';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { extname } from 'path';
import { getContentDeclarationFileTemplate } from '../getContentDeclarationFileTemplate/getContentDeclarationFileTemplate';
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
  const appLogger = getAppLogger(configuration);

  const {
    key: dictionaryIdentifierKey,
    content: updatesToApply,
    locale,
    autoFilled,
  } = dictionary;
  const isPerLocaleDeclarationFile = typeof locale === 'string';

  // Check if the file exist
  if (!existsSync(filePath)) {
    const fileExtension = extname(filePath);

    let format = 'ts' as 'ts' | 'cjs' | 'esm';

    if (fileExtension === '.ts' || fileExtension === '.tsx') {
      format = 'ts';
    } else if (fileExtension === '.cjs' || fileExtension === '.cjsx') {
      format = 'cjs';
    } else {
      format = 'esm';
    }

    appLogger('File does not exist, creating it', {
      isVerbose: true,
    });
    const template = await getContentDeclarationFileTemplate(
      dictionaryIdentifierKey,
      format,
      { locale, autoFilled }
    );

    await writeFile(filePath, template, 'utf-8');
  }

  let sourceCode: string;
  try {
    sourceCode = await readFile(filePath, 'utf-8');
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

  /**
   * Build a Babel Expression for any JSON-serializable value or TypedNode.
   * - Translation nodes become t({...}) or string literal in per-locale files
   * - Objects recurse to ObjectExpression
   * - Arrays recurse to ArrayExpression
   * - Strings/numbers/booleans/null to corresponding literals
   */
  const buildValueNodeFromData = (data: any): t.Expression => {
    // Translation typed node
    if ((data as TypedNode)?.nodeType === NodeType.Translation) {
      const translationContent = data as TranslationContent;
      if (
        isPerLocaleDeclarationFile &&
        typeof locale === 'string' &&
        translationContent?.[NodeType.Translation]?.[locale]
      ) {
        return t.stringLiteral(
          String(translationContent[NodeType.Translation][locale])
        );
      }
      const translationsObj = t.objectExpression(
        Object.entries(translationContent?.[NodeType.Translation] ?? {}).map(
          ([langKey, langValue]) => {
            const keyNode = t.isValidIdentifier(langKey)
              ? t.identifier(langKey)
              : t.stringLiteral(langKey);
            return t.objectProperty(
              keyNode,
              t.stringLiteral(String(langValue))
            );
          }
        )
      );
      return t.callExpression(t.identifier('t'), [translationsObj]);
    }

    // Arrays
    if (Array.isArray(data)) {
      return t.arrayExpression(data.map((el) => buildValueNodeFromData(el)));
    }

    // Objects (plain)
    if (data && typeof data === 'object') {
      const props = Object.entries(data).map(([k, v]) => {
        const key = t.isValidIdentifier(k)
          ? t.identifier(k)
          : t.stringLiteral(k);
        return t.objectProperty(key, buildValueNodeFromData(v));
      });
      return t.objectExpression(props);
    }

    // Primitives
    switch (typeof data) {
      case 'string':
        return t.stringLiteral(data);
      case 'number':
        return t.numericLiteral(data);
      case 'boolean':
        return t.booleanLiteral(data);
      default:
        return t.nullLiteral();
    }
  };

  /** Ensure an object property exists on a given object expression path. */
  const ensureObjectProperty = (
    objPath: NodePath<t.ObjectExpression>,
    key: string
  ): NodePath<t.ObjectProperty> => {
    const existing = (
      objPath.get('properties') as NodePath<
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
      return keyName === key;
    }) as NodePath<t.ObjectProperty> | undefined;

    if (existing) return existing;

    const keyNode = t.isValidIdentifier(key)
      ? t.identifier(key)
      : t.stringLiteral(key);
    const newProp = t.objectProperty(keyNode, t.objectExpression([]));
    objPath.node.properties.push(newProp);

    // Return a fresh path for the newly pushed property
    const props = objPath.get('properties') as NodePath<
      t.ObjectProperty | t.SpreadElement | t.ObjectMethod
    >[];
    return props[props.length - 1] as NodePath<t.ObjectProperty>;
  };

  /** Recursively merge a JSON-like value into an ObjectExpression property path. */
  const mergeValueIntoProperty = (
    propPath: NodePath<t.ObjectProperty>,
    value: any,
    propKeyForLogs: string
  ) => {
    const valuePath = propPath.get('value') as NodePath;

    // Translation typed node → either update t() args or replace value
    if ((value as TypedNode)?.nodeType === NodeType.Translation) {
      const translationContent = value as TranslationContent;
      if (
        valuePath.isCallExpression() &&
        t.isIdentifier(valuePath.node.callee) &&
        valuePath.node.callee.name === 't'
      ) {
        // Replace argument with the full translations object (simpler and robust)
        const translationsObj = t.objectExpression(
          Object.entries(translationContent?.[NodeType.Translation] ?? {}).map(
            ([langKey, langValue]) =>
              t.objectProperty(
                t.isValidIdentifier(langKey)
                  ? t.identifier(langKey)
                  : t.stringLiteral(langKey),
                t.stringLiteral(String(langValue))
              )
          )
        );

        if (isPerLocaleDeclarationFile && typeof locale === 'string') {
          const str = translationContent?.[NodeType.Translation]?.[locale];
          if (str) {
            valuePath.replaceWith(t.stringLiteral(String(str)));
            return;
          }
        }

        (valuePath.node as t.CallExpression).arguments = [translationsObj];
        return;
      }

      // Otherwise, replace with a fresh node
      valuePath.replaceWith(buildValueNodeFromData(value));
      return;
    }

    // Arrays → replace entirely
    if (Array.isArray(value)) {
      valuePath.replaceWith(buildValueNodeFromData(value));
      return;
    }

    // Objects → ensure object expression and recurse into each key
    if (value && typeof value === 'object') {
      if (!valuePath.isObjectExpression()) {
        valuePath.replaceWith(t.objectExpression([]));
      }
      const objPath = valuePath as NodePath<t.ObjectExpression>;
      for (const [k, v] of Object.entries(value)) {
        const childProp = ensureObjectProperty(objPath, k);
        mergeValueIntoProperty(childProp, v, `${propKeyForLogs}.${k}`);
      }
      return;
    }

    // Primitives → replace
    valuePath.replaceWith(buildValueNodeFromData(value));
    return;
  };

  // Apply updates to each entry specified in the JSON (now supports deep nesting)
  for (const [entryKeyToUpdate, newEntryData] of Object.entries(
    updatesToApply
  )) {
    let targetPropertyPath = (
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
    }) as NodePath<t.ObjectProperty> | undefined;

    if (!targetPropertyPath) {
      const keyNode = t.isValidIdentifier(entryKeyToUpdate)
        ? t.identifier(entryKeyToUpdate)
        : t.stringLiteral(entryKeyToUpdate);
      // By default create an empty object; merge will replace if needed
      const newProperty = t.objectProperty(keyNode, t.objectExpression([]));
      contentObjectPath.node.properties.push(newProperty);
      const props = contentObjectPath.get('properties') as NodePath<
        t.ObjectProperty | t.SpreadElement | t.ObjectMethod
      >[];
      targetPropertyPath = props[
        props.length - 1
      ] as NodePath<t.ObjectProperty>;
    }

    mergeValueIntoProperty(targetPropertyPath, newEntryData, entryKeyToUpdate);
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
