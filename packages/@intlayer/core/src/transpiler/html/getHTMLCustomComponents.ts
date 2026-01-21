import { HTML_TAGS } from './index';

/**
 * Extracts custom component names from an HTML string.
 * Custom components are any tags that are not standard HTML tags.
 */
export const getHTMLCustomComponents = (content: string): string[] => {
  // Regex to match tags: <Tag ...>, </Tag>, or <Tag ... />
  // Captures: 2: Tag Name
  const tagRegex = /<(\/)?([a-zA-Z0-9.-]+)\s*([\s\S]*?)(\/?)>/g;
  const matches = [...content.matchAll(tagRegex)];

  const customComponents = matches
    .map((match) => match[2])
    .filter(
      (tagName) =>
        !(HTML_TAGS as readonly string[]).includes(tagName.toLowerCase())
    );

  return [...new Set(customComponents)];
};
