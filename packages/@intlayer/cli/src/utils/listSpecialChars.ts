type ListCharResult = {
  char: string;
  /** First line index contained in this chunk (0-based)             */
  lineStart: number;
  /** Start character index in the original text (0-based, inclusive)*/
  charStart: number;
}[];

const SPECIAL_CHARS = [
  '  ',
  '\\',
  '|',
  '(',
  ')',
  '{',
  '}',
  '[',
  ']',
  '<',
  '>',
  '"',
  '=',
  '+',
  '*',
  '&',
  '#',
  '%',
  '$',
  '!',
  '?',
  ':',
  ';',
  '~',
];

export const listSpecialChars = (text: string): ListCharResult => {
  const results: ListCharResult = [];

  let lineIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const currentChar = text[i];

    // Handle newline characters ("\n"): treat them as a "\\" special char
    if (currentChar === '\n') {
      results.push({
        char: '\\',
        lineStart: lineIndex,
        charStart: i,
      });

      // Move to the next line after recording the special char
      lineIndex++;
      continue;
    }

    // Check if the current character is one of the special characters
    if (SPECIAL_CHARS.includes(currentChar)) {
      results.push({
        char: currentChar,
        lineStart: lineIndex,
        charStart: i,
      });
    }
  }

  return results;
};
