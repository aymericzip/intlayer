import {
  type ContentNode,
  type MarkdownContent,
  getNodeChildren,
  NodeType,
} from '@intlayer/core';

export const getIsEditableSection = (section: ContentNode): boolean => {
  const children = getNodeChildren(section);

  return (
    typeof children === 'string' || // String
    typeof children === 'number' || // Number
    typeof children === 'boolean' || // Boolean
    typeof children === 'undefined' || // Undefined like nested field
    (children as MarkdownContent)?.nodeType === NodeType.Markdown
  );
};
