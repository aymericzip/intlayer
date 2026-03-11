import { generateKey } from './generateKey';

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
