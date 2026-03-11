import type { Dictionary } from '@intlayer/types/dictionary';
import * as recast from 'recast';
import * as babelParser from 'recast/parsers/babel.js';

const b = recast.types.builders;
const n = recast.types.namedTypes;

/**
 * Checks if a value is a plain object (and not null/array)
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Robustly finds a property in a recast ObjectExpression.
 * Handles quoted ("key") or unquoted (key) properties.
 */
const getMatchingProperty = (node: any, key: string) => {
  return node.properties.find((prop: any) => {
    if (n.Property.check(prop) || n.ObjectProperty.check(prop)) {
      if (n.Identifier.check(prop.key) && prop.key.name === key) return true;
      if (n.StringLiteral.check(prop.key) && prop.key.value === key)
        return true;
      if (n.Literal.check(prop.key) && prop.key.value === key) return true;
    }
    return false;
  });
};

/**
 * Recursively builds a clean recast AST node from a plain JS value.
 * Because these nodes lack `loc` tracking, recast is forced to pretty-print them.
 */
const buildASTNode = (val: unknown): any => {
  if (val === null) return b.literal(null);

  if (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  ) {
    return b.literal(val);
  }

  if (Array.isArray(val)) {
    return b.arrayExpression(val.map((item) => buildASTNode(item)));
  }

  if (isPlainObject(val)) {
    return b.objectExpression(
      Object.entries(val)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) =>
          b.property('init', b.stringLiteral(k), buildASTNode(v))
        )
    );
  }

  return b.literal(null); // Fallback
};

/**
 * Recursively updates the AST object literal with new data.
 */
const updateObjectLiteral = (node: any, data: Record<string, any>) => {
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined) continue;

    const existingProp = getMatchingProperty(node, key);

    if (isPlainObject(val)) {
      if (existingProp && n.ObjectExpression.check(existingProp.value)) {
        updateObjectLiteral(existingProp.value, val);
      } else {
        const valueNode = buildASTNode(val);
        if (existingProp) {
          existingProp.value = valueNode;
        } else {
          node.properties.push(
            b.property('init', b.stringLiteral(key), valueNode)
          );
        }
      }
    } else {
      const valueNode = buildASTNode(val);
      if (existingProp) {
        existingProp.value = valueNode;
      } else {
        node.properties.push(
          b.property('init', b.stringLiteral(key), valueNode)
        );
      }
    }
  }
};

export const transformJSONFile = (
  fileContent: string,
  dictionary: Dictionary,
  noMetadata?: boolean
): string => {
  // Wrap content to create valid syntax for the parser
  const wrappedContent = `const _config = ${fileContent.trim() || '{}'};`;

  let ast: ReturnType<typeof recast.parse>;
  try {
    ast = recast.parse(wrappedContent, {
      parser: babelParser,
    });
  } catch {
    // Fallback if parsing failed
    return JSON.stringify(
      noMetadata ? dictionary.content : dictionary,
      null,
      2
    );
  }

  // Navigate the AST to locate the object literal initialized to `_config`
  const declaration = ast.program.body[0];
  let objectLiteral: any;

  if (
    n.VariableDeclaration.check(declaration) &&
    declaration.declarations.length > 0 &&
    n.VariableDeclarator.check(declaration.declarations[0]) &&
    n.ObjectExpression.check(declaration.declarations[0].init)
  ) {
    objectLiteral = declaration.declarations[0].init;
  }

  if (noMetadata) {
    // Remove key, content and metadata properties if they exist
    const metadataProperties = [
      'id',
      'locale',
      'filled',
      'fill',
      'title',
      'description',
      'tags',
      'version',
      'priority',
      'contentAutoTransformation',
      '$schema',
    ];

    objectLiteral.properties = objectLiteral.properties.filter((prop: any) => {
      if (n.Property.check(prop) || n.ObjectProperty.check(prop)) {
        let propName = '';
        if (n.Identifier.check(prop.key)) propName = prop.key.name;
        else if (n.StringLiteral.check(prop.key)) propName = prop.key.value;
        else if (n.Literal.check(prop.key)) propName = String(prop.key.value);

        return !['key', 'content', ...metadataProperties].includes(propName);
      }
      return true;
    });
  }

  // Update the AST in place
  updateObjectLiteral(
    objectLiteral,
    noMetadata ? (dictionary.content as Record<string, any>) : dictionary
  );

  // Print only the target object literal node
  return recast.print(objectLiteral, {
    tabWidth: 2,
    quote: 'double',
    trailingComma: false,
  }).code;
};
