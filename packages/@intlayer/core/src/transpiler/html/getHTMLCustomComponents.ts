const parseAttributes = (attributesString: string): Record<string, string> => {
  const attributes: Record<string, string> = {};

  if (!attributesString?.trim()) {
    return attributes;
  }

  // Regex to match attribute names
  // Matches: name="value", name='value', name=value, or just name
  const attrRegex =
    /([a-zA-Z0-9-:_@]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+))?/g;

  const matches = [...attributesString.matchAll(attrRegex)];

  matches.forEach((match) => {
    const attrName = match[1];
    attributes[attrName] = 'string';
  });

  return attributes;
};

/**
 * Extracts component names from an HTML string.
 * - Standard HTML tags are set to `true`.
 * - Custom components are parsed to extract their attributes/props.
 */
export const getHTMLCustomComponents = (
  content: string
): Record<string, Record<string, string> | true> => {
  if (typeof content !== 'string') {
    throw new Error('content must be a string');
  }

  const tagRegex = /<(\/)?([a-zA-Z0-9.-]+)\s*([\s\S]*?)(\/?)>/g;
  const matches = [...content.matchAll(tagRegex)];

  const components: Record<string, Record<string, string> | true> = {};

  matches.forEach((match) => {
    const isClosing = !!match[1];
    const tagName = match[2];
    const attributesString = match[3];
    const isSelfClosing = !!match[4];

    // Matches any tag that is entirely lowercase letters and numbers (e.g., div, h1)
    const isStandardHTMLTag = /^[a-z][a-z0-9]*$/.test(tagName);

    if (isStandardHTMLTag) {
      components[tagName] = true;
      return;
    }

    if (!components[tagName]) {
      components[tagName] = {};
    }

    if (components[tagName] === true) {
      return;
    }

    if (isClosing) {
      return;
    }

    const attributes = parseAttributes(attributesString);
    const componentDef = components[tagName] as Record<string, string>;
    Object.assign(componentDef, attributes);

    if (!isSelfClosing) {
      componentDef.children = 'string';
    }
  });

  return components;
};
