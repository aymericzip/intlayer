import {
  type CompilerTextField,
  collectCompilerTextFields,
  findCompilerTextAtOffset,
  toComponentFilePath,
  type UsageTarget,
} from '@intlayer/lsp/utils';
import type { Position, TextDocument } from 'vscode';
import {
  getAllCachedUnmergedDictionaries,
  getCachedConfig,
} from './intlayerCache';

/**
 * Source-locale text fields of the dictionaries the compiler extracted from
 * `document`, i.e. whose `componentFilePath` is this document.
 */
export const getDocumentCompilerTextFields = async (
  document: TextDocument,
  projectDir: string
): Promise<CompilerTextField[]> => {
  const configuration = await getCachedConfig(projectDir);
  const componentFilePath = toComponentFilePath(
    configuration.system.baseDir,
    document.uri.fsPath
  );
  const dictionaries = (
    await getAllCachedUnmergedDictionaries(configuration)
  ).filter((dictionary) => dictionary.componentFilePath === componentFilePath);

  return collectCompilerTextFields(
    dictionaries,
    configuration.internationalization.defaultLocale
  );
};

/**
 * The compiler-extracted string under the cursor (`compiler.saveComponents:
 * false` leaves the raw text in the component), as a usage target. Matched by
 * the source-locale text of the dictionaries whose `componentFilePath` is this
 * document, so it works in templates (Vue, Svelte, Astro) as well as in JSX.
 */
export const findCompilerTextTarget = async (
  document: TextDocument,
  position: Position,
  projectDir: string
): Promise<UsageTarget | null> => {
  const fields = await getDocumentCompilerTextFields(document, projectDir);

  if (fields.length === 0) return null;

  const match = findCompilerTextAtOffset(
    document.getText(),
    document.offsetAt(position),
    fields
  );

  return match
    ? {
        dictionaryKey: match.field.dictionaryKey,
        fieldPath: match.field.fieldPath,
      }
    : null;
};
