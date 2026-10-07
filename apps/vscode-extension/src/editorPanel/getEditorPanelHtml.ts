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

const createNonce = (): string => randomUUID().replace(/-/g, '');

/** State of the application the editor previews. */
export type ApplicationStatus = 'stopped' | 'starting' | 'running';

/** Message the extension posts to the editor webview. */
export type EditorFrameMessage = {
  type: 'applicationStatus';
  status: ApplicationStatus;
};

/**
 * Webview embedding the visual editor full-size. Field focus messages posted
 * by the editor (and only by it) are forwarded to the extension.
 *
 * A banner offers to start the application while it does not answer
 * (`applicationStatus` messages); the editor reloads once it does.
 *
 * @param editorURL - URL the webview reaches the editor at.
 * @param applicationURL - URL of the application previewed by the editor.
 */
export const getEditorFrameHtml = (
  editorURL: string,
  applicationURL?: string
): string => {
  const nonce = createNonce();
  const editorOrigin = new URL(editorURL).origin;
  const applicationLabel = applicationURL ?? 'its URL';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${escapeHtml(editorOrigin)}; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';" />
  <style nonce="${nonce}">
    html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
    body { display: flex; flex-direction: column; }
    iframe { display: block; flex: 1; width: 100%; border: 0; }
    .banner { display: flex; align-items: center; gap: 8px; padding: 6px 12px; font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editorWidget-background); border-bottom: 1px solid var(--vscode-panel-border); }
    .banner[hidden] { display: none; }
    .banner p { flex: 1; margin: 0; }
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
  <iframe src="${escapeHtml(editorURL)}" title="Intlayer visual editor" allow="clipboard-read; clipboard-write"></iframe>
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
  const { title, description, code, buttons } = getStatusView(
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
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${description ? `<p>${escapeHtml(description)}</p>` : ''}
  ${code ? `<pre>${escapeHtml(code)}</pre>` : ''}
  <div class="actions">${buttonsHtml}</div>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();

    for (const button of document.querySelectorAll('button[data-action]')) {
      button.addEventListener('click', () =>
        vscode.postMessage({ type: button.dataset.action })
      );
    }
  </script>
</body>
</html>`;
};
