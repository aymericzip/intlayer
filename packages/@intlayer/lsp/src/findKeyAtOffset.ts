const INTLAYER_GETTERS = ['useIntlayer', 'getIntlayer'] as const;

// \s* deliberately uses \s (which includes \n) so multi-line calls match:
//   useIntlayer(
//     "my-key"
//   )
// Capture group 3 is the dictionary key.
const buildGetterRegex = () =>
  new RegExp(
    `\\b(${INTLAYER_GETTERS.join('|')})\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(['"\`])([^'"\`]+)\\2`,
    'g'
  );

/**
 * Scan `text` for an Intlayer getter call whose match span contains `offset`.
 * Returns the dictionary key string, or `null` if the cursor is not inside any
 * recognised call.
 */
export const findKeyAtOffset = (
  text: string,
  offset: number
): string | null => {
  const regex = buildGetterRegex();
  for (const match of text.matchAll(regex)) {
    const start = match.index;
    const end = start + match[0].length;
    if (offset >= start && offset <= end) {
      return match[3];
    }
  }
  return null;
};
