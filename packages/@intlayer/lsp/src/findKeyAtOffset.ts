import { collectNamespaceReferences } from './usageAnalyzer';

/**
 * Scan `text` for a caller whose namespace (dictionary key) is addressed at
 * `offset`. Returns the namespace string when the cursor is on the caller
 * name or on the namespace argument itself, `null` otherwise.
 *
 * Handles every registered caller with a positional or options-object
 * namespace:
 *   useIntlayer("my-key")                 ← cursor on "my-key" or the callee
 *   useTranslations("namespace")          ← idem
 *   getFixedT("en", "namespace")          ← cursor on "namespace", not "en"
 *   useI18n({ namespace: "ns" })          ← cursor on "ns" or the callee
 *   getTranslations({ namespace: "ns" })  ← idem
 *
 * Self callers (`formatMessage`, lingui `t`/`_`) are message *usages*, not
 * namespace declarations — they are resolved by `findMessageUsageAtOffset`.
 */
export const findKeyAtOffset = (
  text: string,
  offset: number
): string | null => {
  for (const reference of collectNamespaceReferences(text)) {
    const isOnCalleeName =
      offset >= reference.calleeStart && offset <= reference.calleeEnd;
    const isOnNamespaceArgument =
      offset >= reference.namespaceStart && offset <= reference.namespaceEnd;

    if (isOnCalleeName || isOnNamespaceArgument) {
      return reference.dictionaryKey;
    }
  }

  return null;
};
