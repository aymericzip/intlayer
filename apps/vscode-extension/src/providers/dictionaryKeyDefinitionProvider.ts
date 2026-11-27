import { dirname, extname } from 'node:path';
import { findKeyAtOffset } from '@intlayer/lsp/utils';
import type { DefinitionProvider } from 'vscode';
import { isDefinitionHandledByLSPServer } from '../lsp/lspCoverage';
import { extractScriptContent } from '../utils/extractScript';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getKeyOriginRange } from '../utils/getKeyOriginRange';
import {
  createDeclarationLinks,
  getDeclarationLinks,
  getMergedDictionarySourcePaths,
  getRemoteDeclarationLinks,
} from '../utils/resolveDeclaration';

/**
 * Go-to-Definition from a dictionary key (`useIntlayer('my-key')`) to the
 * files declaring that dictionary.
 */
export const dictionaryKeyDefinitionProvider: DefinitionProvider = {
  provideDefinition: async (document, position) => {
    // Only on a quoted string: the key argument, not the function name, whose
    // definition belongs to TypeScript.
    if (!document.getWordRangeAtPosition(position, /["'`][^"'`]+["'`]/)) {
      return null;
    }

    const projectDir = findProjectRoot(dirname(document.uri.fsPath));

    if (!projectDir) return null;

    // SFC template syntax breaks the parser: analyse the script blocks only,
    // blanked in place so offsets stay valid.
    const scriptContent = extractScriptContent(
      document.getText(),
      extname(document.uri.fsPath).toLowerCase()
    );
    const dictionaryKey = findKeyAtOffset(
      scriptContent,
      document.offsetAt(position)
    );

    if (!dictionaryKey) return null;

    const originSelectionRange = getKeyOriginRange(document, position);

    // The LSP server resolves the same key from the same text, except for
    // remote dictionaries, which have no file
    if (await isDefinitionHandledByLSPServer(document, projectDir)) {
      const remoteLinks = await getRemoteDeclarationLinks(
        projectDir,
        { dictionaryKey, fieldPath: [] },
        originSelectionRange
      );

      return remoteLinks.length ? remoteLinks : null;
    }

    const declarationLinks = await getDeclarationLinks(
      projectDir,
      { dictionaryKey, fieldPath: [] },
      originSelectionRange
    );

    if (declarationLinks.length) return declarationLinks;

    const fallbackLinks = await createDeclarationLinks(
      projectDir,
      dictionaryKey,
      [],
      await getMergedDictionarySourcePaths(projectDir, dictionaryKey),
      originSelectionRange
    );

    return fallbackLinks.length ? fallbackLinks : null;
  },
};
