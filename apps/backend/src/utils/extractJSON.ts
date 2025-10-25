/**
 * Extracts and parses the first valid JSON value (object or array) from a string containing arbitrary text.
 * This is used to safely extract JSON from LLM responses that may contain additional text or markdown.
 *
 * @example
 * // Extracts JSON object from markdown response:
 * ```json
 * {
 *   "title": "Test content declarations",
 *   "description": "A comprehensive test dictionary...",
 *   "tags": ["test tag"]
 * }
 * ```
 *
 * @example
 * // Extracts JSON array:
 * ```json
 * ["item1", "item2", "item3"]
 * ```
 *
 * @example
 * // Extracts JSON from markdown:
 * Here is the response:
 * ```json
 * {"key": "value"}
 * ```
 * End of response.
 *
 * @throws {Error} If no valid JSON object/array is found or if parsing fails
 * @returns {T} The parsed JSON value cast to type T
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
