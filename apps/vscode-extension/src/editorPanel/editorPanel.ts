import { realpathSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { EDITOR_URL } from '@intlayer/config/defaultValues';
import { searchConfigurationFile } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  ColorThemeKind,
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
import { isApplicationRunning, startApplication } from './applicationProcess';
import {
  adaptBuiltEditorConfiguration,
  getEditorServerUrl,
  getRecentEditorServerOutput,
  isEditorServerRunning,
  showEditorServerLogs,
  startEditorServer,
  stopAllEditorServers,
  stopEditorServer,
} from './editorServerProcess';
import {
  type ApplicationStatus,
  type EditorFrameMessage,
  type EditorServerStatus,
  type EditorStatusMessage,
  type EditorTheme,
  getEditorFrameHtml,
  getEditorStatusHtml,
} from './getEditorPanelHtml';
import { type FocusedContent, revealFocusedField } from './revealFocusedField';

/** Light or dark, as the editor themes itself, for the active IDE theme. */
const getEditorTheme = (): EditorTheme =>
  window.activeColorTheme.kind === ColorThemeKind.Light ||
  window.activeColorTheme.kind === ColorThemeKind.HighContrastLight
    ? 'light'
    : 'dark';

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

/** Delay between application reachability probes while the editor shows. */
const APPLICATION_POLL_INTERVAL = 3_000;
/** Time after which a started application that never answered is stopped. */
const APPLICATION_STARTUP_TIMEOUT = 120_000;

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
  | { type: 'retry' }
  | { type: 'startApplication' };

const isPanelMessage = (message: unknown): message is PanelMessage =>
  typeof message === 'object' &&
  message !== null &&
  typeof (message as PanelMessage).type === 'string';

type PanelState = {
  panel: WebviewPanel;
  projectDir: string;
  /** Version of the extension, which the started editor is aligned with. */
  extensionVersion: string;
  /** Last focused content revealed, to skip repeated focus messages. */
  lastFocusedContentKey?: string;
  /** Screen shown: the editor, or a status screen. */
  view?: 'editor' | EditorServerStatus;
  /** URL of the application previewed by the editor, when configured. */
  applicationURL?: string;
  /** URL of the editor server shown, once it answered. */
  editorServerURL?: string;
  /** Project configuration, unless it failed to load. */
  configuration?: IntlayerConfig;
  /** Time "Start the app" was clicked, until the application answers. */
  applicationStartedAt?: number;
  /** Probes the application while the editor shows. */
  applicationPollTimer?: ReturnType<typeof setInterval>;
};

let panelState: PanelState | undefined;

/** Part of the `/api/config` response of `intlayer-editor` read here. */
type EditorConfigurationResponse = {
  data?: { system?: { baseDir?: string } } | null;
};

/** Whether two paths name the same directory, through symlinks. */
const isSameDirectory = (firstPath: string, secondPath: string): boolean => {
  const resolvePath = (path: string): string => {
    try {
      return realpathSync.native(path);
    } catch {
      return path;
    }
  };

  return relative(resolvePath(firstPath), resolvePath(secondPath)) === '';
};

/**
 * Configuration served by the visual editor at the URL.
 *
 * @returns `undefined` when no editor answers there.
 */
const fetchEditorConfiguration = async (
  editorURL: string
): Promise<EditorConfigurationResponse['data'] | undefined> => {
  try {
    const response = await fetch(new URL('/api/config', editorURL), {
      signal: AbortSignal.timeout(PROBE_TIMEOUT),
    });

    if (!response.ok) return undefined;

    const { data } = (await response.json()) as EditorConfigurationResponse;

    return data ?? null;
  } catch {
    return undefined;
  }
};

/**
 * Whether the URL serves the visual editor of this project: the port may be
 * held by another project's editor, or by an unrelated server.
 */
const isProjectEditor = async (
  editorURL: string,
  projectDir: string
): Promise<boolean> => {
  const baseDir = (await fetchEditorConfiguration(editorURL))?.system?.baseDir;

  return baseDir !== undefined && isSameDirectory(baseDir, projectDir);
};

/**
 * Waits for the editor server the extension started to answer, at the URL it
 * announces (its port shifts when the configured one is taken). Gives up early
 * when that process exits (e.g. the setup is invalid).
 *
 * The announced URL is served by that very process, so any editor answering
 * there is accepted: its `baseDir` may legitimately differ from the project
 * directory (configuration at a monorepo root, symlinked paths).
 *
 * @param onPoll - Called on each attempt, to report the progress.
 * @returns The editor URL, or `undefined` when it never answered.
 */
const waitForEditor = async (
  projectDir: string,
  onPoll: () => void
): Promise<string | undefined> => {
  for (let attempt = 0; attempt < STARTUP_POLL_ATTEMPTS; attempt++) {
    onPoll();

    const editorServerUrl = getEditorServerUrl(projectDir);

    if (
      editorServerUrl !== undefined &&
      (await fetchEditorConfiguration(editorServerUrl)) !== undefined
    ) {
      return editorServerUrl;
    }

    if (!isEditorServerRunning(projectDir)) return undefined;

    await new Promise((resolve) => setTimeout(resolve, STARTUP_POLL_INTERVAL));
  }

  return undefined;
};

type EditorSettings = {
  editorURL: string;
  applicationURL?: string;
  /** Project configuration, unless it failed to load. */
  configuration?: IntlayerConfig;
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
    applicationURL: configuration?.editor?.applicationURL || undefined,
    configuration,
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

/** Stops probing the application. */
const stopApplicationPolling = (state: PanelState): void => {
  clearInterval(state.applicationPollTimer);
  state.applicationPollTimer = undefined;
};

/**
 * Probes the application and posts its status to the editor webview, which
 * offers to start it while it does not answer.
 */
const updateApplicationStatus = async (state: PanelState): Promise<void> => {
  if (!state.applicationURL) return;

  const isRunning = await isApplicationRunning(state.applicationURL);

  // Its dev server rebuilt the configuration on start: adapt it again before
  // the editor reloads the frame
  if (isRunning && state.applicationStartedAt !== undefined) {
    await adaptEditorConfigurationToServer(state);
  }

  if (
    isRunning ||
    Date.now() - (state.applicationStartedAt ?? 0) > APPLICATION_STARTUP_TIMEOUT
  ) {
    state.applicationStartedAt = undefined;
  }

  const status: ApplicationStatus = isRunning
    ? 'running'
    : state.applicationStartedAt === undefined
      ? 'stopped'
      : 'starting';

  // Posted on every probe: a message sent before the webview loads is lost
  void state.panel.webview.postMessage({
    type: 'applicationStatus',
    status,
  } satisfies EditorFrameMessage);
};

/** Probes the application periodically, starting right away. */
const startApplicationPolling = (state: PanelState): void => {
  stopApplicationPolling(state);

  if (!state.applicationURL) return;

  void updateApplicationStatus(state);
  state.applicationPollTimer = setInterval(
    () => void updateApplicationStatus(state),
    APPLICATION_POLL_INTERVAL
  );
};

/**
 * Points the built configuration at the editor server shown, so the
 * application loads the editor client and connects to it.
 */
const adaptEditorConfigurationToServer = async (
  state: PanelState
): Promise<void> => {
  if (!state.configuration || !state.editorServerURL) return;

  await adaptBuiltEditorConfiguration(
    state.projectDir,
    state.configuration,
    state.editorServerURL
  );
};

/** Runs the application `dev` (else `start`) script, from the editor banner. */
const handleStartApplication = async (state: PanelState): Promise<void> => {
  // The configuration may have been rebuilt since the editor showed
  await adaptEditorConfigurationToServer(state);

  const isStarted = await startApplication(
    state.projectDir,
    state.editorServerURL
  );

  if (!isStarted) {
    void window.showErrorMessage(
      'Intlayer: no "dev" or "start" script found in the package.json of the project.'
    );
    return;
  }

  state.applicationStartedAt = Date.now();
  await updateApplicationStatus(state);
};

/**
 * Shows the editor in the panel. When it does not answer, its server is
 * started in the background and the panel shows the progress meanwhile.
 */
const renderPanel = async (state: PanelState): Promise<void> => {
  const { editorURL, applicationURL, configuration } = await getEditorSettings(
    state.projectDir
  );

  state.applicationURL = applicationURL;
  state.configuration = configuration;

  const showStatus = (status: EditorServerStatus) => {
    stopApplicationPolling(state);
    state.view = status;
    state.panel.webview.html = getEditorStatusHtml(
      editorURL,
      status,
      getRecentEditorServerOutput(state.projectDir)
    );
  };

  const showEditor = async (servedEditorURL: string) => {
    // Port-forwarded in remote workspaces
    const webviewEditorURL = (
      await env.asExternalUri(Uri.parse(servedEditorURL))
    ).toString(true);

    state.view = 'editor';
    state.editorServerURL = servedEditorURL;
    state.panel.webview.html = getEditorFrameHtml(
      webviewEditorURL,
      applicationURL,
      getEditorTheme()
    );
    startApplicationPolling(state);
  };

  // Started earlier by the extension, or by the user
  const runningEditorURL = getEditorServerUrl(state.projectDir) ?? editorURL;

  if (await isProjectEditor(runningEditorURL, state.projectDir)) {
    if (configuration) {
      await adaptBuiltEditorConfiguration(
        state.projectDir,
        configuration,
        runningEditorURL
      );
    }

    await showEditor(runningEditorURL);
    return;
  }

  showStatus('starting');

  if (configuration) {
    await adaptBuiltEditorConfiguration(state.projectDir, configuration);
  }

  startEditorServer(state.projectDir, state.extensionVersion);

  const startedEditorURL = await waitForEditor(state.projectDir, () => {
    // Posted on every attempt: a message sent before the webview loads is lost
    void state.panel.webview.postMessage({
      type: 'startingOutput',
      lines: getRecentEditorServerOutput(state.projectDir),
    } satisfies EditorStatusMessage);
  });

  // Closed or re-targeted meanwhile
  if (panelState !== state) return;

  if (startedEditorURL) {
    if (configuration) {
      await adaptBuiltEditorConfiguration(
        state.projectDir,
        configuration,
        startedEditorURL
      );
    }

    await showEditor(startedEditorURL);
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
    case 'startApplication':
      await handleStartApplication(state);
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

  const state: PanelState = {
    panel,
    projectDir,
    extensionVersion: context.extension.packageJSON.version,
  };

  panel.webview.onDidReceiveMessage((message: unknown) => {
    if (isPanelMessage(message)) void handlePanelMessage(state, message);
  });
  panel.onDidDispose(() => {
    if (panelState === state) panelState = undefined;

    stopApplicationPolling(state);

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
