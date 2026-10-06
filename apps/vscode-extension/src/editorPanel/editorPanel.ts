import { EDITOR_URL } from '@intlayer/config/defaultValues';
import {
  commands,
  type ExtensionContext,
  env,
  type TextEditor,
  Uri,
  ViewColumn,
  type WebviewPanel,
  window,
} from 'vscode';
import { startEditorCommand } from '../commands/terminalCommands';
import { onDidChangeConfiguration } from '../utils/cacheInvalidation';
import {
  type CommandSource,
  findProjectRoot,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getCachedConfig } from '../utils/intlayerCache';
import {
  getEditorFrameHtml,
  getEditorUnreachableHtml,
} from './getEditorPanelHtml';
import { type FocusedContent, revealFocusedField } from './revealFocusedField';

/** Context key gating the editor title button. */
const PANEL_AVAILABLE_CONTEXT_KEY = 'intlayer.isEditorPanelAvailable';

/** Time a reachability probe waits for the editor server. */
const PROBE_TIMEOUT = 1_500;
/** Delay between probes while the editor server starts. */
const STARTUP_POLL_INTERVAL = 1_500;
/** Probes before giving up on a starting editor server. */
const STARTUP_POLL_ATTEMPTS = 40;

/** Messages posted by the panel webviews. */
type PanelMessage =
  | { type: 'focusedContent'; data: FocusedContent | null }
  | { type: 'startEditor' }
  | { type: 'retry' };

const isPanelMessage = (message: unknown): message is PanelMessage =>
  typeof message === 'object' &&
  message !== null &&
  typeof (message as PanelMessage).type === 'string';

type PanelState = {
  panel: WebviewPanel;
  projectDir: string;
  /** Last focused content revealed, to skip repeated focus messages. */
  lastFocusedContentKey?: string;
};

let panelState: PanelState | undefined;

const isEditorReachable = async (editorURL: string): Promise<boolean> => {
  try {
    await fetch(editorURL, { signal: AbortSignal.timeout(PROBE_TIMEOUT) });
    return true;
  } catch {
    return false;
  }
};

const waitForEditor = async (editorURL: string): Promise<boolean> => {
  for (let attempt = 0; attempt < STARTUP_POLL_ATTEMPTS; attempt++) {
    if (await isEditorReachable(editorURL)) return true;

    await new Promise((resolve) => setTimeout(resolve, STARTUP_POLL_INTERVAL));
  }

  return false;
};

/**
 * Editor URL of the project. Falls back to the default one when the
 * configuration fails to load: the editor reports setup issues itself.
 */
const getEditorURL = async (projectDir: string): Promise<string> => {
  const configuration = await getCachedConfig(projectDir).catch(
    () => undefined
  );

  return configuration?.editor?.editorURL ?? EDITOR_URL;
};

/**
 * Column to open content files in: the first visible text editor outside the
 * panel's column, else the column next to the panel.
 */
const getContentFileColumn = (panel: WebviewPanel): ViewColumn =>
  window.visibleTextEditors.find(
    (textEditor) => textEditor.viewColumn !== panel.viewColumn
  )?.viewColumn ??
  (panel.viewColumn === ViewColumn.One ? ViewColumn.Two : ViewColumn.One);

/** Shows the editor in the panel, or the start screen while it is down. */
const renderPanel = async (
  state: PanelState,
  isStarting = false
): Promise<void> => {
  const editorURL = await getEditorURL(state.projectDir);

  // Port-forwarded in remote workspaces
  const webviewEditorURL = (
    await env.asExternalUri(Uri.parse(editorURL))
  ).toString(true);

  if (await isEditorReachable(editorURL)) {
    state.panel.webview.html = getEditorFrameHtml(webviewEditorURL);
    return;
  }

  state.panel.webview.html = getEditorUnreachableHtml(editorURL, isStarting);

  if (isStarting && (await waitForEditor(editorURL))) {
    await renderPanel(state);
  } else if (isStarting) {
    state.panel.webview.html = getEditorUnreachableHtml(editorURL, false);
  }
};

const handlePanelMessage = async (
  state: PanelState,
  message: PanelMessage
): Promise<void> => {
  switch (message.type) {
    case 'focusedContent': {
      if (!message.data?.dictionaryKey) return;

      const focusedContentKey = JSON.stringify(message.data);

      if (focusedContentKey === state.lastFocusedContentKey) return;

      state.lastFocusedContentKey = focusedContentKey;

      await revealFocusedField(
        state.projectDir,
        message.data,
        getContentFileColumn(state.panel)
      );
      return;
    }
    case 'startEditor':
      await startEditorCommand({ projectDir: state.projectDir });
      await renderPanel(state, true);
      return;
    case 'retry':
      await renderPanel(state);
      return;
  }
};

const createPanel = (
  context: ExtensionContext,
  projectDir: string
): PanelState => {
  const panel = window.createWebviewPanel(
    'intlayer.editorPanel',
    'Intlayer Editor',
    { viewColumn: ViewColumn.Beside, preserveFocus: false },
    { enableScripts: true, retainContextWhenHidden: true }
  );

  panel.iconPath = {
    light: Uri.joinPath(context.extensionUri, 'editor-icon-light.svg'),
    dark: Uri.joinPath(context.extensionUri, 'editor-icon-dark.svg'),
  };

  const state: PanelState = { panel, projectDir };

  panel.webview.onDidReceiveMessage((message: unknown) => {
    if (isPanelMessage(message)) void handlePanelMessage(state, message);
  });
  panel.onDidDispose(() => {
    if (panelState === state) panelState = undefined;
  });

  return state;
};

/**
 * Opens the visual editor (`editor.editorURL`) in a panel beside the code.
 * Selecting a field in it opens the content file declaring that field.
 */
const openEditorPanel = async (
  context: ExtensionContext,
  source?: CommandSource
): Promise<void> => {
  const projectDir = await resolveProjectDirOrPick(
    'Select the Intlayer project to edit',
    source
  );

  if (!projectDir) return;

  if (panelState?.projectDir === projectDir) {
    panelState.panel.reveal();
    return;
  }

  panelState?.panel.dispose();
  panelState = createPanel(context, projectDir);

  await renderPanel(panelState);
};

/** Shows the editor title button for files of an Intlayer project. */
const updateAvailability = (textEditor: TextEditor | undefined): void => {
  const isAvailable =
    textEditor?.document.uri.scheme === 'file' &&
    findProjectRoot(textEditor.document.uri.fsPath) !== undefined;

  void commands.executeCommand(
    'setContext',
    PANEL_AVAILABLE_CONTEXT_KEY,
    isAvailable
  );
};

/** Registers the visual editor panel command and its availability context. */
export const registerEditorPanel = (context: ExtensionContext): void => {
  context.subscriptions.push(
    commands.registerCommand('intlayer.openEditorPanel', (resource?: Uri) =>
      openEditorPanel(context, { filePath: resource?.fsPath })
    ),
    window.onDidChangeActiveTextEditor(updateAvailability),
    // A configuration file was created or deleted
    onDidChangeConfiguration(() => updateAvailability(window.activeTextEditor)),
    { dispose: () => panelState?.panel.dispose() }
  );

  updateAvailability(window.activeTextEditor);
};
