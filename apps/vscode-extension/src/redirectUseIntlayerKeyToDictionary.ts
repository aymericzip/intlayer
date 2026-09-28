import { dirname, extname, join } from 'node:path';
import { findKeyAtOffset } from '@intlayer/lsp/utils';
import {
  type DefinitionLink,
  type DefinitionProvider,
  Position,
  Range,
  Uri,
} from 'vscode';
import { isDefinitionHandledByLSPServer } from './lsp/lspCoverage';
import { dedupeDefinitionLinks } from './utils/dedupeDefinitionLinks';
import { extractScriptContent } from './utils/extractScript';
import { findFieldLocation } from './utils/findFieldLocation';
import { findProjectRoot } from './utils/findProjectRoot';
import { getCachedConfig, getCachedDictionary } from './utils/intlayerCache';

export const redirectUseIntlayerKeyToDictionary: DefinitionProvider = {
  provideDefinition: async (document, position) => {
    // Only activate when the cursor is on a quoted string — this ensures we
    // trigger on the key argument ('my-key') and not on the function name
    // (useIntlayer), which would conflict with the TypeScript "Go to Definition"
    // for the imported symbol.
    const wordRange = document.getWordRangeAtPosition(
      position,
      /["'`][^"'`]+["'`]/
    );

    if (!wordRange) {
      return null;
    }

    const fileDir = dirname(document.uri.fsPath);
    const projectDir = findProjectRoot(fileDir);

    if (!projectDir) {
      return null;
    }

    // The LSP server resolves the same key from the same text. Answering here
    // too would list the dictionary twice.
    if (await isDefinitionHandledByLSPServer(document, projectDir)) {
      return null;
    }

    // For Vue / Svelte / Astro files, pass only the script block content to the
    // AST parser. The raw SFC text contains template HTML that confuses oxc
    // (e.g. Vue's <script setup> attributes, Svelte control-flow tags).
    // extractScriptContent replaces non-script content with spaces so byte
    // offsets remain valid and findKeyAtOffset still works correctly.
    const text = document.getText();
    const extension = extname(document.uri.fsPath).toLowerCase();
    const scriptContent = extractScriptContent(text, extension);
    const offset = document.offsetAt(position);
    const word = findKeyAtOffset(scriptContent, offset);

    if (!word) {
      return null;
    }

    // Compute the origin selection range (the key string without its quotes).
    const originSelectionRange = new Range(
      wordRange.start.translate(0, 1),
      wordRange.end.translate(0, -1)
    );

    // Load configuration (cached)
    const config = await getCachedConfig(projectDir);

    // Try unmerged dictionary first (has explicit filePath per source file).
    // Fall back to the merged dictionary when the unmerged one hasn't been
    // generated yet (project hasn't run `intlayer build`). The merged dict
    // encodes source paths in `localIds` as "key::local::filePath".
    let filePaths: string[] = [];

    const unmergedPath = join(
      config.system.unmergedDictionariesDir,
      `${word}.json`
    );
    const unmergedDictionaries = await getCachedDictionary(unmergedPath);

    if (unmergedDictionaries) {
      filePaths = unmergedDictionaries
        .map((dictionary) => dictionary.filePath as string | undefined)
        .filter((path): path is string => typeof path === 'string');
    } else {
      const mergedPath = join(config.system.dictionariesDir, `${word}.json`);
      const merged = await getCachedDictionary(mergedPath);
      // Merged dict is a single object wrapped as an array by getCachedDictionary
      // (it won't be, actually — it's a raw object). Read it directly.
      if (merged) {
        // getCachedDictionary parses the file as Dictionary[] but merged dicts
        // are a single Dictionary object. Check both shapes.
        const entries = Array.isArray(merged) ? merged : [merged];
        for (const entry of entries) {
          const localIds = (entry as Record<string, unknown>).localIds as
            | string[]
            | undefined;
          if (localIds) {
            for (const id of localIds) {
              const parts = id.split('::local::');
              if (parts.length === 2 && parts[1]) filePaths.push(parts[1]);
            }
          } else if (entry.filePath) {
            filePaths.push(entry.filePath as string);
          }
        }
      }
    }

    if (!filePaths.length) {
      return null;
    }

    const links: DefinitionLink[] = [];

    for (const filePath of filePaths) {
      const absoluteSourcePath = join(projectDir, filePath);
      const sourceUri = Uri.file(absoluteSourcePath);

      // Jump directly to the `content` field in the source file if possible.
      const location = await findFieldLocation(absoluteSourcePath, ['content']);

      const targetRange = location
        ? new Range(
            new Position(location.line, location.character),
            new Position(location.line, location.character)
          )
        : new Range(new Position(0, 0), new Position(0, 0));

      links.push({
        originSelectionRange,
        targetUri: sourceUri,
        targetRange,
        targetSelectionRange: targetRange,
      });
    }

    const uniqueLinks = dedupeDefinitionLinks(links);

    return uniqueLinks.length ? uniqueLinks : null;
  },
};
