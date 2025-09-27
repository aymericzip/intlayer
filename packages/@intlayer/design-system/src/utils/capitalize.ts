import { isEmpty } from './isEmpty';

export const capitalize = (string: string | undefined) => {
  if (!string) {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * @description Gets the capital letters from a name.
 * @param name - The name to extract capitals from.
 * @param separator - The separator to split the name (default is an empty string, which splits by each character).
 * @returns {string[]} An array of capital letters from the name.
 */
export const getCapitals = (name: string, separator = ''): string[] => {
  if (isEmpty(name)) return [];

  return name
    .split(separator)
    .map((word) => word[0])
    .filter(Boolean)
    .map((char) => char.toUpperCase());
};
