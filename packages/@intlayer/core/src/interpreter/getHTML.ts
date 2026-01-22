/**
 * Component function that receives properly typed props
 * Props include:
 * - children?: any[] - Array of child elements (ReactNode[], VNode[], etc.)
 * - [key: string]: any - Any HTML attributes (className, style, href, etc.)
 */
type Component = (props: { children?: any[]; [key: string]: any }) => any;

/**
 * Component object that delegates to another component
 */
type ComponentObject = {
  tag: string;
  props?: Record<string, any>;
};

/**
 * Components map:
 * - Function components receive typed props
 * - String components delegate to another tag
 * - Object components delegate with additional props
 */
type Components = Record<string, Component | string | ComponentObject>;

/**
 * Helper to parse attributes from a tag string.
 */
const parseAttributes = (attributes: string): Record<string, string> => {
  const props: Record<string, string> = {};
  const attrRegex = /([a-zA-Z0-9-]+)="([^"]*)"/g;

  let match = attrRegex.exec(attributes);
  while (match !== null) {
    props[match[1]] = match[2];
    match = attrRegex.exec(attributes);
  }
  return props;
};

type ASTNode =
  | string
  | {
      tagName: string;
      props: Record<string, string>;
      children: ASTNode[];
    };

const astCache = new Map<string, ASTNode[]>();

const parseHTML = (content: string): ASTNode[] => {
  if (astCache.has(content)) {
    return astCache.get(content)!;
  }

  if (typeof content !== 'string') {
    return [];
  }

  const tagRegex = /<(\/)?([a-zA-Z0-9.-]+)([\s\S]*?)(\/?)>/g;
  const elements: ASTNode[] = [];
  const stack: {
    tagName: string;
    children: ASTNode[];
    props: Record<string, string>;
  }[] = [];

  let lastIndex = 0;
  let match = tagRegex.exec(content);

  const appendChild = (child: ASTNode) => {
    const target =
      stack.length > 0 ? stack[stack.length - 1].children : elements;
    target.push(child);
  };

  while (match !== null) {
    const [fullMatch, isClosingRaw, tagName, attributesRaw, isSelfClosingRaw] =
      match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      appendChild(content.slice(lastIndex, matchIndex));
    }

    const isClosing = isClosingRaw === '/';
    const isSelfClosing =
      isSelfClosingRaw === '/' ||
      attributesRaw.trim().endsWith('/') ||
      fullMatch.endsWith('/>');

    const cleanedAttributes = attributesRaw.trim().replace(/\/$/, '').trim();

    if (isClosing) {
      const last = stack.pop();

      if (last) {
        appendChild({
          tagName: last.tagName,
          props: last.props,
          children: last.children,
        });
      }
    } else if (isSelfClosing) {
      const tagProps = parseAttributes(cleanedAttributes);
      appendChild({
        tagName,
        props: tagProps,
        children: [],
      });
    } else {
      const tagProps = parseAttributes(cleanedAttributes);
      stack.push({ tagName, children: [], props: tagProps });
    }

    lastIndex = matchIndex + fullMatch.length;
    match = tagRegex.exec(content);
  }

  if (lastIndex < content.length) {
    appendChild(content.slice(lastIndex));
  }

  // Handle unclosed tags by appending them to the root or parent
  while (stack.length > 0) {
    const last = stack.pop();
    if (last) {
      appendChild({
        tagName: last.tagName,
        props: last.props,
        children: last.children,
      });
    }
  }

  astCache.set(content, elements);
  return elements;
};

/**
 * Interprets a string containing HTML-like tags and replaces them with provided components or strings.
 */
export const getHTML = (content: string, values: Components): any => {
  // Parse into AST (cached)
  const ast = parseHTML(content);

  // Render AST
  let keyCounter = 0;

  const renderASTNode = (node: ASTNode): any => {
    if (typeof node === 'string') {
      return node;
    }

    const { tagName, props, children } = node;
    const renderedChildren = children.flatMap(renderASTNode);
    const index = keyCounter++;

    let override = values[tagName];

    if (!override) {
      const lowerTagName = tagName.toLowerCase();
      const foundKey = Object.keys(values).find(
        (key) => key.toLowerCase() === lowerTagName
      );

      if (foundKey) override = values[foundKey];
    }

    const key = `html-tag-${tagName}-${index}`;

    if (typeof override === 'function') {
      return override({ ...props, children: renderedChildren, key });
    }

    if (typeof override === 'string') {
      const component = values[override];

      if (typeof component === 'function') {
        return component({ ...props, children: renderedChildren, key });
      }
      return renderedChildren;
    }

    if (
      typeof override === 'object' &&
      override !== null &&
      'tag' in override
    ) {
      const { tag: targetTag, props: extraProps } = override as ComponentObject;
      const component = values[targetTag];

      if (typeof component === 'function') {
        return component({
          ...props,
          ...extraProps,
          children: renderedChildren,
          key,
        });
      }
      return renderedChildren;
    }

    // Default: Skip tag, render children
    return renderedChildren;
  };

  const result = ast.flatMap(renderASTNode);
  return result.length === 1 ? result[0] : result;
};
