import {
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
  const configuration = await getCachedConfig(projectDir);
  const componentFilePath = toComponentFilePath(
    configuration.system.baseDir,
    document.uri.fsPath
  );
  const dictionaries = (
    await getAllCachedUnmergedDictionaries(configuration)
  ).filter((dictionary) => dictionary.componentFilePath === componentFilePath);

  if (dictionaries.length === 0) return null;

  const match = findCompilerTextAtOffset(
    document.getText(),
    document.offsetAt(position),
    collectCompilerTextFields(
      dictionaries,
      configuration.internationalization.defaultLocale
    )
  );

  return match
    ? {
        dictionaryKey: match.field.dictionaryKey,
        fieldPath: match.field.fieldPath,
      }
    : null;
};
