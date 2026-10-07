import { randomUUID } from 'node:crypto';

/** Escapes a value interpolated into HTML text or attributes. */
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * `MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED` of `@intlayer/editor`, inlined:
 * importing the package would bundle its browser editor client.
 */
const FOCUSED_CONTENT_CHANGED_MESSAGE = 'INTLAYER_FOCUSED_CONTENT_CHANGED';

/** `MessageKey.INTLAYER_HOST_THEME_CHANGED` of `@intlayer/editor`, inlined. */
const HOST_THEME_CHANGED_MESSAGE = 'INTLAYER_HOST_THEME_CHANGED';

/** Colour theme of the IDE, applied to the editor. */
export type EditorTheme = 'light' | 'dark';

/**
 * Query parameter of the editor client showing a browser bar around the
 * application frame: the webview has no address bar to navigate it with.
 */
const BROWSER_QUERY_PARAMETER = 'browser';

/** Query parameter of the editor client giving its theme on the first paint. */
const THEME_QUERY_PARAMETER = 'theme';

/** Editor URL the webview frames, with the browser bar and the IDE theme. */
const getEditorFrameURL = (editorURL: string, theme?: EditorTheme): string => {
  const url = new URL(editorURL);

  url.searchParams.set(BROWSER_QUERY_PARAMETER, 'true');

  if (theme) url.searchParams.set(THEME_QUERY_PARAMETER, theme);

  return url.toString();
};

/**
 * Scale of the framed editor: zoomed out so the dictionary panel and the
 * application both fit in an IDE pane.
 */
const EDITOR_FRAME_SCALE = 0.8;

const createNonce = (): string => randomUUID().replace(/-/g, '');

/** State of the application the editor previews. */
export type ApplicationStatus = 'stopped' | 'starting' | 'running';

/** Message the extension posts to the editor webview. */
export type EditorFrameMessage = {
  type: 'applicationStatus';
  status: ApplicationStatus;
};

/**
 * Webview embedding the visual editor, zoomed out to fill the pane, with its
 * browser bar to navigate the application. Field focus messages posted
 * by the editor (and only by it) are forwarded to the extension.
 *
 * A banner offers to start the application while it does not answer
 * (`applicationStatus` messages); the editor reloads once it does.
 *
 * The editor follows the IDE theme: given on load, then posted on each change
 * of the webview body class (`vscode-light`, `vscode-dark`, …).
 *
 * @param editorURL - URL the webview reaches the editor at.
 * @param applicationURL - URL of the application previewed by the editor.
 * @param theme - IDE theme when the panel renders.
 */
export const getEditorFrameHtml = (
  editorURL: string,
  applicationURL?: string,
  theme?: EditorTheme
): string => {
  const nonce = createNonce();
  const editorOrigin = new URL(editorURL).origin;
  const editorFrameURL = getEditorFrameURL(editorURL, theme);
  const applicationLabel = applicationURL ?? 'its URL';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${escapeHtml(editorOrigin)}; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';" />
  <style nonce="${nonce}">
    html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
    body { display: flex; flex-direction: column; }
    .frame { position: relative; flex: 1; overflow: hidden; }
    iframe { position: absolute; top: 0; left: 0; width: ${100 / EDITOR_FRAME_SCALE}%; height: ${100 / EDITOR_FRAME_SCALE}%; border: 0; transform: scale(${EDITOR_FRAME_SCALE}); transform-origin: 0 0; }
    .banner { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 6px 12px; font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editorWidget-background); border-bottom: 1px solid var(--vscode-panel-border); }
    .banner[hidden] { display: none; }
    .banner p { flex: 1 1 200px; min-width: 0; margin: 0; overflow-wrap: anywhere; }
    button { padding: 4px 12px; border: 0; border-radius: 2px; font: inherit; color: var(--vscode-button-foreground); background: var(--vscode-button-background); cursor: pointer; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button:disabled { opacity: 0.6; cursor: default; }
  </style>
</head>
<body>
  <div class="banner" hidden>
    <p>The application is not running at ${escapeHtml(applicationLabel)}.</p>
    <button data-action="startApplication">Start the app</button>
  </div>
  <div class="frame">
    <iframe src="${escapeHtml(editorFrameURL)}" title="Intlayer visual editor" allow="clipboard-read; clipboard-write"></iframe>
  </div>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const editorOrigin = ${JSON.stringify(editorOrigin)};
    const banner = document.querySelector('.banner');
    const bannerText = banner.querySelector('p');
    const startButton = banner.querySelector('button');
    const iframe = document.querySelector('iframe');
    let applicationStatus = 'running';

    startButton.addEventListener('click', () =>
      vscode.postMessage({ type: 'startApplication' })
    );

    const getTheme = () =>
      document.body.classList.contains('vscode-light') ||
      document.body.classList.contains('vscode-high-contrast-light')
        ? 'light'
        : 'dark';

    const postTheme = () =>
      iframe.contentWindow?.postMessage(
        { type: ${JSON.stringify(HOST_THEME_CHANGED_MESSAGE)}, theme: getTheme() },
        editorOrigin
      );

    // Also on load: the editor may have reloaded since the last change
    iframe.addEventListener('load', postTheme);
    new MutationObserver(postTheme).observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('message', (event) => {
      // Posted by the extension, never by the embedded editor
      if (
        event.data?.type === 'applicationStatus' &&
        event.source !== iframe.contentWindow
      ) {
        const { status } = event.data;

        // Reconnect the editor to the application that just started
        if (status === 'running' && applicationStatus !== 'running') {
          iframe.src = iframe.src;
        }

        applicationStatus = status;
        banner.hidden = status === 'running';
        startButton.disabled = status === 'starting';
        startButton.textContent = status === 'starting' ? 'Starting…' : 'Start the app';
        bannerText.textContent = status === 'starting'
          ? 'Starting the application…'
          : 'The application is not running at ' + ${JSON.stringify(applicationLabel)} + '.';
        return;
      }

      if (event.origin !== editorOrigin) return;
      if (event.data?.type !== ${JSON.stringify(FOCUSED_CONTENT_CHANGED_MESSAGE)}) return;

      vscode.postMessage({ type: 'focusedContent', data: event.data.data ?? null });
    });
  </script>
</body>
</html>`;
};

/** Message the extension posts to the status webview. */
export type EditorStatusMessage = {
  /** Last output of the starting editor server. */
  type: 'startingOutput';
  lines: string[];
};

/** State of an editor server that does not answer yet. */
export type EditorServerStatus = 'starting' | 'failed' | 'disabled';

/** Action a status screen button posts to the extension. */
type StatusAction =
  | 'retry'
  | 'showLogs'
  | 'openConfiguration'
  | 'openDocumentation';

type StatusButton = {
  action: StatusAction;
  label: string;
  isPrimary?: boolean;
};

type StatusView = {
  title: string;
  /** Shows a spinner above the title. */
  isLoading?: boolean;
  description?: string;
  /** Preformatted block: a configuration snippet or the editor output. */
  code?: string;
  buttons: StatusButton[];
};

/** Configuration snippet enabling the editor outside production. */
const ENABLE_EDITOR_SNIPPET = `editor: {
  enabled: process.env.NODE_ENV !== 'production',
},`;

const getStatusView = (
  editorURL: string,
  status: EditorServerStatus,
  outputLines: string[]
): StatusView => {
  switch (status) {
    case 'starting':
      return {
        title: 'Starting the visual editor…',
        isLoading: true,
        buttons: [{ action: 'showLogs', label: 'Show logs' }],
      };
    case 'disabled':
      return {
        title: 'The visual editor is disabled for this project',
        description: 'Enable it in your Intlayer configuration:',
        code: ENABLE_EDITOR_SNIPPET,
        buttons: [
          {
            action: 'openConfiguration',
            label: 'Open configuration',
            isPrimary: true,
          },
          { action: 'retry', label: 'Retry' },
          { action: 'openDocumentation', label: 'Documentation' },
        ],
      };
    case 'failed':
      return {
        title: `The visual editor could not be reached at ${editorURL}`,
        code: outputLines.length > 0 ? outputLines.join('\n') : undefined,
        buttons: [
          { action: 'retry', label: 'Retry', isPrimary: true },
          { action: 'showLogs', label: 'Show logs' },
        ],
      };
  }
};

/**
 * Webview shown instead of the editor while its server starts, after it failed
 * to, or when the project configuration disables it.
 *
 * @param editorURL - URL the editor is expected at.
 * @param outputLines - Last editor server output, shown when it failed.
 */
export const getEditorStatusHtml = (
  editorURL: string,
  status: EditorServerStatus,
  outputLines: string[] = []
): string => {
  const nonce = createNonce();
  const { title, isLoading, description, code, buttons } = getStatusView(
    editorURL,
    status,
    outputLines
  );
  const buttonsHtml = buttons
    .map(
      ({ action, label, isPrimary }) =>
        `<button data-action="${action}"${isPrimary ? '' : ' class="secondary"'}>${escapeHtml(label)}</button>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';" />
  <style nonce="${nonce}">
    body { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; height: 100vh; margin: 0; padding: 0 16px; box-sizing: border-box; font-family: var(--vscode-font-family); color: var(--vscode-foreground); text-align: center; }
    h1 { margin: 0; font-size: 1.1em; font-weight: 600; }
    p { margin: 0; color: var(--vscode-descriptionForeground); }
    pre { max-width: 100%; margin: 0; padding: 8px 12px; overflow: auto; text-align: start; white-space: pre-wrap; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); background: var(--vscode-textCodeBlock-background); border-radius: 4px; }
    .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
    button { padding: 4px 12px; border: 0; border-radius: 2px; font: inherit; color: var(--vscode-button-foreground); background: var(--vscode-button-background); cursor: pointer; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button.secondary { color: var(--vscode-button-secondaryForeground); background: var(--vscode-button-secondaryBackground); }
    pre.output { max-height: 40vh; color: var(--vscode-descriptionForeground); }
    .spinner { width: 24px; height: 24px; border: 2px solid var(--vscode-panel-border); border-top-color: var(--vscode-progressBar-background); border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2.4s; } }
  </style>
</head>
<body>
  ${isLoading ? '<div class="spinner" role="progressbar" aria-label="Loading"></div>' : ''}
  <h1>${escapeHtml(title)}</h1>
  ${description ? `<p>${escapeHtml(description)}</p>` : ''}
  ${code ? `<pre>${escapeHtml(code)}</pre>` : ''}
  ${isLoading ? '<pre class="output" hidden></pre>' : ''}
  <div class="actions">${buttonsHtml}</div>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const output = document.querySelector('pre.output');

    // Live output of the starting server, so a stuck start is explained
    window.addEventListener('message', (event) => {
      if (!output || event.data?.type !== 'startingOutput') return;

      const lines = event.data.lines ?? [];

      output.hidden = lines.length === 0;
      output.textContent = lines.join('\n');
    });

    for (const button of document.querySelectorAll('button[data-action]')) {
      button.addEventListener('click', () =>
        vscode.postMessage({ type: button.dataset.action })
      );
    }
  </script>
</body>
</html>`;
};
