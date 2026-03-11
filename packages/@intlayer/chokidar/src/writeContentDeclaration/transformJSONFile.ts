import type { Dictionary } from '@intlayer/types/dictionary';
import * as recast from 'recast';

const b = recast.types.builders;
const n = recast.types.namedTypes;

/**
 * Checks if a value is a plain object (and not null/array)
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Checks if a recast AST node value matches the incoming primitive value.
 */
const isPrimitiveEqual = (astNode: any, val: unknown): boolean => {
  if (val === null) {
    return n.Literal.check(astNode) && astNode.value === null;
  }
  if (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  ) {
    return (
      (n.Literal.check(astNode) ||
        n.StringLiteral.check(astNode) ||
        n.NumericLiteral.check(astNode) ||
        n.BooleanLiteral.check(astNode)) &&
      astNode.value === val
    );
  }
  return false;
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
    if (val === undefined) {
      continue;
    }

    const existingProp = getMatchingProperty(node, key);

    if (existingProp?.comments) {
      existingProp.comments.forEach((c: any) => {
        if (c.type === 'Line' || c.type === 'CommentLine') {
          // Convert to block comment and tag it to force Recast to print it inline
          c.type = c.type === 'Line' ? 'Block' : 'CommentBlock';
          c.value = `__INLINE_LINE__${c.value}`;
          c.leading = false;
          c.trailing = true;
        }
      });
    }

    if (isPlainObject(val)) {
      if (existingProp && n.ObjectExpression.check(existingProp.value)) {
        updateObjectLiteral(existingProp.value, val);
      } else {
        if (existingProp) {
          // Prevent AST invalidation if the primitive value is identical
          const isIdentical =
            n.Literal.check(existingProp.value) &&
            existingProp.value.value === val;

          if (!isIdentical) {
            existingProp.value = buildASTNode(val);
          }
        } else {
          node.properties.push(
            b.property('init', b.stringLiteral(key), buildASTNode(val))
          );
        }
      }
    } else {
      // Handle primitives and arrays
      if (existingProp) {
        // Skip assignment if the primitive value is identical
        if (!isPrimitiveEqual(existingProp.value, val)) {
          existingProp.value = buildASTNode(val);
        }
      } else {
        node.properties.push(
          b.property('init', b.stringLiteral(key), buildASTNode(val))
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
    ast = recast.parse(wrappedContent);
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

    // Mutate the array backwards instead of using .filter() to prevent layout invalidation
    for (let i = objectLiteral.properties.length - 1; i >= 0; i--) {
      const prop = objectLiteral.properties[i];
      if (n.Property.check(prop) || n.ObjectProperty.check(prop)) {
        let propName = '';
        if (n.Identifier.check(prop.key)) propName = prop.key.name;
        else if (n.StringLiteral.check(prop.key)) propName = prop.key.value;
        else if (n.Literal.check(prop.key)) propName = String(prop.key.value);

        if (['key', 'content', ...metadataProperties].includes(propName)) {
          objectLiteral.properties.splice(i, 1);
        }
      }
    }
  }

  // Update the AST in place
  updateObjectLiteral(
    objectLiteral,
    noMetadata ? (dictionary.content as Record<string, any>) : dictionary
  );

  // Print the full AST to utilize the global token stream for inline comments
  const printedCode = recast.print(ast, {
    tabWidth: 2,
    quote: 'double',
    trailingComma: false,
  }).code;

  // Extract the target object literal cleanly
  const startIndex = printedCode.indexOf('{');
  const endIndex = printedCode.lastIndexOf('}');
  let finalOutput = printedCode.substring(startIndex, endIndex + 1);

  // Revert the tagged block comment back to an inline line comment and fix comma placement
  finalOutput = finalOutput.replace(
    /\s*\/\*__INLINE_LINE__(.*?)\*\/(\s*,?)/g,
    '$2 //$1'
  );

  // Collapse empty lines injected by Recast around commented properties
  finalOutput = finalOutput.replace(/\n[ \t]*\n/g, '\n');

  return finalOutput;
};
