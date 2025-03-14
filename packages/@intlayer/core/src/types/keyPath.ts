import type { NodeType } from './nodeType';

export type ObjectNode = {
  type: NodeType.Object;
  key: string;
};

export type ArrayNode = {
  type: NodeType.Array;
  key: number;
};

export type EnumerationNode = {
  type: NodeType.Enumeration;
  key: string;
};

export type TranslationNode = {
  type: NodeType.Translation;
  key: string;
};

export type ConditionNode = {
  type: NodeType.Condition;
  key: string;
};

export type InsertionNode = {
  type: NodeType.Insertion;
  key?: undefined;
};

export type MarkdownNode = {
  type: NodeType.Markdown;
  key?: undefined;
};

export type ReactNode = {
  type: NodeType.ReactNode;
  key?: undefined;
};

export type NestedNode = {
  type: NodeType.Nested;
  key?: undefined;
};

export type FileNode = {
  type: NodeType.File;
  key?: undefined;
};

export type KeyPath =
  | ObjectNode
  | ArrayNode
  | TranslationNode
  | EnumerationNode
  | InsertionNode
  | MarkdownNode
  | ReactNode
  | ConditionNode
  | NestedNode;
