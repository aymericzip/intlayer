import { readFile } from 'node:fs/promises';
import { isAbsolute, join, relative } from 'node:path';
import { extractErrorMessage } from '@intlayer/config/utils';
import {
  getContentWatcherOwner,
  isValidDictionaryKey,
} from '@intlayer/engine/utils';
import { findDictionaryKeyDeclaration } from '@intlayer/lsp/utils';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import {
  commands,
  type Disposable,
  languages,
  ProgressLocation,
  Range,
  type TextEditor,
  Uri,
  window,
  WorkspaceEdit,
  workspace,
} from 'vscode';
import { PROVIDER_DOCUMENT_SELECTOR } from '../documentSelector';
import {
  collectDictionaryKeyOccurrences,
  findDictionaryKeyAtPosition,
  forgetDictionaryKeyOccurrences,
} from '../utils/dictionaryKeyOccurrences';
import { listProjectSourceFiles } from '../utils/findUsages';
import {
  getAllCachedUnmergedDictionaries,
  getCachedConfig,
  getCachedUnmergedDictionaries,
  isContentDeclarationFile,
} from '../utils/intlayerCache';
import { prefix } from '../utils/logFunctions';
import { rebuildContentDeclarations } from '../utils/rebuildContentDeclaration';
import { getMergedDictionarySourcePaths } from '../utils/resolveDeclaration';
import { createOffsetToPosition } from '../utils/textPosition';
import { withoutSaveRebuild } from '../watchers/contentFileSaveWatcher';

export const RENAME_DICTIONARY_KEY_COMMAND = 'intlayer.renameDictionaryKey';

/** Context key true while the cursor is on a dictionary key (keybindings). */
const ON_DICTIONARY_KEY_CONTEXT = 'intlayer.onDictionaryKey';

/** Files read in parallel while looking for the key across the project. */
const FILE_READ_CONCURRENCY = 50;

/** Debounce of the context key update while the cursor moves or text changes. */
const CONTEXT_UPDATE_DELAY_MS = 50;

/** The key to rename, as hover links pass it. */
export type RenameDictionaryKeyArguments = {
  dictionaryKey: string;
  projectDir: string;
};

/** A link running the rename command on `renameArguments`. */
export const createRenameDictionaryKeyCommandUri = (
  renameArguments: RenameDictionaryKeyArguments
): Uri =>
  Uri.parse(
    `command:${RENAME_DICTIONARY_KEY_COMMAND}?${encodeURIComponent(
      JSON.stringify([renameArguments])
    )}`
  );

/** The edits renaming a key in one file. */
type FileRename = {
  filePath: string;
  isContentFile: boolean;
  ranges: Range[];
};

/** Text of a file as the editor holds it — unsaved changes included. */
const readCurrentText = async (filePath: string): Promise<string | null> => {
  const openDocument = workspace.textDocuments.find(
    (document) => document.uri.fsPath === filePath
  );

  if (openDocument) return openDocument.getText();

  return readFile(filePath, 'utf8').catch(() => null);
};

/**
 * Absolute paths of the content files declaring `dictionaryKey` — the active
 * one included, as a file being written may not be built yet.
 */
const getDeclaringFilePaths = async (
  projectDir: string,
  configuration: IntlayerConfig,
  unmergedDictionaries: Dictionary[],
  dictionaryKey: string
): Promise<string[]> => {
  const relativePaths = unmergedDictionaries.length
    ? unmergedDictionaries.flatMap(({ filePath }) => filePath ?? [])
    : await getMergedDictionarySourcePaths(projectDir, dictionaryKey);
  const declaringFilePaths = new Set(
    relativePaths.map((filePath) =>
      isAbsolute(filePath) ? filePath : join(projectDir, filePath)
    )
  );

  const activeDocument = window.activeTextEditor?.document;
  const activeFilePath = activeDocument?.uri.fsPath;
  const isActiveDeclaringFile =
    activeDocument &&
    activeFilePath &&
    isContentDeclarationFile(activeFilePath, configuration) &&
    findDictionaryKeyDeclaration(activeDocument.getText(), activeFilePath)
      ?.dictionaryKey === dictionaryKey;

  if (isActiveDeclaringFile) declaringFilePaths.add(activeFilePath);

  return [...declaringFilePaths];
};

/**
 * Every file of the project writing `dictionaryKey`, with the ranges to
 * replace: the declaring content files, the content files nesting it, and the
 * source files reading it.
 */
const collectFileRenames = async (
  projectDir: string,
  configuration: IntlayerConfig,
  dictionaryKey: string,
  declaringFilePaths: string[]
): Promise<FileRename[]> => {
  const contentFilePaths = new Set([
    ...declaringFilePaths,
    ...(await getAllCachedUnmergedDictionaries(configuration)).flatMap(
      ({ filePath }) =>
        filePath
          ? [isAbsolute(filePath) ? filePath : join(projectDir, filePath)]
          : []
    ),
  ]);
  const sourceFilePaths = (await listProjectSourceFiles(projectDir)).map(
    (uri) => uri.fsPath
  );

  const candidates = [
    ...[...contentFilePaths].map((filePath) => ({
      filePath,
      isContentFile: true,
    })),
    ...sourceFilePaths.map((filePath) => ({ filePath, isContentFile: false })),
  ];

  const collectFileRename = async ({
    filePath,
    isContentFile,
  }: (typeof candidates)[number]): Promise<FileRename | null> => {
    const text = await readCurrentText(filePath);

    // Cheap pre-filter before parsing
    if (!text?.includes(dictionaryKey)) return null;

    const offsetToPosition = createOffsetToPosition(text);
    const ranges = collectDictionaryKeyOccurrences(
      text,
      filePath,
      isContentFile
    )
      .filter((occurrence) => occurrence.dictionaryKey === dictionaryKey)
      .map(({ start, end }) => {
        const startPosition = offsetToPosition(start);
        const endPosition = offsetToPosition(end);

        return new Range(
          startPosition.line,
          startPosition.character,
          endPosition.line,
          endPosition.character
        );
      });

    return ranges.length ? { filePath, isContentFile, ranges } : null;
  };

  const fileRenames: (FileRename | null)[] = [];

  // Batched: a large project would otherwise open every file at once
  for (
    let index = 0;
    index < candidates.length;
    index += FILE_READ_CONCURRENCY
  ) {
    fileRenames.push(
      ...(await Promise.all(
        candidates
          .slice(index, index + FILE_READ_CONCURRENCY)
          .map(collectFileRename)
      ))
    );
  }

  return fileRenames.filter(
    (fileRename): fileRename is FileRename => fileRename !== null
  );
};

/**
 * Declaring files whose key cannot be rewritten in place: computed or
 * imported keys, and compat catalogs whose key is their file name.
 */
const findUnrenamableFiles = async (
  declaringFilePaths: string[]
): Promise<string[]> => {
  const unrenamable = await Promise.all(
    declaringFilePaths.map(async (filePath) => {
      const text = await readCurrentText(filePath);

      // Deleted since the last build: nothing to rename there
      if (text === null) return null;

      // A file declaring another key (renamed by hand since the last build)
      // is simply left out of the edit
      return findDictionaryKeyDeclaration(text, filePath) ? null : filePath;
    })
  );

  return unrenamable.filter((filePath): filePath is string => !!filePath);
};

/** Ask for the new key; `null` when cancelled or unchanged. */
const promptNewDictionaryKey = async (
  dictionaryKey: string
): Promise<string | null> => {
  const newDictionaryKey = await window.showInputBox({
    title: `${prefix}Rename dictionary key`,
    prompt: `New key for "${dictionaryKey}" — renamed in its content files and every usage`,
    value: dictionaryKey,
    valueSelection: [0, dictionaryKey.length],
    validateInput: (value) =>
      isValidDictionaryKey(value.trim())
        ? null
        : 'Letters and digits, separated by single ".", "_" or "-".',
  });

  const trimmedKey = newDictionaryKey?.trim();

  return trimmedKey && trimmedKey !== dictionaryKey ? trimmedKey : null;
};

/** Resolve the key to rename: from a hover link, else under the cursor. */
const resolveRenameTarget = async (
  renameArguments?: RenameDictionaryKeyArguments
): Promise<RenameDictionaryKeyArguments | null> => {
  if (renameArguments?.dictionaryKey && renameArguments.projectDir) {
    return renameArguments;
  }

  const editor = window.activeTextEditor;

  return editor
    ? findDictionaryKeyAtPosition(editor.document, editor.selection.active)
    : null;
};

/**
 * Rewrite `dictionaryKey` as `newDictionaryKey` in every file writing it,
 * save them, then rebuild the edited content files.
 *
 * @returns The summary shown once done.
 * @throws When a declaration cannot be rewritten — nothing is edited then.
 */
const renameDictionaryKey = async (
  projectDir: string,
  dictionaryKey: string,
  newDictionaryKey: string
): Promise<string> => {
  const configuration = await getCachedConfig(projectDir);
  const unmergedDictionaries =
    (await getCachedUnmergedDictionaries(configuration, dictionaryKey)) ?? [];
  const declaringFilePaths = await getDeclaringFilePaths(
    projectDir,
    configuration,
    unmergedDictionaries,
    dictionaryKey
  );

  // Renaming the usages alone would leave them pointing at nothing
  if (!declaringFilePaths.length) {
    throw new Error(
      `no local content file declares "${dictionaryKey}" (remote dictionary, or dictionaries not built yet).`
    );
  }

  const unrenamableFiles = await findUnrenamableFiles(declaringFilePaths);

  if (unrenamableFiles.length) {
    const fileList = unrenamableFiles
      .map((filePath) => relative(projectDir, filePath))
      .join(', ');

    throw new Error(
      `the key of ${fileList} is not a string literal written in the file. Nothing was renamed.`
    );
  }

  const fileRenames = await collectFileRenames(
    projectDir,
    configuration,
    dictionaryKey,
    declaringFilePaths
  );

  if (!fileRenames.length) {
    throw new Error(`no file writes "${dictionaryKey}" anymore.`);
  }

  const workspaceEdit = new WorkspaceEdit();

  for (const { filePath, ranges } of fileRenames) {
    for (const range of ranges) {
      workspaceEdit.replace(Uri.file(filePath), range, newDictionaryKey);
    }
  }

  if (!(await workspace.applyEdit(workspaceEdit, { isRefactoring: true }))) {
    throw new Error('the editor rejected the edit.');
  }

  const contentFilePaths = fileRenames
    .filter(({ isContentFile }) => isContentFile)
    .map(({ filePath }) => filePath);

  // Saved before rebuilding: the build reads the files from disk
  const isRebuiltByWatcher = await withoutSaveRebuild(
    contentFilePaths,
    async () => {
      await Promise.all(
        fileRenames.map(async ({ filePath }) =>
          (await workspace.openTextDocument(filePath)).save()
        )
      );

      // A running watcher (`intlayer watch`, dev server) rebuilds on its own
      if (await getContentWatcherOwner(configuration)) return true;

      await rebuildContentDeclarations(contentFilePaths, configuration);

      return false;
    }
  );

  const occurrenceCount = fileRenames.reduce(
    (count, { ranges }) => count + ranges.length,
    0
  );
  const hasRemoteCopy = unmergedDictionaries.some(
    ({ location }) => location === 'remote' || location === 'hybrid'
  );

  return [
    `Renamed "${dictionaryKey}" to "${newDictionaryKey}": ${occurrenceCount} occurrence(s) in ${fileRenames.length} file(s).`,
    isRebuiltByWatcher
      ? 'The running Intlayer watcher rebuilds the dictionaries.'
      : 'Dictionaries rebuilt.',
    hasRemoteCopy
      ? `The CMS copy keeps the "${dictionaryKey}" key until you push.`
      : '',
  ]
    .filter(Boolean)
    .join(' ');
};

/**
 * Keep the `intlayer.onDictionaryKey` context key in sync with the cursor, so
 * Ctrl+R / F2 rename the dictionary key under it and keep their default
 * action everywhere else.
 */
export const watchDictionaryKeyContext = (): Disposable[] => {
  let isOnDictionaryKey = false;
  let timeout: NodeJS.Timeout | undefined;

  const setOnDictionaryKey = (value: boolean): void => {
    if (value === isOnDictionaryKey) return;

    isOnDictionaryKey = value;
    void commands.executeCommand(
      'setContext',
      ON_DICTIONARY_KEY_CONTEXT,
      value
    );
  };

  const update = async (editor: TextEditor | undefined): Promise<void> => {
    if (
      !editor ||
      !languages.match(PROVIDER_DOCUMENT_SELECTOR, editor.document)
    ) {
      setOnDictionaryKey(false);
      return;
    }

    const target = await findDictionaryKeyAtPosition(
      editor.document,
      editor.selection.active
    ).catch(() => null);

    // The editor may have changed while the configuration loaded
    setOnDictionaryKey(Boolean(target) && editor === window.activeTextEditor);
  };

  const scheduleUpdate = (editor: TextEditor | undefined): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => void update(editor), CONTEXT_UPDATE_DELAY_MS);
  };

  scheduleUpdate(window.activeTextEditor);

  return [
    window.onDidChangeTextEditorSelection(({ textEditor }) =>
      scheduleUpdate(textEditor)
    ),
    window.onDidChangeActiveTextEditor(scheduleUpdate),
    workspace.onDidCloseTextDocument(forgetDictionaryKeyOccurrences),
    { dispose: () => clearTimeout(timeout) },
  ];
};

/**
 * Rename a dictionary key everywhere it is written — the `key` of its content
 * files, the `nest()` references to it, and every `useIntlayer('key')`-like
 * call — then rebuild the edited dictionaries, dropping the old key's output.
 *
 * Bound to Ctrl+R / F2 on a key, and offered in the key's hover.
 */
export const renameDictionaryKeyCommand = async (
  renameArguments?: RenameDictionaryKeyArguments
): Promise<void> => {
  const target = await resolveRenameTarget(renameArguments);

  if (!target) {
    await window.showWarningMessage(
      `${prefix}Place the cursor on a dictionary key to rename it.`
    );
    return;
  }

  const { dictionaryKey, projectDir } = target;
  const newDictionaryKey = await promptNewDictionaryKey(dictionaryKey);

  if (!newDictionaryKey) return;

  const existingDictionaries = await getCachedUnmergedDictionaries(
    await getCachedConfig(projectDir),
    newDictionaryKey
  );

  if (existingDictionaries?.length) {
    const confirmation = await window.showWarningMessage(
      `${prefix}A dictionary "${newDictionaryKey}" already exists. Renaming "${dictionaryKey}" merges both.`,
      { modal: true },
      'Rename and merge'
    );

    if (!confirmation) return;
  }

  try {
    const summary = await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: `${prefix}Renaming "${dictionaryKey}" to "${newDictionaryKey}"...`,
      },
      () => renameDictionaryKey(projectDir, dictionaryKey, newDictionaryKey)
    );

    void window.showInformationMessage(`${prefix}${summary}`);
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Rename failed: ${extractErrorMessage(error)}`
    );
  }
};
