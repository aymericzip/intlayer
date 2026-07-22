import * as NodeTypes from '@intlayer/types/nodeType';
import type { NodeProps, Plugins } from './getContent/plugins';
import { getInsertion } from './getInsertion';

/**
 * A node whose textual content can carry `{{ … }}` interpolation placeholders.
 *
 * Besides plain strings, this covers `html()` and `markdown()` nodes: their
 * inner content is a raw string that may itself hold placeholders (e.g.
 * `html('<b>{{count}}</b> days')`). Enumeration/plural/insertion wrappers must
 * be able to interpolate into that inner string before the html/markdown
 * renderer turns it into a component tree.
 */
export type InterpolableNode =
  | string
  | { nodeType: typeof NodeTypes.HTML; [NodeTypes.HTML]: string }
  | { nodeType: typeof NodeTypes.MARKDOWN; [NodeTypes.MARKDOWN]: string };

/**
 * Returns `true` when the node is an `html()` or `markdown()` node whose inner
 * content is a raw string eligible for `{{ … }}` interpolation.
 *
 * Each check is guarded by the corresponding `INTLAYER_NODE_TYPE_*` env flag
 * so bundlers can eliminate the branch (and downstream handling code) when the
 * html/markdown node types are tree-shaken out of the user bundle.
 */
export const isInterpolableWrapperNode = (
  node: unknown
): node is Exclude<InterpolableNode, string> => {
  if (typeof node !== 'object' || node === null || !('nodeType' in node)) {
    return false;
  }

  const { nodeType } = node as { nodeType?: unknown };

  return (
    (process.env.INTLAYER_NODE_TYPE_HTML !== 'false' &&
      nodeType === NodeTypes.HTML) ||
    (process.env.INTLAYER_NODE_TYPE_MARKDOWN !== 'false' &&
      nodeType === NodeTypes.MARKDOWN)
  );
};

/**
 * Extracts the raw interpolable string from a string, `html()` or `markdown()`
 * node. Returns `undefined` for any other node so callers can fall back to
 * their default handling.
 *
 * @example
 * ```ts
 * getInterpolableContent('{{count}} days'); // '{{count}} days'
 * getInterpolableContent(html('<b>{{count}}</b>')); // '<b>{{count}}</b>'
 * getInterpolableContent({ nodeType: 'translation' }); // undefined
 * ```
 */
export const getInterpolableContent = (node: unknown): string | undefined => {
  if (typeof node === 'string') {
    return node;
  }

  if (isInterpolableWrapperNode(node)) {
    return node.nodeType === NodeTypes.HTML
      ? node[NodeTypes.HTML]
      : node[NodeTypes.MARKDOWN];
  }

  return undefined;
};

/**
 * Rebuilds an interpolable node from its interpolated raw string, preserving
 * the original node shape (plain string stays a string, `html()`/`markdown()`
 * nodes keep their `nodeType` and sibling fields so the renderer still applies).
 *
 * @example
 * ```ts
 * rebuildInterpolableContent(html('<b>{{count}}</b>'), '<b>1</b>');
 * // { nodeType: 'html', html: '<b>1</b>', … }
 * ```
 */
export const rebuildInterpolableContent = <T>(
  node: T,
  interpolated: string
): T => {
  if (typeof node === 'string') {
    return interpolated as T;
  }

  if (isInterpolableWrapperNode(node)) {
    const key =
      node.nodeType === NodeTypes.HTML ? NodeTypes.HTML : NodeTypes.MARKDOWN;

    return { ...node, [key]: interpolated } as T;
  }

  return node;
};

/**
 * Interpolates `{{ … }}` values into an `html()`/`markdown()` wrapper node,
 * then re-runs the transform with the parent plugin list so the html/markdown
 * renderer applies to the interpolated content.
 *
 * Shared by the plural/insertion string plugins of `@intlayer/core` and every
 * framework package — framework nodes (React elements, VNodes…) cannot be
 * injected into a raw markup string, so plain string interpolation is used.
 */
export const transformInterpolableNode = (
  node: Exclude<InterpolableNode, string>,
  values: Record<string, string | number>,
  subProps: NodeProps,
  parentPlugins: Plugins[] | undefined,
  deepTransformNode: (node: unknown, props: NodeProps) => unknown
): unknown => {
  const interpolated = getInsertion(getInterpolableContent(node)!, values);
  const children = rebuildInterpolableContent(node, interpolated);

  return deepTransformNode(children, {
    ...subProps,
    plugins: parentPlugins,
    children,
  });
};
