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
