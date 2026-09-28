import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import {
  type DefinitionLink,
  type DefinitionProvider,
  Position,
  Range,
  Uri,
} from 'vscode';
import { isDefinitionHandledByLSPServer } from '../lsp/lspCoverage';
import { dedupeDefinitionLinks } from '../utils/dedupeDefinitionLinks';
import { findFieldLocation } from '../utils/findFieldLocation';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { getCachedDictionary } from '../utils/intlayerCache';
import { resolveIntlayerPath } from '../utils/intlayerPathResolver';

export const intlayerDefinitionProvider: DefinitionProvider = {
  provideDefinition: async (document, position) => {
    const fileDir = dirname(document.uri.fsPath);
    const projectDir = findProjectRoot(fileDir);
    if (!projectDir) {
      return null;
    }

    // The LSP server resolves the same field usages from the same text.
    // Answering here too would list the target twice.
    if (await isDefinitionHandledByLSPServer(document, projectDir)) {
      return null;
    }

    // Pass 'false' to allowRemoteLookup.
    // This prevents the provider from triggering "Go to Definition" recursively.
    const origin = await resolveIntlayerPath(document, position);

    if (!origin) {
      return null;
    }

    const { dictionaryKey, fieldPath } = origin;

    // ---------------------------------------------------------
    // Strip accessor for definition lookup
    // ---------------------------------------------------------
    const cleanPath = [...fieldPath];
    const lastKey = cleanPath[cleanPath.length - 1];
    if (lastKey === 'value' || lastKey === 'raw') {
      cleanPath.pop();
    }
    // ---------------------------------------------------------

    // 2. Load Configuration
    const config = getConfiguration(await getConfigurationOptions(projectDir));

    // 3. Load Unmerged Dictionary
    const dictionaryJsonPath = join(
      config.system.unmergedDictionariesDir,
      `${dictionaryKey}.json`
    );

    const dictionaries = await getCachedDictionary(dictionaryJsonPath);

    if (!dictionaries) {
      return null;
    }

    // 4. Find Definition Targets
    const targets: DefinitionLink[] = [];

    for (const dict of dictionaries) {
      if (!dict.filePath) {
        continue;
      }

      const absoluteSourcePath = join(projectDir, dict.filePath);
      if (!existsSync(absoluteSourcePath)) {
        continue;
      }

      const sourceUri = Uri.file(absoluteSourcePath);

      // usage: content.title -> source: { key: '...', content: { title: ... } }
      const astPath = ['content', ...cleanPath];

      const location = await findFieldLocation(absoluteSourcePath, astPath);

      const targetRange = location
        ? new Range(
            new Position(location.line, location.character),
            new Position(location.line, location.character)
          )
        : new Range(new Position(0, 0), new Position(0, 0));

      targets.push({
        originSelectionRange: document.getWordRangeAtPosition(position),
        targetUri: sourceUri,
        targetRange: targetRange,
        targetSelectionRange: targetRange,
      });
    }

    const links = dedupeDefinitionLinks(targets);

    return links.length > 0 ? links : null;
  },
};
