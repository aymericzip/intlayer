import { parse } from '@babel/parser';
import _traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import {
  type ExistingIntlayerInfo,
  getExistingIntlayerInfo,
} from './getExistingIntlayerInfo';

// CJS/ESM interop: @babel/traverse exports its function as `.default` in CJS bundles
const traverse = (
  typeof _traverse === 'function'
    ? _traverse
    : (_traverse as unknown as { default: typeof _traverse }).default
) as typeof _traverse;

/**
 * Top-level dictionary fields a component reads, or `'all'` when the reads
 * cannot be traced (dictionary passed around, computed access, rest pattern).
 */
export type ReadFields = ReadonlySet<string> | 'all';

/** Union of two read sets, `'all'` winning. */
export const mergeReadFields = (
  first: ReadFields,
  second: ReadFields
): ReadFields =>
  first === 'all' || second === 'all' ? 'all' : new Set([...first, ...second]);

/** Static name of a property key, `null` when computed. */
const getStaticPropertyName = (
  key: t.Node,
  isComputed: boolean
): string | null => {
  if (t.isStringLiteral(key)) return key.value;

  return !isComputed && t.isIdentifier(key) ? key.name : null;
};

/** Fields bound by `const { a, b } = useIntlayer('key')`. */
const getDestructuredFields = (pattern: t.ObjectPattern): ReadFields => {
  const fields = new Set<string>();

  for (const property of pattern.properties) {
    const name = t.isObjectProperty(property)
      ? getStaticPropertyName(property.key, property.computed)
      : null;

    if (name === null) return 'all';

    fields.add(name);
  }

  return fields;
};

/**
 * Fields a component reads on the result of its existing `useIntlayer` /
 * `getIntlayer` call: `content.title`, `content['title']`, `content().title`
 * (signal accessor) or a destructuring pattern.
 */
export const getReadFieldsOfComponent = (
  componentPath: NodePath,
  existingInfo: ExistingIntlayerInfo
): ReadFields => {
  if (existingInfo.isDestructured) {
    return existingInfo.objectPatternNode
      ? getDestructuredFields(existingInfo.objectPatternNode)
      : 'all';
  }

  const binding = componentPath.scope.getBinding(existingInfo.variableName);
  const declaration = binding?.path.node;
  const isHookResult =
    t.isVariableDeclarator(declaration) &&
    t.isCallExpression(declaration.init) &&
    t.isIdentifier(declaration.init.callee, { name: existingInfo.hook });

  if (!binding || !isHookResult) return 'all';

  const fields = new Set<string>();

  for (const referencePath of binding.referencePaths) {
    const callPath = referencePath.parentPath;
    // Signal accessor: `content().title`
    const valuePath =
      callPath?.isCallExpression() &&
      callPath.node.callee === referencePath.node
        ? callPath
        : referencePath;
    const memberNode = valuePath.parentPath?.node;
    const name =
      (t.isMemberExpression(memberNode) ||
        t.isOptionalMemberExpression(memberNode)) &&
      memberNode.object === valuePath.node
        ? getStaticPropertyName(memberNode.property, memberNode.computed)
        : null;

    if (name === null) return 'all';

    fields.add(name);
  }

  return fields;
};

/**
 * Fields read per dictionary key across every component of a JS/TS/JSX/TSX
 * file. Returns an empty map for a file that does not parse.
 */
export const getReadFieldsByDictionary = (
  fileCode: string
): Map<string, ReadFields> => {
  const readFields = new Map<string, ReadFields>();

  let ast: t.File;

  try {
    ast = parse(fileCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
  } catch {
    return readFields;
  }

  const collect = (path: NodePath): void => {
    const existingInfo = getExistingIntlayerInfo(path);

    if (!existingInfo) return;

    readFields.set(
      existingInfo.key,
      mergeReadFields(
        readFields.get(existingInfo.key) ?? new Set<string>(),
        getReadFieldsOfComponent(path, existingInfo)
      )
    );
  };

  traverse(ast, { Program: collect, Function: collect });

  return readFields;
};
