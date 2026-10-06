import { readFile } from 'node:fs/promises';
import { EDITOR_URL } from '@intlayer/config/defaultValues';
import { searchConfigurationFile } from '@intlayer/config/node';
import {
  commands,
  type ExtensionContext,
  env,
  Range,
  type TextEditor,
  Uri,
  ViewColumn,
  type WebviewPanel,
  window,
} from 'vscode';
import { onDidChangeConfiguration } from '../utils/cacheInvalidation';
import {
  type CommandSource,
  findProjectRoot,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getCachedConfig } from '../utils/intlayerCache';
import { createOffsetToPosition } from '../utils/textPosition';
import {
  getRecentEditorServerOutput,
  isEditorServerRunning,
  showEditorServerLogs,
  startEditorServer,
  stopAllEditorServers,
  stopEditorServer,
} from './editorServerProcess';
import {
  type EditorServerStatus,
  getEditorFrameHtml,
  getEditorStatusHtml,
} from './getEditorPanelHtml';
import { type FocusedContent, revealFocusedField } from './revealFocusedField';

/** Context key gating the editor title button. */
const PANEL_AVAILABLE_CONTEXT_KEY = 'intlayer.isEditorPanelAvailable';

/** Time a reachability probe waits for the editor server. */
const PROBE_TIMEOUT = 1_500;
/** Delay between probes while the editor server starts. */
const STARTUP_POLL_INTERVAL = 1_500;
/**
 * Probes before giving up on a starting editor server (~2 min: the first run
 * may download `intlayer-editor`).
 */
const STARTUP_POLL_ATTEMPTS = 80;

/** Editor documentation, opened from the "editor disabled" screen. */
const EDITOR_DOCUMENTATION_URL = 'https://intlayer.org/doc/concept/editor';

/** What `intlayer-editor` prints when `editor.enabled` is false. */
const EDITOR_DISABLED_OUTPUT = 'Editor is not enabled';

/** Messages posted by the panel webviews. */
type PanelMessage =
  | { type: 'focusedContent'; data: FocusedContent | null }
  | { type: 'showLogs' }
  | { type: 'openConfiguration' }
  | { type: 'openDocumentation' }
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
  /** Screen shown: the editor, or a status screen. */
  view?: 'editor' | EditorServerStatus;
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

/**
 * Waits for the editor server the extension started to answer. Gives up early
 * when that process exits (e.g. its port is taken, or the setup is invalid).
 */
const waitForEditor = async (
  editorURL: string,
  projectDir: string
): Promise<boolean> => {
  for (let attempt = 0; attempt < STARTUP_POLL_ATTEMPTS; attempt++) {
    if (await isEditorReachable(editorURL)) return true;
    if (!isEditorServerRunning(projectDir)) return false;

    await new Promise((resolve) => setTimeout(resolve, STARTUP_POLL_INTERVAL));
  }

  return false;
};

type EditorSettings = {
  editorURL: string;
  /** `false` when the configuration disables the editor. */
  isEnabled: boolean;
};

/**
 * Editor settings of the project. Falls back to the defaults when the
 * configuration fails to load: the editor server then reports the issue.
 */
const getEditorSettings = async (
  projectDir: string
): Promise<EditorSettings> => {
  const configuration = await getCachedConfig(projectDir).catch(
    () => undefined
  );

  return {
    editorURL: configuration?.editor?.editorURL ?? EDITOR_URL,
    isEnabled: configuration?.editor?.enabled !== false,
  };
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

/**
 * Shows the editor in the panel. When it does not answer, its server is
 * started in the background and the panel shows the progress meanwhile.
 */
const renderPanel = async (state: PanelState): Promise<void> => {
  const { editorURL, isEnabled } = await getEditorSettings(state.projectDir);

  const showStatus = (status: EditorServerStatus) => {
    state.view = status;
    state.panel.webview.html = getEditorStatusHtml(
      editorURL,
      status,
      getRecentEditorServerOutput(state.projectDir)
    );
  };

  // Port-forwarded in remote workspaces
  const webviewEditorURL = (
    await env.asExternalUri(Uri.parse(editorURL))
  ).toString(true);

  const showEditor = () => {
    state.view = 'editor';
    state.panel.webview.html = getEditorFrameHtml(webviewEditorURL);
  };

  if (await isEditorReachable(editorURL)) {
    showEditor();
    return;
  }

  // The server would exit right away
  if (!isEnabled) {
    showStatus('disabled');
    return;
  }

  showStatus('starting');
  startEditorServer(state.projectDir);

  const isReady = await waitForEditor(editorURL, state.projectDir);

  // Closed or re-targeted meanwhile
  if (panelState !== state) return;

  if (isReady) {
    showEditor();
    return;
  }

  // Disabled by a value the extension could not read (e.g. env-dependent)
  const isDisabled = getRecentEditorServerOutput(state.projectDir).some(
    (line) => line.includes(EDITOR_DISABLED_OUTPUT)
  );

  showStatus(isDisabled ? 'disabled' : 'failed');
};

/** Opens the project configuration, on its `editor` property when present. */
const openConfiguration = async (state: PanelState): Promise<void> => {
  const { configurationFilePath } = searchConfigurationFile(state.projectDir);

  if (!configurationFilePath) return;

  const text = await readFile(configurationFilePath, 'utf8').catch(() => '');
  const editorPropertyOffset = text.search(/\beditor\s*:/);
  const position = createOffsetToPosition(text)(
    Math.max(editorPropertyOffset, 0)
  );

  await window.showTextDocument(Uri.file(configurationFilePath), {
    viewColumn: getContentFileColumn(state.panel),
    selection: new Range(
      position.line,
      position.character,
      position.line,
      position.character
    ),
  });
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
    case 'showLogs':
      showEditorServerLogs();
      return;
    case 'openConfiguration':
      await openConfiguration(state);
      return;
    case 'openDocumentation':
      await env.openExternal(Uri.parse(EDITOR_DOCUMENTATION_URL));
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

    // An editor the user started themselves keeps running
    stopEditorServer(projectDir);
  });

  return state;
};

/**
 * Opens the visual editor (`editor.editorURL`) in a panel beside the code,
 * starting its server for as long as the panel is open when none answers.
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
    onDidChangeConfiguration(() => {
      updateAvailability(window.activeTextEditor);

      // Pick up a fix (e.g. `editor.enabled` turned on) without a retry
      if (panelState?.view === 'disabled' || panelState?.view === 'failed') {
        void renderPanel(panelState);
      }
    }),
    {
      dispose: () => {
        panelState?.panel.dispose();
        stopAllEditorServers();
      },
    }
  );

  updateAvailability(window.activeTextEditor);
};
