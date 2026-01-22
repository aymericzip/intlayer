import { HTML_TAGS } from './index';

const parseAttributes = (attributesString: string): Record<string, string> => {
  const attributes: Record<string, string> = {};

  if (!attributesString || !attributesString.trim()) {
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

  // Regex to match tags: <Tag ...>, </Tag>, or <Tag ... />
  // Captures: 1: Closing slash (if any), 2: Tag Name, 3: Attributes, 4: Self-closing slash (if any)
  const tagRegex = /<(\/)?([a-zA-Z0-9.-]+)\s*([\s\S]*?)(\/?)>/g;
  const matches = [...content.matchAll(tagRegex)];

  const components: Record<string, Record<string, string> | true> = {};

  matches.forEach((match) => {
    const isClosing = !!match[1];
    const tagName = match[2];
    const attributesString = match[3];
    const isSelfClosing = !!match[4];

    // If it's a standard HTML tag, mark it as true and skip prop parsing
    if ((HTML_TAGS as readonly string[]).includes(tagName.toLowerCase())) {
      components[tagName] = true;
      return;
    }

    if (!components[tagName]) {
      components[tagName] = {};
    }

    // Safety check if we somehow have a collision or logic issue, though loop order handles it
    if (components[tagName] === true) {
      return;
    }

    if (isClosing) {
      return;
    }

    // Parse attributes for custom components
    const attributes = parseAttributes(attributesString);
    const componentDef = components[tagName] as Record<string, string>;
    Object.assign(componentDef, attributes);

    // If not self-closing, assume it has children
    if (!isSelfClosing) {
      componentDef.children = 'string';
    }
  });

  return components;
};
