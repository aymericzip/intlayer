const CHAR_TO_CHECK_FORMATTING = ['\n', '---', '```', '{{', '}}'];

export const fixChunkStartEndChars = (
  reviewedChunkResult: string,
  baseChunkContext: string
) => {
  let result = reviewedChunkResult;

  for (const char of CHAR_TO_CHECK_FORMATTING) {
    if (baseChunkContext.startsWith(char) && !result.startsWith(char)) {
      result = char + result;
    }
    if (baseChunkContext.endsWith(char) && !result.endsWith(char)) {
      result = result + char;
    }
    if (!baseChunkContext.startsWith(char) && result.startsWith(char)) {
      result = result.slice(char.length);
    }
    if (!baseChunkContext.endsWith(char) && result.endsWith(char)) {
      result = result.slice(0, -char.length);
    }
  }

  return result;
};
