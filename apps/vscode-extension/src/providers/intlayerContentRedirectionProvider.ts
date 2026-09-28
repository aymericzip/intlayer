import { existsSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import {
  type DefinitionLink,
  type DefinitionProvider,
  type Position,
  Range,
  type TextDocument,
  Uri,
  Position as VSCodePosition,
} from 'vscode';
import { dedupeDefinitionLinks } from '../utils/dedupeDefinitionLinks';
import { findFieldLocation } from '../utils/findFieldLocation';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getCachedConfig, getCachedDictionary } from '../utils/intlayerCache';

export const intlayerContentRedirectionProvider: DefinitionProvider = {
  provideDefinition: async (document: TextDocument, position: Position) => {
    const fileDir = dirname(document.uri.fsPath);
    const projectDir = findProjectRoot(fileDir);

    if (!projectDir) {
      return null;
    }

    // 1. Detection of file() and nest() calls (TS/JS) or nodeType fields (JSON)
    const fileRange = document.getWordRangeAtPosition(
      position,
      /file\(\s*["']([^"']+)["']\s*\)/
    );
    const nestRange = document.getWordRangeAtPosition(
      position,
      /nest\(\s*["']([^"']+)["']\s*\)/
    );
    const jsonFileRange = document.getWordRangeAtPosition(
      position,
      /"filePath"\s*:\s*["']([^"']+)["']/
    );
    const jsonNestRange = document.getWordRangeAtPosition(
      position,
      /"key"\s*:\s*["']([^"']+)["']/
    );

    // --- Case 1: file() or "filePath" ---
    if (fileRange || jsonFileRange) {
      const range = fileRange ?? jsonFileRange!;
      const text = document.getText(range);
      const match = text.match(/["']([^"']+)["']/);

      if (!match || typeof match.index === 'undefined') {
        return null;
      }

      const path = match[1];
      const startOffset = match.index + 1;
      const endOffset = startOffset + path.length;

      const originSelectionRange = new Range(
        document.positionAt(document.offsetAt(range.start) + startOffset),
        document.positionAt(document.offsetAt(range.start) + endOffset)
      );

      let targetPath = path;

      if (!isAbsolute(targetPath)) {
        const relativeToFile = join(fileDir, targetPath);
        if (existsSync(relativeToFile)) {
          targetPath = relativeToFile;
        } else {
          targetPath = join(projectDir, targetPath);
        }
      }

      if (existsSync(targetPath)) {
        const targetUri = Uri.file(targetPath);
        const targetRange = new Range(
          new VSCodePosition(0, 0),
          new VSCodePosition(0, 0)
        );

        return [
          {
            originSelectionRange,
            targetUri,
            targetRange,
            targetSelectionRange: targetRange,
          },
        ] as DefinitionLink[];
      }
    }

    // --- Case 2: nest() or "key" ---
    if (nestRange || jsonNestRange) {
      const range = nestRange ?? jsonNestRange!;
      const text = document.getText(range);
      const match = text.match(/["']([^"']+)["']/);

      if (!match || typeof match.index === 'undefined') {
        return null;
      }

      const word = match[1];
      const startOffset = match.index + 1;
      const endOffset = startOffset + word.length;

      const originSelectionRange = new Range(
        document.positionAt(document.offsetAt(range.start) + startOffset),
        document.positionAt(document.offsetAt(range.start) + endOffset)
      );

      const config = await getCachedConfig(projectDir);
      const dictionaryPath = join(
        config.system.unmergedDictionariesDir,
        `${word}.json`
      );

      const dictionaries = await getCachedDictionary(dictionaryPath);

      if (!dictionaries) {
        return null;
      }

      const links: DefinitionLink[] = [];

      for (const dictionary of dictionaries) {
        if (!dictionary.filePath) {
          continue;
        }

        const absoluteSourcePath = join(projectDir, dictionary.filePath);
        const sourceUri = Uri.file(absoluteSourcePath);

        const location = await findFieldLocation(absoluteSourcePath, [
          'content',
        ]);

        const targetRange = location
          ? new Range(
              new VSCodePosition(location.line, location.character),
              new VSCodePosition(location.line, location.character)
            )
          : new Range(new VSCodePosition(0, 0), new VSCodePosition(0, 0));

        links.push({
          originSelectionRange,
          targetUri: sourceUri,
          targetRange: targetRange,
          targetSelectionRange: targetRange,
        });
      }

      const uniqueLinks = dedupeDefinitionLinks(links);

      return uniqueLinks.length ? uniqueLinks : null;
    }

    return null;
  },
};
