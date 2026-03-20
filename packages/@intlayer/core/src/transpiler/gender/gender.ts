import type { TypedNodeModel } from '@intlayer/types/nodeType';
import { formatNodeType, GENDER } from '@intlayer/types/nodeType';

export type Gender = 'male' | 'female' | 'fallback';

export type GenderContentStates<Content> = Record<`${Gender}`, Content> & {
  fallback?: Content;
};

export type GenderContent<Content = unknown> = TypedNodeModel<
  typeof GENDER,
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
  formatNodeType(GENDER, content);

export { gender };
