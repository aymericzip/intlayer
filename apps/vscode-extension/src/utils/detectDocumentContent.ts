import { dirname, extname } from 'node:path';
import {
  detectExtractableContent,
  type ExtractableContent,
} from '@intlayer/babel';
import type { TextDocument } from 'vscode';
import { findProjectRoot } from './findProjectRoot';
import { getCachedConfig, isContentDeclarationFile } from './intlayerCache';

/** Component files the Babel extractor can rewrite one string at a time. */
export const EXTRACTABLE_EXTENSIONS = new Set(['.tsx', '.jsx']);

/**
 * The hardcoded strings of a component the extractor would move to a
 * dictionary, or `[]` when the document is not a component of an Intlayer
 * project configured with a `compiler.output`.
 */
export const detectDocumentContent = async (
  document: TextDocument
): Promise<ExtractableContent[]> => {
  const filePath = document.uri.fsPath;

  if (!EXTRACTABLE_EXTENSIONS.has(extname(filePath).toLowerCase())) return [];

  const projectDir = findProjectRoot(dirname(filePath));

  if (!projectDir) return [];

  const configuration = await getCachedConfig(projectDir);

  // Without `compiler.output` the extraction has nowhere to write
  if (!configuration.compiler?.output) return [];

  if (isContentDeclarationFile(filePath, configuration)) return [];

  return detectExtractableContent(document.getText(), filePath, configuration);
};

/**
 * Whether the compiler of the document's project is on (`compiler.enabled`
 * `true` or `'build-only'`), i.e. whether it reads `intlayer-ignore` comments.
 */
export const isDocumentCompilerEnabled = async (
  document: TextDocument
): Promise<boolean> => {
  const projectDir = findProjectRoot(dirname(document.uri.fsPath));

  if (!projectDir) return false;

  const configuration = await getCachedConfig(projectDir);

  return Boolean(configuration.compiler?.enabled);
};
