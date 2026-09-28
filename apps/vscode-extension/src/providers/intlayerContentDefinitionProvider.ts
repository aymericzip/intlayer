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
  findUsagesOfDictionary,
  type UsageLocation,
} from '../utils/findUsages';
import { getKeyOriginRange } from '../utils/getKeyOriginRange';

const usageCache = new Map<
  string,
  { timestamp: number; data: UsageLocation[] }
>();
const CACHE_TTL = 5 * 60 * 1000; // 5min

export const intlayerContentDefinitionProvider: DefinitionProvider = {
  provideDefinition: async (document: TextDocument, position: Position) => {
    const fileDir = dirname(document.uri.fsPath);
    const projectDir = findProjectRoot(fileDir);

    if (!projectDir) {
      return null;
    }

    const target = await getTargetFromDocument(document, position);
    if (!target) {
      return null;
    }

    const { dictionaryKey, clickedField, originSelectionRange } = target;

    // --- Cache Lookup ---
    const cacheKey = `${projectDir}:${dictionaryKey}`;
    const now = Date.now();
    let usages: UsageLocation[] | undefined;

    const cached = usageCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      usages = cached.data;
    } else {
      usages = await findUsagesOfDictionary(projectDir, dictionaryKey);
      usageCache.set(cacheKey, { timestamp: now, data: usages });
    }

    if (!usages || usages.length === 0) {
      return null;
    }

    const links: DefinitionLink[] = [];

    for (const usage of usages) {
      // Clicked the main key: show where the dictionary is instantiated
      if (clickedField === 'key') {
        links.push({
          originSelectionRange,
          targetUri: usage.uri,
          targetRange: usage.range,
          targetSelectionRange: usage.range,
        });
        continue;
      }

      // Clicked a specific content field (e.g. 'title')
      const preciseRanges = usage.keyLocations.get(clickedField);

      if (preciseRanges && preciseRanges.length > 0) {
        for (const range of preciseRanges) {
          links.push({
            originSelectionRange,
            targetUri: usage.uri,
            targetRange: range,
            targetSelectionRange: range,
          });
        }
      } else if (usage.keysUsed.has('__ALL__')) {
        links.push({
          originSelectionRange,
          targetUri: usage.uri,
          targetRange: usage.range,
          targetSelectionRange: usage.range,
        });
      }
    }

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
