import { dirname, extname } from 'node:path';
import {
  findContentFieldAtOffset,
  findKeyInContentFile,
} from '@intlayer/lsp/utils';
import type {
  DefinitionLink,
  DefinitionProvider,
  Position,
  Range,
  TextDocument,
} from 'vscode';
import { dedupeDefinitionLinks } from '../utils/dedupeDefinitionLinks';
import { findProjectRoot } from '../utils/findProjectRoot';
import {
  ALL_FIELDS_USED,
  findCachedUsagesOfDictionary,
  UNTRACKED_FIELDS,
} from '../utils/findUsages';
import { getKeyOriginRange } from '../utils/getKeyOriginRange';

/** Usage scans are reused this long across Go-to-Definition requests. */
const USAGE_SCAN_MAX_AGE = 5 * 60 * 1000;

/** Go-to-Definition from a content file's key or field to its usages. */
export const intlayerContentDefinitionProvider: DefinitionProvider = {
  provideDefinition: async (document: TextDocument, position: Position) => {
    const projectDir = findProjectRoot(dirname(document.uri.fsPath));

    if (!projectDir) {
      return null;
    }

    const target = await getTargetFromDocument(document, position);
    if (!target) {
      return null;
    }

    const { dictionaryKey, clickedField, originSelectionRange } = target;

    const usages = await findCachedUsagesOfDictionary(
      projectDir,
      dictionaryKey,
      USAGE_SCAN_MAX_AGE
    );

    const links = usages.flatMap((usage) => {
      const toLink = (range: Range): DefinitionLink => ({
        originSelectionRange,
        targetUri: usage.uri,
        targetRange: range,
        targetSelectionRange: range,
      });

      // Dictionary key: where the dictionary is instantiated
      if (clickedField === 'key') return [toLink(usage.range)];

      // Content field: where it is read, else where the content escapes or
      // its trace is lost
      const fieldRanges = usage.keyLocations.get(clickedField) ?? [];

      if (fieldRanges.length > 0) return fieldRanges.map(toLink);

      const isUntraced =
        usage.keysUsed.has(ALL_FIELDS_USED) ||
        usage.keysUsed.has(UNTRACKED_FIELDS);

      return isUntraced ? [toLink(usage.range)] : [];
    });

    const uniqueLinks = dedupeDefinitionLinks(links);

    return uniqueLinks.length > 0 ? uniqueLinks : null;
  },
};

const getTargetFromDocument = async (
  document: TextDocument,
  position: Position
): Promise<{
  dictionaryKey: string;
  clickedField: string;
  originSelectionRange: Range;
} | null> => {
  const text = document.getText();
  const offset = document.offsetAt(position);
  const ext = extname(document.uri.fsPath);

  const clickedKey = findKeyInContentFile(text, offset);
  if (clickedKey) {
    return {
      dictionaryKey: clickedKey,
      clickedField: 'key',
      originSelectionRange: getKeyOriginRange(document, position),
    };
  }

  const contentField = findContentFieldAtOffset(text, offset, ext);
  if (contentField) {
    return {
      dictionaryKey: contentField.dictionaryKey,
      // Full dotted path — matches the keys of `UsageLocation.keyLocations`
      // (nested fields and flat lingui keys included).
      clickedField: contentField.fieldPath.join('.'),
      originSelectionRange: getKeyOriginRange(document, position),
    };
  }

  return null;
};
