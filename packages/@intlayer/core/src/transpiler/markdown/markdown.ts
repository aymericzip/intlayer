import { getContent } from '../../interpreter/getContent/getContent';
import {
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '../../types/index';
import { getMarkdownMetadata } from './getMarkdownMetadata';

export type MarkdownContentConstructor<
  T extends Record<string, any> = {},
  Content = unknown,
> = TypedNodeModel<NodeType.Markdown, Content, T>;

export type MarkdownContent<_Content = unknown> = MarkdownContentConstructor<{
  metadata?: Record<string, any>;
}>;

const awaitContent = async (content: any) => {
  if (typeof content === 'string' || typeof content === 'object') {
    return content as any;
  }

  if (typeof content === 'function') {
    return content();
  }
  if (typeof content.then === 'function') {
    return await content;
  }
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
const markdown = <Content = unknown>(content: Content): MarkdownContent => {
  const metadata = async () => {
    const awaitedContent = await awaitContent(content);

    // @ts-ignore Type instantiation is excessively deep and possibly infinite.
    const flatContent = getContent(awaitedContent, {
      dictionaryKey: '',
      keyPath: [],
    });

    if (typeof flatContent === 'string') {
      return getMarkdownMetadata(flatContent);
    }
  };

  return formatNodeType(NodeType.Markdown, content as string, {
    metadata,
  });
};

export { markdown as md };
