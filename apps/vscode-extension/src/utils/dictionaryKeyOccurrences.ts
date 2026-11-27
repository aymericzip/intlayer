import { dirname, extname } from 'node:path';
import {
  collectNestedDictionaryKeys,
  collectSourceDictionaryKeys,
  type DictionaryKeyOccurrence,
  findDictionaryKeyDeclaration,
  findDictionaryKeyOccurrenceAtOffset,
} from '@intlayer/lsp/utils';
import { type Position, Range, type TextDocument } from 'vscode';
import { extractScriptContent } from './extractScript';
import { findProjectRoot } from './findProjectRoot';
import { getCachedConfig, isContentDeclarationFile } from './intlayerCache';

/** A dictionary key under the cursor, with the project it belongs to. */
export type DictionaryKeyTarget = {
  dictionaryKey: string;
  projectDir: string;
  /** Span of the key text, quotes excluded. */
  range: Range;
};

/**
 * Every dictionary key written in a file's text:
 *
 * - content declaration file → its own `key`, then the keys it `nest()`s
 * - source file → the keys its callers read (`useIntlayer('key')`, …), SFC
 *   templates blanked so offsets stay valid
 */
export const collectDictionaryKeyOccurrences = (
  text: string,
  filePath: string,
  isContentFile: boolean
): DictionaryKeyOccurrence[] => {
  if (!isContentFile) {
    return collectSourceDictionaryKeys(
      extractScriptContent(text, extname(filePath).toLowerCase())
    );
  }

  const declaration = findDictionaryKeyDeclaration(text, filePath);

  return [
    ...(declaration ? [declaration] : []),
    ...collectNestedDictionaryKeys(text, filePath),
  ];
};

/** Occurrences per document URI, reused while its version is unchanged. */
const occurrencesCache = new Map<
  string,
  { version: number; occurrences: DictionaryKeyOccurrence[] }
>();

/**
 * The dictionary key under `position`, or `null` when the cursor is not on a
 * key string. Parsed once per document version: called on every cursor move.
 */
export const findDictionaryKeyAtPosition = async (
  document: TextDocument,
  position: Position
): Promise<DictionaryKeyTarget | null> => {
  const filePath = document.uri.fsPath;
  const projectDir = findProjectRoot(dirname(filePath));

  if (!projectDir) return null;

  const cacheKey = document.uri.toString();
  let cached = occurrencesCache.get(cacheKey);

  if (cached?.version !== document.version) {
    const configuration = await getCachedConfig(projectDir);

    cached = {
      version: document.version,
      occurrences: collectDictionaryKeyOccurrences(
        document.getText(),
        filePath,
        isContentDeclarationFile(filePath, configuration)
      ),
    };
    occurrencesCache.set(cacheKey, cached);
  }

  const occurrence = findDictionaryKeyOccurrenceAtOffset(
    cached.occurrences,
    document.offsetAt(position)
  );

  if (!occurrence) return null;

  return {
    dictionaryKey: occurrence.dictionaryKey,
    projectDir,
    range: new Range(
      document.positionAt(occurrence.start),
      document.positionAt(occurrence.end)
    ),
  };
};

/** Forget a closed document's occurrences. */
export const forgetDictionaryKeyOccurrences = (
  document: TextDocument
): void => {
  occurrencesCache.delete(document.uri.toString());
};
