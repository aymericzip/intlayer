import { relative } from 'node:path';
import { toComponentFilePath } from '@intlayer/lsp/utils';
import {
  commands,
  env,
  type ExtensionContext,
  Uri,
  window,
  workspace,
} from 'vscode';
import {
  onDidChangeConfiguration,
  onDidChangeDictionaries,
} from '../utils/cacheInvalidation';
import { findProjectRoot } from '../utils/findProjectRoot';
import {
  getAllCachedUnmergedDictionaries,
  getCachedConfig,
} from '../utils/intlayerCache';
import {
  getRelatedContentFiles,
  type RelatedContentFile,
} from '../utils/relatedContentFiles';

/** Command opening the content files the compiler extracted from a component. */
export const OPEN_RELATED_CONTENT_COMMAND = 'intlayer.openRelatedContent';

/**
 * Context key gating the editor title button: paths of the visible components
 * whose content was extracted by the compiler without rewriting them
 * (`compiler.saveComponents: false`), which leaves no `useIntlayer` call to
 * jump from.
 */
const RELATED_CONTENT_CONTEXT_KEY = 'intlayer.relatedContentResources';

/** Content files (or remote CMS dictionaries) extracted from the file, if any. */
const findRelatedContentFiles = async (
  filePath: string
): Promise<RelatedContentFile[]> => {
  const projectDir = findProjectRoot(filePath);

  if (!projectDir) return [];

  const configuration = await getCachedConfig(projectDir);

  // Saved components call `useIntlayer`: Go-to-Definition already covers them
  if (configuration.compiler?.saveComponents) return [];

  return getRelatedContentFiles(
    await getAllCachedUnmergedDictionaries(configuration),
    toComponentFilePath(configuration.system.baseDir, filePath),
    configuration.system.baseDir,
    configuration.editor?.cmsURL
  );
};

/** Opens a local content file in the editor, or a remote one on the CMS. */
const openContentFile = async (
  relatedContentFile: RelatedContentFile
): Promise<void> => {
  if (relatedContentFile.kind === 'remote') {
    await env.openExternal(Uri.parse(relatedContentFile.cmsDictionaryUrl));
    return;
  }

  await window.showTextDocument(
    await workspace.openTextDocument(relatedContentFile.absolutePath),
    { preview: false }
  );
};

/**
 * Opens the content file extracted from the component, or lets the user pick
 * one when the component produced several.
 */
const openRelatedContent = async (resource?: Uri): Promise<void> => {
  const filePath =
    resource?.fsPath ?? window.activeTextEditor?.document.uri.fsPath;

  if (!filePath) return;

  const relatedContentFiles = await findRelatedContentFiles(filePath);

  if (relatedContentFiles.length === 0) {
    void window.showInformationMessage(
      'Intlayer: no content file was extracted from this component.'
    );
    return;
  }

  const projectDir = findProjectRoot(filePath) ?? '';
  const selectedContentFile =
    relatedContentFiles.length === 1
      ? relatedContentFiles[0]
      : (
          await window.showQuickPick(
            relatedContentFiles.map((relatedContentFile) => ({
              label: relatedContentFile.dictionaryKey,
              description:
                relatedContentFile.kind === 'remote'
                  ? relatedContentFile.cmsDictionaryUrl
                  : relative(projectDir, relatedContentFile.absolutePath),
              relatedContentFile,
            })),
            { placeHolder: 'Select the content file to open' }
          )
        )?.relatedContentFile;

  if (!selectedContentFile) return;

  await openContentFile(selectedContentFile);
};

/** Shows the title button on the visible components with related content. */
const updateAvailability = async (): Promise<void> => {
  const filePaths = window.visibleTextEditors
    .map((textEditor) => textEditor.document.uri)
    .filter((uri) => uri.scheme === 'file')
    .map((uri) => uri.fsPath);

  const availability = await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        return (await findRelatedContentFiles(filePath)).length > 0;
      } catch {
        // Unloadable configuration: no button
        return false;
      }
    })
  );

  void commands.executeCommand(
    'setContext',
    RELATED_CONTENT_CONTEXT_KEY,
    filePaths.filter((_filePath, index) => availability[index])
  );
};

/** Registers the "open related content" command and its title button. */
export const registerOpenRelatedContent = (context: ExtensionContext): void => {
  const refreshAvailability = (): void => void updateAvailability();

  context.subscriptions.push(
    commands.registerCommand(OPEN_RELATED_CONTENT_COMMAND, openRelatedContent),
    window.onDidChangeVisibleTextEditors(refreshAvailability),
    onDidChangeConfiguration(refreshAvailability),
    onDidChangeDictionaries(refreshAvailability)
  );

  refreshAvailability();
};
