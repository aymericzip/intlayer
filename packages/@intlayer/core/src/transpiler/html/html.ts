import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';
import { getHTMLCustomComponents } from './getHTMLCustomComponents';

type PropsType = 'number' | 'string' | 'node';

type ComponentName = string;

export type HTMLContentConstructor<
  Content = unknown,
  T extends Record<string, any> = {},
> = TypedNodeModel<NodeType.HTML, Content, T>;

export type HTMLContent<
  Content = unknown,
  Components extends Record<ComponentName, PropsType> = Record<
    ComponentName,
    PropsType
  >,
> = HTMLContentConstructor<
  Content,
  {
    tags: string[] | Components;
  }
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to parse HTML/JSX-like strings and replace tags with components during interpretation.
 *
 * Usage:
 *
 * ```ts
 * html('Hello <b>World</b>')
 * ```
 *
 */
export const html = <
  Components extends Record<string, any> = Record<string, any>,
  Content = unknown,
>(
  content: Content,
  components?: Components
): HTMLContent<Content, Components> => {
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

  return formatNodeType(NodeType.HTML, content, {
    tags: getComponents(),
  });
};
