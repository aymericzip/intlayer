import type { LocalDictionaryId } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { type ViewColumn, window } from 'vscode';
import {
  getCachedConfig,
  getCachedUnmergedDictionaries,
} from '../utils/intlayerCache';
import { createDeclarationLinks } from '../utils/resolveDeclaration';
import { keyPathToFieldPath } from './keyPathToFieldPath';

/** Content focused in the visual editor (`FileContent` of `@intlayer/editor`). */
export type FocusedContent = {
  dictionaryKey: string;
  dictionaryLocalId?: LocalDictionaryId;
  keyPath?: KeyPath[];
};

/**
 * Opens the content file declaring the focused field, with the field selected.
 * The file of the focused dictionary (by local id) is preferred over the other
 * files sharing its key.
 *
 * @param viewColumn - Column to open the file in.
 */
export const revealFocusedField = async (
  projectDir: string,
  focusedContent: FocusedContent,
  viewColumn: ViewColumn
): Promise<void> => {
  const { dictionaryKey, dictionaryLocalId, keyPath = [] } = focusedContent;
  const configuration = await getCachedConfig(projectDir);
  const dictionaries =
    (await getCachedUnmergedDictionaries(configuration, dictionaryKey)) ?? [];

  const focusedDictionary =
    dictionaries.find(
      (dictionary) =>
        dictionaryLocalId && dictionary.localId === dictionaryLocalId
    ) ?? dictionaries[0];

  if (!focusedDictionary?.filePath) return;

  const [link] = await createDeclarationLinks(
    projectDir,
    dictionaryKey,
    keyPathToFieldPath(keyPath),
    [focusedDictionary.filePath]
  );

  if (!link) return;

  await window.showTextDocument(link.targetUri, {
    viewColumn,
    selection: link.targetSelectionRange ?? link.targetRange,
    preserveFocus: true,
  });
};
