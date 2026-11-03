import {
  type AstNode,
  getHelperCallContent,
  getSerializedNodeContent,
  getStaticKeyName,
  isAstNode,
  isPlainProperty,
} from './sortContentNodes';

/** Fields of a serialized translation node that may be collapsed. */
const SERIALIZED_TRANSLATION_FIELDS = new Set(['nodeType', 'translation']);

/** Start / end offsets, from Babel (`start`/`end`) or ESTree (`range`). */
const getNodeBounds = (node: AstNode): [number, number] | undefined => {
  if (Array.isArray(node.range)) return node.range as [number, number];
  if (typeof node.start === 'number' && typeof node.end === 'number') {
    return [node.start, node.end];
  }

  return undefined;
};

const isStringLiteral = (node: unknown): node is AstNode =>
  isAstNode(node) &&
  (node.type === 'StringLiteral' || node.type === 'Literal') &&
  typeof node.value === 'string';

/**
 * The string literal every locale shares, or `undefined` when the locales
 * differ, hold anything but a plain string, or there is only one locale.
 */
const getSharedStringLiteral = (
  translationMap: AstNode
): AstNode | undefined => {
  const properties = translationMap.properties as unknown[];

  if (properties.length < 2 || !properties.every(isPlainProperty)) {
    return undefined;
  }

  const values = (properties as AstNode[]).map((property) => property.value);

  if (!values.every(isStringLiteral)) return undefined;

  const [firstValue] = values;

  return values.every((value) => value.value === firstValue.value)
    ? firstValue
    : undefined;
};

/** Replaces a node in place by another one, keeping the object identity. */
const replaceNodeInPlace = (target: AstNode, replacement: AstNode): void => {
  for (const field of Object.keys(target)) {
    delete target[field];
  }

  Object.assign(target, replacement);
};

/**
 * The node to collapse and the literal replacing it: a `t({...})` call, or a
 * serialized `{ nodeType: 'translation', translation: {...} }` object.
 */
const getCollapsibleTranslation = (node: AstNode): AstNode | undefined => {
  const helperContent = getHelperCallContent(node);

  if (helperContent) {
    const isPlainCall =
      helperContent.nodeType === 'translation' &&
      (node.arguments as unknown[]).length === 1 &&
      !node.typeArguments &&
      !node.typeParameters;

    return isPlainCall
      ? getSharedStringLiteral(helperContent.content)
      : undefined;
  }

  const serializedContent = getSerializedNodeContent(node);

  if (serializedContent?.nodeType !== 'translation') return undefined;

  const hasOnlyTranslationFields = (node.properties as unknown[]).every(
    (property) =>
      isPlainProperty(property) &&
      SERIALIZED_TRANSLATION_FIELDS.has(getStaticKeyName(property) ?? '')
  );

  return hasOnlyTranslationFields
    ? getSharedStringLiteral(serializedContent.content)
    : undefined;
};

/**
 * Replaces, in place, every translation whose locales all hold the same
 * string by that string: `t({ en: 'Next.js', fr: 'Next.js' })` → `'Next.js'`.
 *
 * Translations holding a comment are kept, so no comment is lost.
 */
export const collapseIdenticalTranslationsInAst = (rootNode: unknown): void => {
  const commentBounds = (
    isAstNode(rootNode) && Array.isArray(rootNode.comments)
      ? (rootNode.comments as AstNode[])
      : []
  )
    .map(getNodeBounds)
    .filter((bounds): bounds is [number, number] => bounds !== undefined);

  const containsComment = (node: AstNode): boolean => {
    const bounds = getNodeBounds(node);

    if (!bounds) return true;

    return commentBounds.some(
      ([commentStart, commentEnd]) =>
        commentStart >= bounds[0] && commentEnd <= bounds[1]
    );
  };

  const visitedNodes = new WeakSet<object>();
  const pendingValues: unknown[] = [rootNode];

  while (pendingValues.length > 0) {
    const value = pendingValues.pop();

    if (typeof value !== 'object' || value === null) continue;
    if (visitedNodes.has(value)) continue;

    visitedNodes.add(value);

    if (isAstNode(value)) {
      const sharedLiteral = getCollapsibleTranslation(value);

      if (sharedLiteral && !containsComment(value)) {
        replaceNodeInPlace(value, { ...sharedLiteral });
        continue;
      }
    }

    for (const [field, child] of Object.entries(value)) {
      if (field !== 'loc' && field !== 'range' && field !== 'parent') {
        pendingValues.push(child);
      }
    }
  }
};
