import { dirname, extname, join } from 'node:path';
import { findKeyAtOffset } from '@intlayer/lsp/utils';
import type { DefinitionProvider } from 'vscode';
import { isDefinitionHandledByLSPServer } from '../lsp/lspCoverage';
import { extractScriptContent } from '../utils/extractScript';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getKeyOriginRange } from '../utils/getKeyOriginRange';
import { getCachedConfig, getCachedDictionary } from '../utils/intlayerCache';
import {
  createDeclarationLinks,
  getDeclarationLinks,
} from '../utils/resolveDeclaration';

/** Separator of the `localIds` entries of merged dictionaries. */
const LOCAL_ID_SEPARATOR = '::local::';

/**
 * Source files of a dictionary read from its merged build, whose `localIds`
 * encode them as `key::local::filePath`. Used before the first dev build,
 * which is what writes the unmerged dictionaries.
 */
const getMergedDictionarySourcePaths = async (
  projectDir: string,
  dictionaryKey: string
): Promise<string[]> => {
  const { system } = await getCachedConfig(projectDir);
  const mergedDictionary = await getCachedDictionary(
    join(system.dictionariesDir, `${dictionaryKey}.json`)
  );
  const entries = [mergedDictionary ?? []].flat() as {
    localIds?: string[];
    filePath?: string;
  }[];

  return entries.flatMap(
    (entry) =>
      entry.localIds
        ?.map((localId) => localId.split(LOCAL_ID_SEPARATOR)[1])
        .filter((filePath): filePath is string => Boolean(filePath)) ??
      (entry.filePath ? [entry.filePath] : [])
  );
};

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

    // The LSP server resolves the same key from the same text
    if (await isDefinitionHandledByLSPServer(document, projectDir)) {
      return null;
    }

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
