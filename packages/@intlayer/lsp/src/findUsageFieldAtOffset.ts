import { findMessageUsageAtOffset } from './usageAnalyzer';

/**
 * Detect when the cursor is on a field name that was obtained from a
 * useIntlayer / getIntlayer call in the same file. Two patterns:
 *
 *   Pattern 1 — destructuring:
 *     const { localeSwitcherLabel } = useIntlayer("locale-switcher")
 *                ^^^^^^^^^^^^^^^^^^  ← cursor here
 *
 *   Pattern 2 — member access:
 *     const t = useIntlayer("locale-switcher")
 *     t.localeSwitcherLabel              ← cursor on the property
 *
 * Thin compatibility wrapper over `findMessageUsageAtOffset`.
 * Returns { dictionaryKey, fieldName } when matched, null otherwise.
 */
export const findUsageFieldAtOffset = (
  text: string,
  offset: number
): { dictionaryKey: string; fieldName: string } | null => {
  const usage = findMessageUsageAtOffset(text, offset);

  if (!usage) return null;

  if (usage.kind !== 'member' && usage.kind !== 'destructure') return null;

  const fieldName = usage.fieldPath[usage.fieldPath.length - 1];

  if (!fieldName) return null;

  return { dictionaryKey: usage.dictionaryKey, fieldName };
};
