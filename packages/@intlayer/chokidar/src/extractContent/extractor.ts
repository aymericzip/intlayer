import { generateKey } from './generateKey';

/**
 * Attributes that should be extracted as translatable strings from JSX/HTML elements.
 * This is the single source of truth shared across all Intlayer compiler packages
 * (@intlayer/babel, @intlayer/vue-compiler, @intlayer/svelte-compiler, @intlayer/chokidar).
 */
export const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
] as const;

/**
 * The list of supported Intlayer integration packages.
 * This is the single source of truth for package name validation.
 */
export const packageList = [
  'next-intlayer',
  'react-intlayer',
  'vue-intlayer',
  'svelte-intlayer',
  'preact-intlayer',
  'solid-intlayer',
  'angular-intlayer',
  'express-intlayer',
  'hono-intlayer',
  'fastify-intlayer',
  'adonis-intlayer',
] as const;

export type PackageName = (typeof packageList)[number];

/**
 * Checks whether the given text should be extracted as a translatable string.
 *
 * Filters out:
 * - Empty strings
 * - Single words (typically icons or technical terms)
 * - Strings not starting with an uppercase letter (likely technical values)
 * - Dynamic content patterns like Vue bindings (`v-`) or object patterns (`{`)
 */
export const shouldExtract = (text: string): boolean => {
  const trimmed = text.trim();

  if (!trimmed) return false;

  // We usually want to extract full sentences or labels, not single technical words
  if (!trimmed.includes(' ')) return false;

  // We assume content to extract starts with an uppercase letter
  if (!/^[A-Z]/.test(trimmed)) return false;

  // Ignore dynamic content patterns
  if (trimmed.startsWith('{') || trimmed.startsWith('v-')) return false;

  return true;
};

/**
 * Gets an existing key for a given text or generates a new one.
 */
export const getOrGenerateKey = (
  text: string,
  componentKey: string,
  existingKeys: Set<string>,
  extractedContent: Record<string, Record<string, string>>
): string => {
  if (!extractedContent[componentKey]) {
    extractedContent[componentKey] = {};
  }
  const existingEntry = Object.entries(extractedContent[componentKey]).find(
    ([_, value]) => value === text
  );

  if (existingEntry) {
    return existingEntry[0];
  }
  const key = generateKey(text, existingKeys);
  existingKeys.add(key);
  extractedContent[componentKey][key] = text;
  return key;
};

/**
 * Extracts a dictionary key from a file path.
 *
 * Example: "src/components/MyComponent/index.tsx" -> "comp-my-component"
 */
export const extractDictionaryKeyFromPath = (
  filePath: string,
  prefix = 'comp-'
): string => {
  const pathParts = filePath.split(/[\\/]/);
  const fileNameWithExt = pathParts.pop() || '';
  const lastDotIndex = fileNameWithExt.lastIndexOf('.');
  let baseName =
    lastDotIndex !== -1
      ? fileNameWithExt.slice(0, lastDotIndex)
      : fileNameWithExt;

  if (baseName.toLowerCase() === 'index') {
    baseName = pathParts.pop() || baseName;
  }

  return `${prefix}${baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()}`;
};
