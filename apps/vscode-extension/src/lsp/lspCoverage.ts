import { extname } from 'node:path';
import type { TextDocument } from 'vscode';
import { LSP_LANGUAGES } from '../documentSelector';
import {
  getCachedConfig,
  isContentDeclarationFile,
} from '../utils/intlayerCache';
import { isLSPClientRunning } from './client';

/**
 * Single-file components. The server analyses the raw file text, and its parser
 * trips on template syntax (`v-for`, `{#each}`, Astro frontmatter), so it never
 * resolves anything here — only the extension providers, which extract the
 * `<script>` block first, can.
 */
const SFC_EXTENSIONS = new Set(['.vue', '.svelte', '.astro']);

/**
 * True when the LSP server's `onDefinition` already answers for this document,
 * so the extension-side provider must return `null` rather than produce a
 * second link to the same place.
 *
 * VS Code concatenates the results of every registered definition provider —
 * the LSP client being one of them — without deduplicating, so a target both
 * sides resolve is listed twice in the Go-to-Definition list.
 *
 * Outside SFCs the two run the very same analyzers (`findKeyAtOffset`,
 * `findMessageUsageAtOffset`) over the very same text, so whatever the
 * extension would find here the server has already returned.
 */
export const isDefinitionHandledByLSPServer = async (
  document: TextDocument,
  projectDir: string
): Promise<boolean> => {
  if (!isLSPClientRunning()) {
    return false;
  }

  if (!LSP_LANGUAGES.has(document.languageId)) {
    return false;
  }

  const filePath = document.uri.fsPath;

  if (SFC_EXTENSIONS.has(extname(filePath).toLowerCase())) {
    return false;
  }

  // Content files: the server bails out and delegates to the extension
  // providers (reverse lookup, `file()` / `nest()` redirection).
  return !isContentDeclarationFile(filePath, await getCachedConfig(projectDir));
};
