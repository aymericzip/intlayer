import type * as NodeTypes from './nodeType';

export type ObjectNode = {
  type: typeof NodeTypes.OBJECT;
  key: string;
};

export type ArrayNode = {
  type: typeof NodeTypes.ARRAY;
  key: number;
};

export type EnumerationNode = {
  type: typeof NodeTypes.ENUMERATION;
  key: string;
};

export type TranslationNode = {
  type: typeof NodeTypes.TRANSLATION;
  key: string;
};

export type ConditionNode = {
  type: typeof NodeTypes.CONDITION;
  key: string;
};

export type GenderNode = {
  type: typeof NodeTypes.GENDER;
  key: string;
};

export type InsertionNode = {
  type: typeof NodeTypes.INSERTION;
  key?: undefined;
};

export type MarkdownNode = {
  type: typeof NodeTypes.MARKDOWN;
  key?: undefined;
};

export type ReactNode = {
  type: typeof NodeTypes.REACT_NODE;
  key?: undefined;
};

export type NestedNode = {
  type: typeof NodeTypes.NESTED;
  key?: undefined;
};

export type FileNode = {
  type: typeof NodeTypes.FILE;
  key?: undefined;
};

export type HTMLNode = {
  type: typeof NodeTypes.HTML;
  key?: undefined;
};

export type KeyPath =
  | ObjectNode
  | ArrayNode
  | TranslationNode
  | EnumerationNode
  | InsertionNode
  | GenderNode
  | MarkdownNode
  | ReactNode
  | ConditionNode
  | NestedNode
  | FileNode
  | HTMLNode;
