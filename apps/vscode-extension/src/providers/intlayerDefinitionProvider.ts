import { dirname } from 'node:path';
import type { DefinitionProvider } from 'vscode';
import { isDefinitionHandledByLSPServer } from '../lsp/lspCoverage';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getKeyOriginRange } from '../utils/getKeyOriginRange';
import { resolveIntlayerPath } from '../utils/intlayerPathResolver';
import { stripAccessorSuffix } from '../utils/intlayerValueResolver';
import { getDeclarationLinks } from '../utils/resolveDeclaration';

/**
 * Go-to-Definition from a field usage (`content.title`, `t('home.title')`,
 * `$_('home.title')` in a Svelte template, …) to where the field is declared.
 */
export const intlayerDefinitionProvider: DefinitionProvider = {
  provideDefinition: async (document, position) => {
    const projectDir = findProjectRoot(dirname(document.uri.fsPath));

    if (!projectDir) return null;

    // The LSP server resolves the same field usages from the same text.
    // Answering here too would list the target twice.
    if (await isDefinitionHandledByLSPServer(document, projectDir)) {
      return null;
    }

    const origin = await resolveIntlayerPath(document, position);

    if (!origin) return null;

    const links = await getDeclarationLinks(
      projectDir,
      { ...origin, fieldPath: stripAccessorSuffix(origin.fieldPath).fieldPath },
      getKeyOriginRange(document, position)
    );

    return links.length > 0 ? links : null;
  },
};
