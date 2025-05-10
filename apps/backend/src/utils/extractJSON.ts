/**
 * Extracts the first JSON value (object or array) from a string.
 * Returns the parsed value, or throws if no valid JSON is found.
 */
export const extractJson = <T = any>(input: string): T => {
  const opening = input.match(/[{[]/);
  if (!opening) throw new Error('No JSON start character ({ or [) found.');

  const startIdx = opening.index!;
  const openChar = input[startIdx];
  const closeChar = openChar === '{' ? '}' : ']';
  let depth = 0;

  for (let i = startIdx; i < input.length; i++) {
    const char = input[i];
    if (char === openChar) depth++;
    else if (char === closeChar) {
      depth--;
      if (depth === 0) {
        const jsonSubstring = input.slice(startIdx, i + 1);
        try {
          return JSON.parse(jsonSubstring) as T;
        } catch (err) {
          throw new Error(`Failed to parse JSON: ${(err as Error).message}`);
        }
      }
    }
  }

  throw new Error('Reached end of input without closing JSON bracket.');
};
