import {
  getInsertionValues,
  getMarkdownMetadata,
  insert,
  md,
} from '@intlayer/core';
import { NodeType } from '@intlayer/types';

/**
 * Check if a string is a markdown string
 */
const isMarkdown = (str: string): boolean => {
  // Check for common markdown indicators
  const patterns = [
    /^\s*#+\s/m, // Headers: # Title
    /^\s*[-*+]\s/m, // Unordered lists: - Item or * Item
    /^\s*\d+\.\s/m, // Ordered lists: 1. Item
    /^\s*>\s/m, // Blockquotes: > Quote
    /\[.+\]\(.+\)/, // Links: [text](url)
    /!\[.+\]\(.+\)/, // Images: ![alt](url)
    /`{1,3}.+`{1,3}/, // Code blocks or inline code: `code` or ```code```
    /\*\*.+\*\*/, // Bold: **text**
    /__.+__/, // Bold: __text__
  ];

  return patterns.some((pattern) => pattern.test(str));
};

/**
 * Check if a string is an insertion string
 */
const isInsertion = (str: string): boolean =>
  getInsertionValues(str).length > 0;

const leafNodeTypes: string[] = [
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

/**
 * Automatically decorate content strings with md() or insert() if they match
 */
export const autoDecorateContent = (content: any): any => {
  if (typeof content === 'string') {
    if (isMarkdown(content)) {
      const markdownNode = md(content);

      return {
        ...markdownNode,
        metadata: getMarkdownMetadata(content),
      };
    }
    if (isInsertion(content)) {
      return insert(content);
    }
    return content;
  }

  if (Array.isArray(content)) {
    return content.map(autoDecorateContent);
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
          [nodeType]: autoDecorateContent(content[nodeType]),
        };
      }

      return content;
    }

    // Plain object, recurse into all keys
    const result: Record<string, any> = {};
    for (const key of Object.keys(content)) {
      result[key] = autoDecorateContent(content[key]);
    }
    return result;
  }

  return content;
};
