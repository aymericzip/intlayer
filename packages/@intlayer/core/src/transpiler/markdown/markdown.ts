import {
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '../../types/index';
import { getMarkdownMetadata } from './getMarkdownMetadata';

export type MarkdownContentConstructer<
  T extends Record<string, any> = {},
  Content = unknown,
> = TypedNodeModel<NodeType.Markdown, Content, T>;

export type MarkdownContent<Content = unknown> = MarkdownContentConstructer<{
  metadata?: Record<string, any>;
}>;

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
const markdown = <Content = unknown>(content: Content): MarkdownContent => {
  const getMetadata = () => {
    if (typeof content === 'string') {
      return getMarkdownMetadata(content);
    }
    if (typeof content === 'function') {
      return () => getMarkdownMetadata(content());
    } else if (typeof (content as Promise<string>).then === 'function') {
      return async () =>
        getMarkdownMetadata(await (content as Promise<string>));
    }
  };

  return formatNodeType(NodeType.Markdown, content as string, {
    metadata: getMetadata(),
  });
};

export { markdown as md };
