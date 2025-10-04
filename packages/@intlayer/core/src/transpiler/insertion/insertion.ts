import {
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '../../types/index';
import { getInsertionValues } from './getInsertionValues';

export type InsertionContentConstructor<
  Content = unknown,
  T extends Record<string, any> = {},
> = TypedNodeModel<NodeType.Insertion, Content, T>;

export type InsertionContent<Content = unknown> = InsertionContentConstructor<
  Content,
  {
    fields: string[];
  }
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to identify insertions inside a content.
 *
 * Usage:
 *
 * ```ts
 * insertion('Hi, my name is {{name}} and I am {{age}} years old.')
 * ```
 *
 */
const insertion = <Content = unknown>(
  content: Content
): InsertionContent<Content> => {
  const getInsertions = () => {
    if (typeof content === 'string') {
      return getInsertionValues(content);
    }

    let stringContent;

    if (typeof content === 'function') {
      stringContent = content();
    } else if (typeof (content as Promise<string>).then === 'function') {
      stringContent = async () =>
        getInsertionValues(await (content as Promise<string>));
    }

    if (typeof stringContent === 'string') {
      return getInsertionValues(stringContent);
    }

    try {
      return getInsertionValues(JSON.stringify(content));
    } catch (e) {
      return [];
    }
  };

  return formatNodeType(NodeType.Insertion, content, {
    fields: getInsertions(),
  });
};

export { insertion as insert };
