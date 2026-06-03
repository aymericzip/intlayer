import { Position, Range } from 'vscode-languageserver/node.js';

export const escapeRegex = (content: string): string =>
  content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const offsetToRange = (
  text: string,
  start: number,
  end: number
): Range => {
  const beforeStart = text.slice(0, start);
  const startLine = (beforeStart.match(/\n/g) ?? []).length;
  const startCharacter = start - (beforeStart.lastIndexOf('\n') + 1);
  const beforeEnd = text.slice(0, end);
  const endLine = (beforeEnd.match(/\n/g) ?? []).length;
  const endCharacter = end - (beforeEnd.lastIndexOf('\n') + 1);

  return Range.create(
    Position.create(startLine, startCharacter),
    Position.create(endLine, endCharacter)
  );
};

/**
 * Within a single file's text, find all positions where `fieldName` is used
 * as a destructured property or member access on a `useIntlayer(key)` /
 * `getIntlayer(key)` result.
 *
 * Covers the two most common patterns across any number of call sites:
 *   1. const { fieldName, … } = useIntlayer("key")  — destructuring
 *   2. const varName = useIntlayer("key")  →  varName.fieldName  — member access
 *
 * Both patterns are scanned globally so multiple calls inside the same file
 * all produce their own Range entries.
 */
export const findFieldRangesInFile = (
  text: string,
  escapedKey: string,
  fieldName: string,
  escapedField: string
): Range[] => {
  const ranges: Range[] = [];

  // Pattern 1 — destructuring
  // Handles flat and multiline destructures: { fieldName } = useIntlayer("key")
  // and renamed destructures: { fieldName: alias } = useIntlayer("key").
  // [^}]* stops at the first '}' so it won't span across multiple destructures
  // in the same file — each call site is matched independently.
  const destructureRegex = new RegExp(
    `\\{([^}]*)\\}\\s*=\\s*(?:use|get)Intlayer(?:<[^<>()]*>)?\\s*\\(\\s*['"\`]${escapedKey}['"\`]`,
    'g'
  );

  for (const match of text.matchAll(destructureRegex)) {
    const inner = match[1] ?? '';
    const innerStart = match.index! + 1; // char after '{'
    const fieldRegex = new RegExp(`(?<![.\\w])(${escapedField})(?![\\w])`, 'g');

    for (const fieldMatch of inner.matchAll(fieldRegex)) {
      const position = innerStart + fieldMatch.index!;
      ranges.push(offsetToRange(text, position, position + fieldName.length));
    }
  }

  // Pattern 2 — direct assignment then member access
  // const varName = useIntlayer("key")  →  varName.fieldName
  // Each assignment gets its own varName search so multiple assignments in the
  // same file are all resolved independently.
  const assignmentRegex = new RegExp(
    `(?:const|let|var)\\s+(\\w+)\\s*=\\s*(?:use|get)Intlayer(?:<[^<>()]*>)?\\s*\\(\\s*['"\`]${escapedKey}['"\`]`,
    'g'
  );
  for (const match of text.matchAll(assignmentRegex)) {
    const variableName = match[1];

    if (!variableName) continue;

    const memberRegex = new RegExp(
      `\\b${escapeRegex(variableName)}\\.(${escapedField})\\b`,
      'g'
    );

    for (const memberMatch of text.matchAll(memberRegex)) {
      const position = memberMatch.index! + variableName.length + 1; // +1 for '.'
      ranges.push(offsetToRange(text, position, position + fieldName.length));
    }
  }

  return ranges;
};
