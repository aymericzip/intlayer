import { commands, type ExtensionContext, languages, window } from 'vscode';
import { buildCommand } from './commands/buildAllCommand';
import { extractCommand } from './commands/extractCommand';
import { fillCommand, reviewCommand } from './commands/fillAllCommand';
import { initMCP } from './commands/initMCP';
import { initProject } from './commands/initProject';
import { initSkills } from './commands/initSkills';
import { pullCommand } from './commands/pullCommand';
import { pushCommand } from './commands/pushCommand';
import { selectEnvironment } from './commands/selectEnvironment';
import {
  initESLintCommand,
  initGitHubActionsCommand,
  initLSPCommand,
  loginCommand,
  pushConfigurationCommand,
  reviewDocCommand,
  scanCommand,
  standaloneCommand,
  startEditorCommand,
  translateDocCommand,
  upgradeCommand,
} from './commands/terminalCommands';
import { testCommand } from './commands/testCommand';
import {
  type ContentFileFormat,
  generateDictionaryContent,
} from './createDictionaryContent';
import { PROVIDER_DOCUMENT_SELECTOR } from './documentSelector';
import { buildActiveDictionary } from './editor/buildActiveDictionary';
import { createDictionaryFile } from './editor/createDictionaryFile';
import { fillActiveDictionary } from './editor/fillActiveDictionary';
import {
  DictionaryTreeDataProvider,
  type IntlayerTreeNode,
} from './explorer/dictionaryExplorer';
import { fillDictionary } from './explorer/fillDictionary';
import { pullDictionary } from './explorer/pullDictionary';
import { pushDictionary } from './explorer/pushDictionary';
import { SearchBarViewProvider } from './explorer/searchBarViewProvider';
import { startLSPClient } from './lsp/client';
import { promptCompatSetup } from './prompts/compatSetupPrompt';
import { dictionaryKeyDefinitionProvider } from './providers/dictionaryKeyDefinitionProvider';
import { intlayerContentDefinitionProvider } from './providers/intlayerContentDefinitionProvider';
import { intlayerContentRedirectionProvider } from './providers/intlayerContentRedirectionProvider';
import { intlayerDecorationProvider } from './providers/intlayerDecoration';
import { intlayerDefinitionProvider } from './providers/intlayerDefinitionProvider';
import { intlayerHoverProvider } from './providers/intlayerHoverProvider';
import { intlayerUnusedDecorationProvider } from './providers/intlayerUnusedDecoration';
import {
  invalidateConfigurationCaches,
  onDidChangeConfiguration,
  onDidChangeDictionaries,
  watchCacheInvalidation,
} from './utils/cacheInvalidation';
import { initializeEnvironmentStore } from './utils/envStore';
import { findProjectRoot } from './utils/findProjectRoot';
import {
  getCachedConfig,
  isContentDeclarationFile,
} from './utils/intlayerCache';
import { contentFileSaveWatcher } from './watchers/contentFileSaveWatcher';

/** Delay before revealing the active content file in the dictionaries tree. */
const REVEAL_DEBOUNCE_DELAY = 500;

/** Formats with a dedicated `extension.createDictionaryFile.<format>` command. */
const CONTENT_FILE_FORMATS: ContentFileFormat[] = [
  'ts',
  'esm',
  'cjs',
  'json',
  'json5',
  'jsonc',
];

const registerLanguageProviders = (context: ExtensionContext): void => {
  context.subscriptions.push(
    // `useIntlayer('my-key')` → dictionary declarations
    languages.registerDefinitionProvider(
      PROVIDER_DOCUMENT_SELECTOR,
      dictionaryKeyDefinitionProvider
    ),
    // `content.title` / `t('title')` → field declaration
    languages.registerDefinitionProvider(
      PROVIDER_DOCUMENT_SELECTOR,
      intlayerDefinitionProvider
    ),
    // `file()` / `nest()` in content files → referenced file / dictionary
    languages.registerDefinitionProvider(
      PROVIDER_DOCUMENT_SELECTOR,
      intlayerContentRedirectionProvider
    ),
    // Content file key / field → its usages in components
    languages.registerDefinitionProvider(
      PROVIDER_DOCUMENT_SELECTOR,
      intlayerContentDefinitionProvider
    ),
    languages.registerHoverProvider(
      PROVIDER_DOCUMENT_SELECTOR,
      intlayerHoverProvider
    ),
    ...intlayerDecorationProvider(),
    ...intlayerUnusedDecorationProvider()
  );
};

const registerCommands = (context: ExtensionContext): void => {
  context.subscriptions.push(
    ...CONTENT_FILE_FORMATS.map((format) =>
      commands.registerCommand(`extension.createDictionaryFile.${format}`, () =>
        generateDictionaryContent(format)
      )
    ),
    commands.registerCommand(
      'extension.createDictionaryFile',
      createDictionaryFile
    ),
    commands.registerCommand('extension.buildDictionaries', buildCommand),
    commands.registerCommand(
      'extension.buildActiveDictionary',
      buildActiveDictionary
    ),
    commands.registerCommand(
      'extension.fillActiveDictionary',
      fillActiveDictionary
    ),
    commands.registerCommand('extension.pushDictionaries', pushCommand),
    commands.registerCommand('extension.pullDictionaries', pullCommand),
    commands.registerCommand('extension.fillDictionaries', fillCommand),
    commands.registerCommand('extension.testDictionaries', testCommand),
    commands.registerCommand('intlayer.reviewDictionaries', reviewCommand),
    commands.registerCommand('intlayer.login', loginCommand),
    commands.registerCommand(
      'intlayer.pushConfiguration',
      pushConfigurationCommand
    ),
    commands.registerCommand('intlayer.startEditor', startEditorCommand),
    commands.registerCommand('intlayer.upgrade', upgradeCommand),
    commands.registerCommand('intlayer.translateDoc', translateDocCommand),
    commands.registerCommand('intlayer.reviewDoc', reviewDocCommand),
    commands.registerCommand('intlayer.scan', scanCommand),
    commands.registerCommand('intlayer.standalone', standaloneCommand),
    commands.registerCommand('intlayer.initLSP', initLSPCommand),
    commands.registerCommand('intlayer.initESLint', initESLintCommand),
    commands.registerCommand(
      'intlayer.initGitHubActions',
      initGitHubActionsCommand
    ),
    commands.registerCommand('intlayer.extract', extractCommand),
    commands.registerCommand('intlayer.initSkills', initSkills),
    commands.registerCommand('intlayer.initMCP', initMCP),
    commands.registerCommand('intlayer.initProject', () => initProject())
  );
};

/**
 * The dictionaries tree and its search bar. The active content file is
 * selected in the tree — revealed right away when the tree is visible, else
 * once it becomes visible.
 */
const registerDictionaryExplorer = (context: ExtensionContext): void => {
  const treeDataProvider = new DictionaryTreeDataProvider();
  const treeView = window.createTreeView('intlayer.dictionaries', {
    treeDataProvider,
    showCollapseAll: true,
  });

  let pendingRevealNode: IntlayerTreeNode | undefined;
  let revealTimeout: NodeJS.Timeout | undefined;

  const revealNode = async (node: IntlayerTreeNode): Promise<void> => {
    try {
      await treeView.reveal(node, { select: true, focus: false, expand: true });
    } catch {
      // Best effort: the node may be gone after a refresh
    }
  };

  const revealActiveContentFile = async (filePath: string): Promise<void> => {
    const projectDir = findProjectRoot(filePath);

    if (
      projectDir &&
      !isContentDeclarationFile(filePath, await getCachedConfig(projectDir))
    ) {
      return;
    }

    const fileNode =
      await treeDataProvider.findFileNodeByAbsolutePath(filePath);

    if (!fileNode) return;

    if (treeView.visible) {
      pendingRevealNode = undefined;
      await revealNode(fileNode);
    } else {
      pendingRevealNode = fileNode;
    }
  };

  context.subscriptions.push(
    treeView,
    // Also the manual escape hatch for changes no watcher sees
    // (e.g. a file imported by the configuration)
    commands.registerCommand('intlayer.refreshDictionaries', () => {
      invalidateConfigurationCaches();
      treeDataProvider.refresh();
    }),
    onDidChangeConfiguration(() => treeDataProvider.refresh()),
    onDidChangeDictionaries(() => treeDataProvider.refresh()),
    commands.registerCommand(
      'intlayer.selectEnvironment',
      (node?: IntlayerTreeNode) =>
        selectEnvironment(node?.projectDir, treeDataProvider)
    ),
    commands.registerCommand('intlayer.fillDictionary', fillDictionary),
    commands.registerCommand('intlayer.pullDictionary', pullDictionary),
    commands.registerCommand('intlayer.pushDictionary', pushDictionary),
    window.registerWebviewViewProvider(
      'intlayer.searchBar',
      new SearchBarViewProvider(context.extensionUri, treeDataProvider)
    ),
    treeView.onDidChangeVisibility(async ({ visible }) => {
      if (!visible || !pendingRevealNode) return;

      const node = pendingRevealNode;

      pendingRevealNode = undefined;
      await revealNode(node);
    }),
    window.onDidChangeActiveTextEditor((editor) => {
      clearTimeout(revealTimeout);

      if (!editor) return;

      revealTimeout = setTimeout(
        () => void revealActiveContentFile(editor.document.uri.fsPath),
        REVEAL_DEBOUNCE_DELAY
      );
    }),
    { dispose: () => clearTimeout(revealTimeout) }
  );
};

export const activate = (context: ExtensionContext) => {
  initializeEnvironmentStore(context);
  startLSPClient(context);

  // Suggest `intlayer init` for projects using a compat-compatible i18n library
  void promptCompatSetup(context);

  // First: the views below subscribe to its change events
  watchCacheInvalidation(context);
  registerLanguageProviders(context);
  registerCommands(context);
  registerDictionaryExplorer(context);

  context.subscriptions.push(contentFileSaveWatcher());
};
