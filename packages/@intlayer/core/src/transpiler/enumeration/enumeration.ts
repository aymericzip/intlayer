import { formatNodeType, NodeType, TypedNodeModel } from '../../types/index';

type Positif = number | `${number}`;
type Negatif = `-${number}`;
type Numbers = Positif | Negatif;

type Equal = Numbers;
type EqualString = `=${Numbers}`;
type Superior = `>${Numbers}`;
type SuperiorOrEqual = `>=${Numbers}`;
type Inferior = `<${Numbers}`;
type InferiorOrEqual = `<=${Numbers}`;

export type EnterFormat =
  | Equal
  | EqualString
  | Superior
  | SuperiorOrEqual
  | Inferior
  | InferiorOrEqual;

export type EnumerationContentState<Content> = Partial<
  Record<EnterFormat, Content>
> & {
  fallback?: Content;
};

export type EnumerationContent<Content = unknown> = TypedNodeModel<
  NodeType.Enumeration,
  EnumerationContentState<Content>
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to pick a content based on a quantity.
 *
 * Usage:
 *
 * ```ts
 * enu({
 *  '<=-2.3': 'You have less than -2.3',
 *  '<1': 'You have less than one',
 *  '2': 'You have two',
 *  '>=3': 'You have three or more',
 * });
 * ```
 *
 * > The order of the keys will define the priority of the content.
 *
 */
const enumeration = <Content>(content?: EnumerationContentState<Content>) =>
  formatNodeType(NodeType.Enumeration, content);

export { enumeration as enu };
