import type { AstNode } from './ast';
import { getStaticStringValue, unwrapExpression } from './ast';

/**
 * Reading an Intlayer content declaration out of the file being linted.
 *
 * A declaration is any object literal carrying both a `key` and a `content`
 * property — the same shape the VS Code extension looks for, which covers
 * `export default { … }`, `const dictionary = { … } satisfies Dictionary` and
 * every variant in between without caring how the object reaches the export.
 */

/** One field declared inside a dictionary's `content`. */
export type DeclaredField = {
  /** Dotted path from the content root, e.g. `hero.title`. */
  path: string;
  /** The property key node, so a report points at the field name. */
  keyNode: AstNode;
};

/** A dictionary declaration found in the linted file. */
export type ContentDeclaration = {
  /** The static dictionary key. */
  dictionaryKey: string;
  /** The node holding the key, for reporting a fully unused dictionary. */
  keyNode: AstNode;
  /** Every field declared under `content`, depth-first. */
  fields: DeclaredField[];
  /**
   * True when the content object holds a spread or a computed key, so the field
   * list is not exhaustive. No field may be reported unused in that case — the
   * missing entries could be exactly the ones being read.
   */
  isPartiallyEnumerated: boolean;
};

/**
 * Static name of an object property key, or `null` for computed and
 * non-literal keys.
 *
 * @param property - A `Property` node.
 */
const getPropertyKeyName = (property: AstNode): string | null => {
  if (property['computed'] === true) return null;

  const key = property['key'] as AstNode | undefined;

  if (key?.type === 'Identifier') return key['name'] as string;

  if (key?.type === 'Literal') {
    const value = key['value'];

    return typeof value === 'string' || typeof value === 'number'
      ? String(value)
      : null;
  }

  return null;
};

/**
 * Read a property's value node by name, or `null` when absent.
 *
 * @param objectExpression - An `ObjectExpression` node.
 * @param propertyName - Property to look up.
 */
const findPropertyValue = (
  objectExpression: AstNode,
  propertyName: string
): AstNode | null => {
  const properties =
    (objectExpression['properties'] as AstNode[] | undefined) ?? [];

  for (const property of properties) {
    if (property.type !== 'Property') continue;

    if (getPropertyKeyName(property) !== propertyName) continue;

    return unwrapExpression((property['value'] as AstNode) ?? null);
  }

  return null;
};

/** Collector state threaded through the recursive field walk. */
type FieldCollector = {
  fields: DeclaredField[];
  isPartiallyEnumerated: boolean;
};

/**
 * Walk a content object, recording every declared field path.
 *
 * Only plain object literals are descended into. A translation node
 * (`t({ en: … })`, `enu({ … })`, `md(…)`) is a leaf: the keys inside it are
 * locales and enumeration values, not content fields the compiler prunes.
 * Arrays are leaves too — an unused array element is not something worth
 * reporting on its own.
 *
 * @param objectExpression - The object to walk.
 * @param collector - Accumulated result.
 * @param parentPath - Path segments leading to this object.
 */
const collectFields = (
  objectExpression: AstNode,
  collector: FieldCollector,
  parentPath: string[]
): void => {
  const properties =
    (objectExpression['properties'] as AstNode[] | undefined) ?? [];

  for (const property of properties) {
    if (property.type !== 'Property') {
      // A spread hides fields this walk can never name.
      collector.isPartiallyEnumerated = true;
      continue;
    }

    const name = getPropertyKeyName(property);

    if (name === null) {
      collector.isPartiallyEnumerated = true;
      continue;
    }

    const path = [...parentPath, name];
    const keyNode = property['key'] as AstNode;

    collector.fields.push({ path: path.join('.'), keyNode });

    const value = unwrapExpression((property['value'] as AstNode) ?? null);

    if (value?.type === 'ObjectExpression') {
      collectFields(value, collector, path);
    }
  }
};

/**
 * Read the dictionary declaration an object literal represents, or `null` when
 * it is not one.
 *
 * @param objectExpression - Any `ObjectExpression` node from the linted file.
 */
export const readContentDeclaration = (
  objectExpression: AstNode
): ContentDeclaration | null => {
  if (objectExpression.type !== 'ObjectExpression') return null;

  const keyNode = findPropertyValue(objectExpression, 'key');
  const contentNode = findPropertyValue(objectExpression, 'content');

  if (!keyNode || !contentNode) return null;

  const dictionaryKey = getStaticStringValue(keyNode);

  // A computed key is already reported by `static-dictionary-key`, and there is
  // no key to look usages up by.
  if (!dictionaryKey) return null;

  const collector: FieldCollector = {
    fields: [],
    isPartiallyEnumerated: false,
  };

  if (contentNode.type === 'ObjectExpression') {
    collectFields(contentNode, collector, []);
  } else {
    // `content` built by a call or spread from elsewhere — nothing to enumerate.
    collector.isPartiallyEnumerated = true;
  }

  return {
    dictionaryKey,
    keyNode,
    fields: collector.fields,
    isPartiallyEnumerated: collector.isPartiallyEnumerated,
  };
};
