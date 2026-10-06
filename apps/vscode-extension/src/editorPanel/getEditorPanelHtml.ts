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

/**
 * Webview embedding the visual editor full-size. Field focus messages posted
 * by the editor (and only by it) are forwarded to the extension.
 *
 * @param editorURL - URL the webview reaches the editor at.
 */
export const getEditorFrameHtml = (editorURL: string): string => {
  const nonce = createNonce();
  const editorOrigin = new URL(editorURL).origin;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${escapeHtml(editorOrigin)}; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';" />
  <style nonce="${nonce}">
    html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
    iframe { display: block; width: 100%; height: 100%; border: 0; }
  </style>
</head>
<body>
  <iframe src="${escapeHtml(editorURL)}" title="Intlayer visual editor" allow="clipboard-read; clipboard-write"></iframe>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const editorOrigin = ${JSON.stringify(editorOrigin)};

    window.addEventListener('message', (event) => {
      if (event.origin !== editorOrigin) return;
      if (event.data?.type !== ${JSON.stringify(FOCUSED_CONTENT_CHANGED_MESSAGE)}) return;

      vscode.postMessage({ type: 'focusedContent', data: event.data.data ?? null });
    });
  </script>
</body>
</html>`;
};

/**
 * Webview shown while the editor server does not answer, offering to start it.
 *
 * @param editorURL - URL the editor was expected at.
 * @param isStarting - The server was started and is being waited for.
 */
export const getEditorUnreachableHtml = (
  editorURL: string,
  isStarting: boolean
): string => {
  const nonce = createNonce();
  const statusText = isStarting
    ? 'Starting the visual editor…'
    : `The visual editor is not running at ${editorURL}.`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';" />
  <style nonce="${nonce}">
    body { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; height: 100vh; margin: 0; font-family: var(--vscode-font-family); color: var(--vscode-foreground); text-align: center; }
    p { margin: 0; color: var(--vscode-descriptionForeground); }
    .actions { display: flex; gap: 8px; }
    button { padding: 4px 12px; border: 0; border-radius: 2px; font: inherit; color: var(--vscode-button-foreground); background: var(--vscode-button-background); cursor: pointer; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button.secondary { color: var(--vscode-button-secondaryForeground); background: var(--vscode-button-secondaryBackground); }
    button:disabled { opacity: 0.5; cursor: default; }
  </style>
</head>
<body>
  <p>${escapeHtml(statusText)}</p>
  <div class="actions">
    <button data-action="startEditor" ${isStarting ? 'disabled' : ''}>Start visual editor</button>
    <button data-action="retry" class="secondary">Retry</button>
  </div>
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
