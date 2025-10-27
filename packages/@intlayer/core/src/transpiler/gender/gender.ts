import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';

export type Gender = 'male' | 'female' | 'fallback';

export type GenderContentStates<Content> = Record<`${Gender}`, Content> & {
  fallback?: Content;
};

export type GenderContent<Content = unknown> = TypedNodeModel<
  NodeType.Gender,
  GenderContentStates<Content>
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to pick a content based on a gender.
 *
 * Usage:
 *
 * ```ts
 * gender({
 *  'true': 'The gender is validated',
 *  'false': 'The gender is not validated',
 * });
 * ```
 *
 * The last key provided will be used as the fallback value.
 *
 */
const gender = <Content>(content?: GenderContentStates<Content>) =>
  formatNodeType(NodeType.Gender, content);

export { gender };
