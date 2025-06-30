const CHAR_TO_CHECK_FORMATTING = ['```', '\n\n', '\n', '---', '{{', '}}'];

// Escape a string for use in RegExp
const escapeForRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\n/g, '\\n');

// Build once the regex that matches any combination of the formatting chars appearing
// sequentially at the beginning or at the end of a string.
const FORMATTING_REGEX_SOURCE = `(?:${CHAR_TO_CHECK_FORMATTING.map(escapeForRegExp).join('|')})+`;
const LEADING_FORMATTING_REGEX = new RegExp(`^${FORMATTING_REGEX_SOURCE}`);
const TRAILING_FORMATTING_REGEX = new RegExp(`${FORMATTING_REGEX_SOURCE}$`);

export const fixChunkStartEndChars = (
  reviewedChunkResult: string,
  baseChunkContext: string
) => {
  let result = reviewedChunkResult;

  const baseLeading =
    baseChunkContext.match(LEADING_FORMATTING_REGEX)?.[0] ?? '';
  const baseTrailing =
    baseChunkContext.match(TRAILING_FORMATTING_REGEX)?.[0] ?? '';

  const resultLeading = result.match(LEADING_FORMATTING_REGEX)?.[0] ?? '';
  const resultTrailing = result.match(TRAILING_FORMATTING_REGEX)?.[0] ?? '';

  // Fix leading formatting
  if (baseLeading !== resultLeading) {
    // Remove current leading formatting found in result and prepend the correct one
    result = baseLeading + result.slice(resultLeading.length);
  }

  // Fix trailing formatting
  if (baseTrailing !== resultTrailing) {
    // Remove current trailing formatting found in result and append the correct one
    result =
      result.slice(0, result.length - resultTrailing.length) + baseTrailing;
  }

  return result;
};
