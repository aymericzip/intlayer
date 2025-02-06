import { NodeType } from '../../types/index';

export type MarkdownContentState = string;

export type MarkdownContent = {
  nodeType: NodeType.Markdown;
  [NodeType.Markdown]: MarkdownContentState;
};

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to pick a content based on a quantity.
 *
 * Usage:
 *
 * ```ts
 * markdown('## Hello world!');
 * ```
 *
 */
const markdown = (content: string): MarkdownContent => ({
  nodeType: NodeType.Markdown,
  [NodeType.Markdown]: content,
});

export { markdown };
