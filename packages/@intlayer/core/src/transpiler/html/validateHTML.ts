export const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

export type HTMLValidationIssue = {
  type: 'error' | 'warning';
  message: string;
};

export type HTMLValidationResult = {
  valid: boolean;
  issues: HTMLValidationIssue[];
};

// Matches HTML tags: <Tag ...>, </Tag>, or <Tag ... />
// Attributes may span multiple lines but NOT blank lines (two consecutive newlines),
// which prevents matching blockquote `>` markers as tag closers.
// Groups: 1: closing slash, 2: tag name, 3: attributes, 4: self-closing slash
const TAG_REGEX =
  /<(\/)?([a-zA-Z][a-zA-Z0-9.-]*)\s*((?:[^\n]|\n(?!\n))*?)(\/?)>/g;

/**
 * Validates that HTML tags in `content` are properly opened, nested, and closed.
 * Returns structured issues instead of logging to the console.
 *
 * False-positive exclusions:
 * - Tags whose attribute string starts with `://` are URL autolinks (e.g. `<https://…>`).
 */
export const validateHTML = (content: string): HTMLValidationResult => {
  const issues: HTMLValidationIssue[] = [];
  const stack: Array<{ tag: string }> = [];

  for (const match of content.matchAll(TAG_REGEX)) {
    const isClosing = !!match[1];
    const tagName = match[2];
    const attrs = match[3];
    const isSelfClosing = !!match[4];

    // Skip URL autolinks like <https://example.com> or <mailto:user@example.com>
    if (
      attrs.trimStart().startsWith('://') ||
      attrs.trimStart().startsWith(':')
    ) {
      continue;
    }

    if (isClosing) {
      if (stack.length === 0) {
        issues.push({
          type: 'error',
          message: `Closing tag </${tagName}> has no matching opening tag`,
        });
      } else {
        const last = stack[stack.length - 1];
        if (last.tag.toLowerCase() !== tagName.toLowerCase()) {
          issues.push({
            type: 'error',
            message: `Mismatched closing tag: expected </${last.tag}> but found </${tagName}>`,
          });
        }
        stack.pop();
      }
    } else {
      const isVoidElement = VOID_ELEMENTS.has(tagName.toLowerCase());
      if (!isSelfClosing && !isVoidElement) {
        stack.push({ tag: tagName });
      }
    }
  }

  for (const unclosed of stack) {
    issues.push({
      type: 'error',
      message: `Unclosed HTML tag: <${unclosed.tag}>`,
    });
  }

  return {
    valid: issues.filter((i) => i.type === 'error').length === 0,
    issues,
  };
};
