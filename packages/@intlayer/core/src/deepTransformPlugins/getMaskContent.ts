import type { Dictionary } from '@intlayer/types';
import { deepTransformNode, type Plugins } from '../interpreter';

const passTypedNodePlugin: Plugins = {
  id: 'pass-typed-node-plugin',
  canHandle: (node) =>
    typeof node === 'object' && typeof node?.nodeType === 'string',
  transform: (node, props, deepTransformNode) =>
    deepTransformNode(node[node.nodeType], props),
};

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const buildMaskPlugin: Plugins = {
  id: 'build-mask-plugin',
  canHandle: (node) => typeof node === 'string' || typeof node === 'number',
  transform: () => true,
};

export const getMaskContent = (source: Dictionary): any => ({
  ...source,
  content: deepTransformNode(source.content, {
    dictionaryKey: source.key,
    keyPath: [],
    plugins: [passTypedNodePlugin, buildMaskPlugin],
  }),
});
