import {
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '../../types/index';
import { getMarkdownMetadata } from './getMarkdownMetadata';

export type MarkdownContentState = string;

export type MarkdownContent = TypedNodeModel<
  NodeType.Markdown,
  MarkdownContentState
>;

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
const markdown = (
  content: string | Promise<string> | (() => string)
): MarkdownContent => {
  const getMetadata = () => {
    if (typeof content === 'string') {
      return getMarkdownMetadata(content);
    }
    if (typeof content === 'function') {
      return () => getMarkdownMetadata(content());
    } else {
      return async () => getMarkdownMetadata(await content);
    }
  };

  return formatNodeType(NodeType.Markdown, content as string, {
    metadata: getMetadata(),
  });
};

export { markdown as md };
