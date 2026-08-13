import {
  ALL_CALLERS,
  type CallerDescriptor,
  type CallerValueSource,
  isCallerActive,
} from '@intlayer/config/callers';
import {
  type AstNode,
  getCalleeName,
  getObjectPropertyValueNode,
  getStaticStringValue,
  unwrapExpression,
} from './ast';

/**
 * Where the dictionary key of a matched call site lives, and whether it is
 * statically knowable.
 */
export type NamespaceResolution = {
  /** The node holding the key, or `null` when the call omits it entirely. */
  node: AstNode | null;
  /** The compile-time key, or `null` when it can only be known at runtime. */
  value: string | null;
  /** The registry entry that described where to look. */
  source: CallerValueSource;
};

/** A call expression recognised as an Intlayer content read. */
export type CallerMatch = {
  descriptor: CallerDescriptor;
  /** Resolved namespace, or `null` for callers that take no namespace here. */
  namespace: NamespaceResolution | null;
};

/**
 * Module specifiers imported by a file, as they are written in source.
 *
 * `isCallerActive` gates generic caller names (lingui's `t` / `_`) on the file
 * actually importing the library, so this must be collected before matching.
 *
 * @param program - The Program node of the analysed file.
 */
export const collectImportSources = (program: AstNode): Set<string> => {
  const sources = new Set<string>();
  const body = (program['body'] as AstNode[] | undefined) ?? [];

  for (const statement of body) {
    if (
      statement.type !== 'ImportDeclaration' &&
      statement.type !== 'ExportNamedDeclaration' &&
      statement.type !== 'ExportAllDeclaration'
    ) {
      continue;
    }

    const source = statement['source'] as AstNode | undefined;
    const value = source?.['value'];

    if (typeof value === 'string') sources.add(value);
  }

  return sources;
};

/**
 * The registry entries that may match inside a file, given what it imports.
 *
 * @param importSources - Specifiers collected by {@link collectImportSources}.
 */
export const getActiveDescriptors = (
  importSources: ReadonlySet<string>
): CallerDescriptor[] =>
  ALL_CALLERS.filter((descriptor) => isCallerActive(descriptor, importSources));

/**
 * Resolve one {@link CallerValueSource} against a call's arguments.
 *
 * @param source - The registry rule describing where to look.
 * @param callArguments - Arguments of the call expression.
 * @param descriptor - The caller being matched, needed to disambiguate overloads.
 */
const resolveNamespaceSource = (
  source: CallerValueSource,
  callArguments: AstNode[],
  descriptor: CallerDescriptor
): NamespaceResolution | null => {
  if (source.from === 'fixed') {
    return { node: null, value: source.value, source };
  }

  if (source.from === 'argument') {
    const argument = callArguments[source.index] ?? null;

    if (!argument) return null;

    // A spread makes every positional index unknowable.
    if (argument.type === 'SpreadElement') {
      return { node: argument, value: null, source };
    }

    // Overload split: a caller declaring both a positional and an option source
    // for the same argument (`getTranslations('home')` vs
    // `getTranslations({ namespace: 'home' })`) is on its object overload as
    // soon as that argument is an object literal. Defer to the option source so
    // the key is read from — and reported on — the property, not the object.
    if (
      argument.type === 'ObjectExpression' &&
      descriptor.namespaceSources.some(
        (candidate) =>
          candidate.from === 'option' &&
          candidate.argumentIndex === source.index
      )
    ) {
      return null;
    }

    return { node: argument, value: getStaticStringValue(argument), source };
  }

  if (source.from === 'option') {
    const optionsArgument = callArguments[source.argumentIndex] ?? null;
    const valueNode = getObjectPropertyValueNode(
      optionsArgument,
      source.property
    );

    if (!valueNode) return null;

    return { node: valueNode, value: getStaticStringValue(valueNode), source };
  }

  // 'path-first-segment' — the key is the first dot-segment of the message id,
  // which is the call's own first argument (react-intl's `formatMessage`).
  const [firstArgument] = callArguments;
  const messageId = getStaticStringValue(firstArgument);

  return {
    node: firstArgument ?? null,
    value: messageId ? (messageId.split('.')[0] ?? null) : null,
    source,
  };
};

/**
 * Match a call expression against the shared caller registry.
 *
 * Tries every `namespaceSources` entry in declaration order and keeps the first
 * that yields a node or a value — mirroring how `@intlayer/babel` picks an
 * overload, so the linter and the compiler agree on what a call site means.
 *
 * @param callNode - A CallExpression (or TaggedTemplateExpression) node.
 * @param activeDescriptors - Result of {@link getActiveDescriptors}.
 */
export const matchCaller = (
  callNode: AstNode,
  activeDescriptors: CallerDescriptor[]
): CallerMatch | null => {
  const isTaggedTemplate = callNode.type === 'TaggedTemplateExpression';

  if (callNode.type !== 'CallExpression' && !isTaggedTemplate) return null;

  const callee = getCalleeName(
    (callNode[isTaggedTemplate ? 'tag' : 'callee'] as AstNode) ?? null
  );

  if (!callee) return null;

  const callArguments = (
    ((callNode['arguments'] as AstNode[] | undefined) ?? []).map((argument) =>
      argument.type === 'SpreadElement' ? argument : unwrapExpression(argument)
    ) as (AstNode | null)[]
  ).filter((argument): argument is AstNode => argument !== null);

  for (const descriptor of activeDescriptors) {
    if (descriptor.callerName !== callee.name) continue;

    if (callee.isMethod && descriptor.matchAsMethod !== true) continue;

    if (isTaggedTemplate && descriptor.matchAsTaggedTemplate !== true) continue;

    // "The first source that yields a static string wins" — a source that only
    // yields a node is kept as a fallback so a dynamic key is still reportable.
    let fallback: NamespaceResolution | null = null;

    for (const source of descriptor.namespaceSources) {
      const namespace = resolveNamespaceSource(
        source,
        callArguments,
        descriptor
      );

      if (!namespace) continue;

      if (namespace.value !== null) return { descriptor, namespace };

      fallback ??= namespace;
    }

    return { descriptor, namespace: fallback };
  }

  return null;
};

/**
 * Match a JSX element against the registry's JSX-shaped callers,
 * e.g. `<FormattedMessage id="home.title" />` or `<Trans ns="home" …/>`.
 *
 * @param elementName - Tag name of the element.
 * @param activeDescriptors - Result of {@link getActiveDescriptors}.
 */
export const matchJsxCaller = (
  elementName: string | null,
  activeDescriptors: CallerDescriptor[]
): CallerDescriptor | null => {
  if (!elementName) return null;

  return (
    activeDescriptors.find(
      (descriptor) =>
        descriptor.callerName === elementName &&
        descriptor.jsxIdAttribute !== undefined
    ) ?? null
  );
};
