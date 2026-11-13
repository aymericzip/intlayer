import { dirname } from 'node:path';
import type { DefinitionProvider } from 'vscode';
import { isDefinitionHandledByLSPServer } from '../lsp/lspCoverage';
import { findCompilerTextTarget } from '../utils/findCompilerTextTarget';
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
    const target = origin
      ? {
          ...origin,
          fieldPath: stripAccessorSuffix(origin.fieldPath).fieldPath,
        }
      : // Raw string extracted by the compiler (`saveComponents: false`)
        await findCompilerTextTarget(document, position, projectDir);

    if (!target) return null;

    const links = await getDeclarationLinks(
      projectDir,
      target,
      getKeyOriginRange(document, position)
    );

    return links.length > 0 ? links : null;
  },
};
