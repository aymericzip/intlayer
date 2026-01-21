type Component = (props: any) => any;
type ComponentObject = {
  tag: string;
  props?: Record<string, any>;
};
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

const htmlCache = new Map<string, any>();

/**
 * Allow to interpret HTML/JSX-like strings and replace tags with components.
 */
export const getHTML = (content: string, values: Components): any => {
  const cacheKey = JSON.stringify({ content, components: Object.keys(values) });

  if (htmlCache.has(cacheKey)) {
    return htmlCache.get(cacheKey);
  }

  const tagRegex = /<(\/)?([a-zA-Z0-9.-]+)([\s\S]*?)(\/?)>/g;

  const elements: any[] = [];
  const stack: {
    tagName: string;
    children: any[];
    props: Record<string, string>;
  }[] = [];

  let lastIndex = 0;
  let tagIndex = 0;
  let match = tagRegex.exec(content);

  const renderValue = (
    tagName: string,
    tagProps: Record<string, any>,
    children: any[],
    index: number
  ) => {
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
      return override({ ...tagProps, children, key });
    }

    if (typeof override === 'string') {
      const component = values[override];
      if (typeof component === 'function') {
        return component({ ...tagProps, children, key });
      }
      return children;
    }

    if (
      typeof override === 'object' &&
      override !== null &&
      'tag' in override
    ) {
      const { tag: targetTag, props: extraProps } = override as ComponentObject;
      const component = values[targetTag];
      if (typeof component === 'function') {
        return component({ ...tagProps, ...extraProps, children, key });
      }
      return children;
    }

    // Default: Skip tag, render children
    return children;
  };

  const appendChild = (child: any) => {
    const target =
      stack.length > 0 ? stack[stack.length - 1].children : elements;
    if (Array.isArray(child)) {
      target.push(...child);
    } else {
      target.push(child);
    }
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
        appendChild(
          renderValue(tagName, last.props, last.children, tagIndex++)
        );
      }
    } else if (isSelfClosing) {
      const tagProps = parseAttributes(cleanedAttributes);
      appendChild(renderValue(tagName, tagProps, [], tagIndex++));
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

  while (stack.length > 0) {
    const last = stack.shift();
    if (last) appendChild(last.children);
  }

  const result = elements.length === 1 ? elements[0] : elements;

  htmlCache.set(cacheKey, result);

  return result;
};
