import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import { getConfiguration } from '@intlayer/config/node';
import { commands, type ExtensionContext, languages, window } from 'vscode';
import { buildCommand } from './commands/buildAllCommand';
import { extractCommand } from './commands/extractCommand';
import { fillCommand } from './commands/fillAllCommand';
import { initMCP } from './commands/initMCP';
import { initProject } from './commands/initProject';
import { initSkills } from './commands/initSkills';
import { pullCommand } from './commands/pullCommand';
import { pushCommand } from './commands/pushCommand';
import { selectEnvironment } from './commands/selectEnvironment';
import { testCommand } from './commands/testCommand';
import { generateDictionaryContent } from './createDictionaryContent';
import { buildActiveDictionary } from './editor/buildActiveDictionary';
import { createDictionaryFile } from './editor/createDictionaryFile';
import { fillActiveDictionary } from './editor/fillActiveDictionary';
import { DictionaryTreeDataProvider } from './explorer/dictionaryExplorer';
import { fillDictionary } from './explorer/fillDictionary';
import { pullDictionary } from './explorer/pullDictionary';
import { pushDictionary } from './explorer/pushDictionary';
import { SearchBarViewProvider } from './explorer/searchBarViewProvider';
import { startLSPClient } from './lsp/client';
import { promptCompatSetup } from './prompts/compatSetupPrompt';
import { intlayerContentDefinitionProvider } from './providers/intlayerContentDefinitionProvider';
import { intlayerContentRedirectionProvider } from './providers/intlayerContentRedirectionProvider';
import { intlayerDecorationProvider } from './providers/intlayerDecoration';
import { intlayerDefinitionProvider } from './providers/intlayerDefinitionProvider';
import { intlayerHoverProvider } from './providers/intlayerHoverProvider';
import { intlayerUnusedDecorationProvider } from './providers/intlayerUnusedDecoration';
import { redirectUseIntlayerKeyToDictionary } from './redirectUseIntlayerKeyToDictionary';
import { initializeEnvironmentStore } from './utils/envStore';
import { findProjectRoot } from './utils/findProjectRoot';
import { getConfigurationOptions } from './utils/getConfiguration';
import { contentFileSaveWatcher } from './watchers/contentFileSaveWatcher';

export const activate = (context: ExtensionContext) => {
  initializeEnvironmentStore(context);
  startLSPClient(context);

  // Suggest `intlayer init` for projects using a compat-compatible i18n library
  void promptCompatSetup(context);

  const selector = [
    { language: 'javascript', scheme: 'file' },
    { language: 'javascriptreact', scheme: 'file' },
    { language: 'typescript', scheme: 'file' },
    { language: 'typescriptreact', scheme: 'file' },
    { language: 'vue', scheme: 'file' },
    { language: 'svelte', scheme: 'file' },
    { language: 'astro', scheme: 'file' },
    { language: 'html', scheme: 'file' },
    { language: 'json', scheme: 'file' },
    { language: 'jsonc', scheme: 'file' },
    { language: 'json5', scheme: 'file' },
    { language: 'yaml', scheme: 'file' },
    { language: 'markdown', scheme: 'file' },
  ];

  // String keys (useIntlayer(->'my-key'<-)
  context.subscriptions.push(
    languages.registerDefinitionProvider(
      selector,
      redirectUseIntlayerKeyToDictionary
    )
  );

  context.subscriptions.push(
    languages.registerDefinitionProvider(selector, intlayerDefinitionProvider)
  );

  context.subscriptions.push(
    languages.registerDefinitionProvider(
      selector,
      intlayerContentRedirectionProvider
    )
  );

  context.subscriptions.push(
    languages.registerHoverProvider(selector, intlayerHoverProvider)
  );

  // Returns an array of disposables (listeners)
  const decorationDisposables = intlayerDecorationProvider();
  context.subscriptions.push(...decorationDisposables);

  // Register Reverse Lookup (Content -> Component)
  // Allows Cmd+Click on content keys
  context.subscriptions.push(
    languages.registerDefinitionProvider(
      selector,
      intlayerContentDefinitionProvider
    )
  );

  // Register Unused Key Decoration (Strikethrough)
  const unusedDecorations = intlayerUnusedDecorationProvider();
  context.subscriptions.push(...unusedDecorations);

  // Register the definition provider
  context.subscriptions.push(
    commands.registerCommand(
      'extension.createDictionaryFile.ts',
      async () => await generateDictionaryContent('ts')
    ),
    commands.registerCommand(
      'extension.createDictionaryFile.esm',
      async () => await generateDictionaryContent('esm')
    ),
    commands.registerCommand(
      'extension.createDictionaryFile.cjs',
      async () => await generateDictionaryContent('cjs')
    ),
    commands.registerCommand(
      'extension.createDictionaryFile.json',
      async () => await generateDictionaryContent('json')
    ),
    commands.registerCommand(
      'extension.createDictionaryFile.json5',
      async () => await generateDictionaryContent('json5')
    ),
    commands.registerCommand(
      'extension.createDictionaryFile.jsonc',
      async () => await generateDictionaryContent('jsonc')
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
    commands.registerCommand('intlayer.extract', extractCommand),
    commands.registerCommand('intlayer.initSkills', initSkills),
    commands.registerCommand('intlayer.initMCP', initMCP),
    commands.registerCommand('intlayer.initProject', () => initProject())
  );

  const treeDataProvider = new DictionaryTreeDataProvider();
  const treeView = window.createTreeView('intlayer.dictionaries', {
    treeDataProvider,
    showCollapseAll: true,
  });

  context.subscriptions.push(
    commands.registerCommand('intlayer.refreshDictionaries', () =>
      treeDataProvider.refresh()
    ),
    commands.registerCommand(
      'intlayer.selectEnvironment',
      async (node?: any) =>
        await selectEnvironment(node?.projectDir, treeDataProvider)
    ),
    commands.registerCommand('intlayer.fillDictionary', fillDictionary),
    commands.registerCommand('intlayer.pullDictionary', pullDictionary),
    commands.registerCommand('intlayer.pushDictionary', pushDictionary),
    treeView
  );

  // Keep track of a node we want selected without forcing the view to reveal
  let pendingRevealNode: unknown | undefined;

  // When the tree view becomes visible, reveal the last pending node selection
  context.subscriptions.push(
    treeView.onDidChangeVisibility(async (element) => {
      if (element.visible && pendingRevealNode) {
        try {
          await treeView.reveal(pendingRevealNode as any, {
            select: true,
            focus: false,
            expand: true,
          });
        } catch (_error) {
          // best effort
        } finally {
          pendingRevealNode = undefined;
        }
      }
    })
  );

  context.subscriptions.push(
    window.registerWebviewViewProvider(
      'intlayer.searchBar',
      new SearchBarViewProvider(context.extensionUri, treeDataProvider)
    )
  );

  let debounceTimer: NodeJS.Timeout;

  // Reveal currently active editor if it matches an unmerged dictionary file path
  const activeEditorDisposable = window.onDidChangeActiveTextEditor(
    async (editorDisposable) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Debounce: Wait 500ms before querying file system / tree
      debounceTimer = setTimeout(async () => {
        try {
          if (!editorDisposable) {
            return;
          }

          const activeFilePath = editorDisposable.document.uri.fsPath;
          const projectRoot = findProjectRoot();

          if (projectRoot) {
            const configOptions = await getConfigurationOptions(
              projectRoot,
              false
            );
            const configuration = getConfiguration(configOptions);
            const fileExtensions =
              configuration.content?.fileExtensions ?? FILE_EXTENSIONS;

            const isContentFile = fileExtensions.some((ext) =>
              activeFilePath.endsWith(ext)
            );

            if (!isContentFile) {
              return;
            }
          }

          treeDataProvider.refresh();
          const node =
            await treeDataProvider.findFileNodeByAbsolutePath(activeFilePath);

          if (!node) {
            return;
          }

          // Store the intended selection and only reveal if the view is already visible
          pendingRevealNode = node;

          if (treeView.visible) {
            await treeView.reveal(node, {
              select: true,
              focus: false,
              expand: true,
            });
            pendingRevealNode = undefined;
          }
        } catch {
          // best effort
        }
      }, 500);
    }
  );

  context.subscriptions.push(activeEditorDisposable);

  context.subscriptions.push(contentFileSaveWatcher());

  // Quick create dictionary command with format selection
  context.subscriptions.push(
    commands.registerCommand(
      'extension.createDictionaryFile',
      async () => await createDictionaryFile()
    )
  );
};
