import { getMarkdownMetadata } from '@intlayer/core/markdown';
import {
  getInsertionValues,
  html,
  insert,
  md,
} from '@intlayer/core/transpiler';
import { NodeType } from '@intlayer/types';

/**
 * Check if a string is a markdown string
 */
const isMarkdown = (str: string): boolean => {
  // Check for common markdown indicators
  const patterns = [
    /^\s*---/m, // Front Matter
    /^\s*#+\s/m, // Headers: # Title
    /^\s*[-*+]\s/m, // Unordered lists: - Item or * Item
    /^\s*\d+\.\s/m, // Ordered lists: 1. Item
    /^\s*>\s/m, // Blockquotes: > Quote
    /\[.+\]\(.+\)/, // Links: [text](url)
    /!\[.+\]\(.+\)/, // Images: ![alt](url)
    /`{1,3}.+`{1,3}/, // Code blocks or inline code: `code` or ```code```
    /\*\*.+\*\*/, // Bold: **text**
    /__.+__/, // Bold: __text__
    /<(https?:\/\/[^\s>]+)>/, // Autolinks: <http://...>
  ];

  return patterns.some((pattern) => pattern.test(str));
};

/**
 * Check if a string is an insertion string
 */
const isInsertion = (str: string): boolean =>
  getInsertionValues(str).length > 0;

/**
 * Check if a string is an HTML/JSX string
 * Matches:
 * - <Tag>
 * - </Tag>
 * - <Tag />
 * - <Tag attribute="value">
 * - <Component.SubComponent>
 */
const isHTML = (str: string): boolean => {
  // 1. Matches opening or self-closing tags: <Tag ... > or <Tag ... />
  //    - Must start with < followed by a letter (to avoid math comparisons like a < b)
  //    - Allows alphanumeric, hyphens, and dots (for Namespaced components) in tag name
  //    - Allows attributes until the closing >
  const openTagRegex = /<[a-zA-Z][a-zA-Z0-9\-.]*(\s+[^>]*)?\/?>/;

  // 2. Matches closing tags: </Tag>
  const closeTagRegex = /<\/[a-zA-Z][a-zA-Z0-9\-.]*\s*>/;

  return openTagRegex.test(str) || closeTagRegex.test(str);
};

const leafNodeTypes: string[] = [
  NodeType.HTML,
  NodeType.Markdown,
  NodeType.Insertion,
  NodeType.File,
  NodeType.ReactNode,
  NodeType.Text,
  NodeType.Number,
  NodeType.Boolean,
  NodeType.Null,
  NodeType.Unknown,
];

type AutoTransformationOptions = {
  markdown?: boolean;
  html?: boolean;
  insertion?: boolean;
};

/**
 * Automatically decorate content strings with md() or insert() if they match
 */
export const autoDecorateContent = (
  content: any,
  options: boolean | AutoTransformationOptions = true
): any => {
  if (options === false) {
    return content;
  }

  const {
    markdown = true,
    html: htmlOption = true,
    insertion = true,
  } = typeof options === 'object' ? options : {};

  if (typeof content === 'string') {
    if (markdown && isMarkdown(content)) {
      const markdownNode = md(content);

      return {
        ...markdownNode,
        metadata: getMarkdownMetadata(content),
      };
    }

    if (htmlOption && isHTML(content)) {
      return html(content);
    }

    if (insertion && isInsertion(content)) {
      return insert(content);
    }

    return content;
  }

  if (Array.isArray(content)) {
    return content.map((item) => autoDecorateContent(item, options));
  }

  if (content && typeof content === 'object') {
    // If it's already a decorated node (has nodeType)
    if ('nodeType' in content) {
      const nodeType = content.nodeType;

      // If it's a leaf node type, don't re-decorate its content
      if (leafNodeTypes.includes(nodeType)) {
        return content;
      }

      // If it's a container node type (like translation, enumeration, etc.), recurse into its content field
      if (nodeType in content) {
        return {
          ...content,
          [nodeType]: autoDecorateContent(content[nodeType], options),
        };
      }

      return content;
    }

    // Plain object, recurse into all keys
    const result: Record<string, any> = {};
    for (const key of Object.keys(content)) {
      result[key] = autoDecorateContent(content[key], options);
    }
    return result;
  }

  return content;
};
