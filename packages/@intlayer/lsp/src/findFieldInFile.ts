import { Position, Range } from 'vscode-languageserver/node';
import { collectMessageUsages } from './usageAnalyzer';

export const escapeRegularExpression = (content: string): string =>
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
 * Within a single file's text, find all positions where `fieldPath` (or legacy
 * `fieldName`) is consumed from the dictionary `escapedKey` — through any
 * registered caller.
 *
 * Covers base-intlayer patterns:
 *   1. Direct destructure:      const { field } = useIntlayer("key")
 *   2. Nested destructure:      const { parent: { child } } = useIntlayer("key")
 *   3. Indirect member access:  const { parent } = useIntlayer("key"); parent.child
 *   4. Full chain access:       const content = useIntlayer("key"); content.parent.child
 *
 * …and every compat form resolved by `collectMessageUsages`: translation
 * calls (`t('parent.child')`), self calls (`formatMessage({ id })`), JSX
 * message components and lingui tagged templates.
 *
 * `fieldPath` (optional 5th parameter) is the preferred input; when omitted
 * the function derives the single-element path from `escapedField`, preserving
 * backward compatibility.
 */
export const findFieldRangesInFile = (
  text: string,
  escapedKey: string,
  _fieldName: string,
  escapedField: string,
  fieldPath?: string[]
): Range[] => {
  const dictionaryKey = escapedKey.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');
  const unescapedLeaf = escapedField.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');

  // Effective path: use the provided fieldPath when available, else single-element
  const path = fieldPath && fieldPath.length > 0 ? fieldPath : [unescapedLeaf];

  const ranges: Range[] = [];

  for (const usage of collectMessageUsages(text)) {
    if (usage.dictionaryKey !== dictionaryKey) continue;

    // Bare variable references don't spell the field name — one hit per
    // declaration site, not per flow of the variable.
    if (usage.isBareReference) continue;

    if (usage.fieldPath.length !== path.length) continue;

    if (!usage.fieldPath.every((segment, index) => segment === path[index])) {
      continue;
    }

    // Member chains highlight the leaf property; other usages highlight the
    // whole expression (call, JSX element, tagged template, destructure key).
    const lastFieldSpan = usage.fieldSpans?.[usage.fieldSpans.length - 1];

    if (usage.kind === 'member' && lastFieldSpan) {
      ranges.push(offsetToRange(text, lastFieldSpan.start, lastFieldSpan.end));
    } else {
      ranges.push(offsetToRange(text, usage.start, usage.end));
    }
  }

  return ranges;
};
