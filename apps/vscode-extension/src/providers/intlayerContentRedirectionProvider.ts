import { existsSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import {
  type DefinitionProvider,
  type Position,
  Range,
  type TextDocument,
  Uri,
} from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getDeclarationLinks } from '../utils/resolveDeclaration';

/** `file('./a.md')` in content files, `"filePath": "./a.md"` in JSON. */
const FILE_REFERENCE_PATTERNS = [
  /file\(\s*["']([^"']+)["']\s*\)/,
  /"filePath"\s*:\s*["']([^"']+)["']/,
];

/** `nest('other-key')` in content files, `"key": "other-key"` in JSON. */
const DICTIONARY_REFERENCE_PATTERNS = [
  /nest\(\s*["']([^"']+)["']\s*\)/,
  /"key"\s*:\s*["']([^"']+)["']/,
];

/**
 * The quoted value of the first pattern matching at `position`, with the
 * range it spans (quotes excluded).
 */
const findQuotedReference = (
  document: TextDocument,
  position: Position,
  patterns: RegExp[]
): { value: string; range: Range } | null => {
  for (const pattern of patterns) {
    const referenceRange = document.getWordRangeAtPosition(position, pattern);

    if (!referenceRange) continue;

    const match = /["']([^"']+)["']/.exec(document.getText(referenceRange));

    if (!match) return null;

    const valueStart =
      document.offsetAt(referenceRange.start) + match.index + 1;

    return {
      value: match[1]!,
      range: new Range(
        document.positionAt(valueStart),
        document.positionAt(valueStart + match[1]!.length)
      ),
    };
  }

  return null;
};

/** Resolve a `file()` path: relative to the content file, else the project. */
const resolveReferencedFilePath = (
  referencedPath: string,
  fileDir: string,
  projectDir: string
): string | null => {
  if (isAbsolute(referencedPath)) {
    return existsSync(referencedPath) ? referencedPath : null;
  }

  return (
    [join(fileDir, referencedPath), join(projectDir, referencedPath)].find(
      existsSync
    ) ?? null
  );
};

/**
 * Go-to-Definition inside content files: from `file()` paths to the file, and
 * from `nest()` references to the nested dictionary's declarations.
 */
export const intlayerContentRedirectionProvider: DefinitionProvider = {
  provideDefinition: async (document, position) => {
    const fileDir = dirname(document.uri.fsPath);
    const projectDir = findProjectRoot(fileDir);

    if (!projectDir) return null;

    const fileReference = findQuotedReference(
      document,
      position,
      FILE_REFERENCE_PATTERNS
    );

    if (fileReference) {
      const targetPath = resolveReferencedFilePath(
        fileReference.value,
        fileDir,
        projectDir
      );

      if (!targetPath) return null;

      const targetRange = new Range(0, 0, 0, 0);

      return [
        {
          originSelectionRange: fileReference.range,
          targetUri: Uri.file(targetPath),
          targetRange,
          targetSelectionRange: targetRange,
        },
      ];
    }

    const dictionaryReference = findQuotedReference(
      document,
      position,
      DICTIONARY_REFERENCE_PATTERNS
    );

    if (!dictionaryReference) return null;

    const links = await getDeclarationLinks(
      projectDir,
      { dictionaryKey: dictionaryReference.value, fieldPath: [] },
      dictionaryReference.range
    );

    return links.length ? links : null;
  },
};
