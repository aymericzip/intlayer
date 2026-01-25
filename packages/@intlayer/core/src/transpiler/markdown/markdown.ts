import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';
import { getContent } from '../../interpreter/getContent/getContent';
import { getHTMLCustomComponents } from '../html/getHTMLCustomComponents';
import { getMarkdownMetadata } from './getMarkdownMetadata';

type PropsType = 'number' | 'string' | 'node';

type ComponentName = string;

export type MarkdownContentConstructor<
  T extends Record<string, any> = {},
  Content = unknown,
> = TypedNodeModel<NodeType.Markdown, Content, T>;

export type MarkdownContent<
  Content = unknown,
  Components extends Record<ComponentName, PropsType> = Record<
    ComponentName,
    PropsType
  >,
> = MarkdownContentConstructor<
  {
    metadata?: Record<string, any>;
    tags?: string[] | Components;
  },
  Content
>;

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
const markdown = <
  Components extends Record<string, any> = Record<string, any>,
  Content = unknown,
>(
  content: Content,
  components?: Components
): MarkdownContent<Content, Components> => {
  const metadata = async () => {
    const awaitedContent = await awaitContent(content);

    const flatContent = getContent(awaitedContent, {
      dictionaryKey: '',
      keyPath: [],
    });

    if (typeof flatContent === 'string') {
      return getMarkdownMetadata(flatContent);
    }
  };

  const getComponents = () => {
    if (components) {
      return components;
    }

    if (typeof content === 'string') {
      return getHTMLCustomComponents(content);
    }

    let stringContent: any;

    if (typeof content === 'function') {
      stringContent = content();
    } else if (typeof (content as Promise<string>).then === 'function') {
      stringContent = async () =>
        getHTMLCustomComponents((await (content as Promise<string>)) as string);
    }

    if (typeof stringContent === 'string') {
      return getHTMLCustomComponents(stringContent);
    }

    try {
      return getHTMLCustomComponents(JSON.stringify(content));
    } catch (_e) {
      return [];
    }
  };

  return formatNodeType(NodeType.Markdown, content, {
    metadata,
    tags: getComponents(),
  });
};

export { markdown as md };
