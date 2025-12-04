import type { Dictionary } from '@intlayer/types';

/**
 * Recursively compares source content with target content and returns only the missing parts.
 * For per-locale files where content is simple JSON (not translation nodes).
 *
 * @param sourceContent - The source content to check
 * @param targetContent - The existing target content
 * @returns Only the content that's missing in the target
 */
const filterMissingContent = (sourceContent: any, targetContent: any): any => {
  // If target doesn't exist, all source content is missing
  if (targetContent === undefined || targetContent === null) {
    return sourceContent;
  }

  // Primitive values: if target exists (even if empty string), consider it translated
  if (typeof sourceContent !== 'object' || sourceContent === null) {
    return undefined;
  }

  // Handle arrays
  if (Array.isArray(sourceContent)) {
    if (!Array.isArray(targetContent)) {
      return sourceContent;
    }

    const missingItems = sourceContent
      .map((item, index) => filterMissingContent(item, targetContent[index]))
      .filter((item) => item !== undefined);

    return missingItems.length > 0 ? missingItems : undefined;
  }

  // Handle objects
  const result: any = {};
  let hasMissingContent = false;

  for (const [key, value] of Object.entries(sourceContent)) {
    const targetValue = targetContent?.[key];
    const missingValue = filterMissingContent(value, targetValue);

    if (missingValue !== undefined) {
      result[key] = missingValue;
      hasMissingContent = true;
    }
  }

  return hasMissingContent ? result : undefined;
};

/**
 * Filters a dictionary to only include content that's missing in the target dictionary.
 * Used for per-locale content declarations in 'complete' mode.
 *
 * @param sourceDictionary - The source dictionary with content to translate
 * @param targetDictionary - The existing target dictionary
 * @returns A dictionary with only the missing content
 */
export const getFilterMissingContentPerLocale = (
  sourceDictionary: Dictionary,
  targetDictionary: Dictionary | undefined
): Dictionary => {
  if (!targetDictionary || !targetDictionary.content) {
    // If no target exists, all source content is missing
    return sourceDictionary;
  }

  const missingContent = filterMissingContent(
    sourceDictionary.content,
    targetDictionary.content
  );

  return {
    ...sourceDictionary,
    content: missingContent ?? {},
  };
};
