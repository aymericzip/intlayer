import { findMessageUsageAtOffset } from './usageAnalyzer';

/**
 * Detect when the cursor is on a message usage carrying an explicit id: a
 * `t('key')` call from any translator caller, a self call
 * (`formatMessage({ id })`, `i18n._('id')`), a JSX message component or a
 * lingui tagged template.
 *
 * Thin compatibility wrapper over `findMessageUsageAtOffset` — kept for the
 * VS Code extension. `fieldName` is the dotted field path.
 *
 * Handles all assignment forms:
 *   const t = useTranslations('ns');                t('field')
 *   const { t } = useTranslation('ns');             t('field')
 *   const { t: translate } = useTranslation('ns');  translate('field')
 *   const t = await getFixedT('en', 'ns');          t('field')
 *   const { t } = useI18n({ namespace: 'ns' });     t('field')
 */
export const findTCallAtOffset = (
  text: string,
  offset: number
): { dictionaryKey: string; fieldName: string } | null => {
  const usage = findMessageUsageAtOffset(text, offset);

  if (!usage) return null;

  if (
    usage.kind !== 'call' &&
    usage.kind !== 'jsx' &&
    usage.kind !== 'tagged-template'
  ) {
    return null;
  }

  if (usage.fieldPath.length === 0) return null;

  return {
    dictionaryKey: usage.dictionaryKey,
    fieldName: usage.fieldPath.join('.'),
  };
};
