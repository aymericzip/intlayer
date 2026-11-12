import type { ServerLogEntry } from '../../hooks/useServerLog';

type FrameErrorLogParams = {
  applicationURL: string | undefined;
  isConnectionFailed: boolean;
  isApplicationEditorEnabled: boolean;
};

/**
 * Terminal message for the frame states the editor cannot work in, mirroring
 * the overlays shown in the UI. `undefined` while the frame is fine.
 */
export const getFrameErrorLogEntry = ({
  applicationURL,
  isConnectionFailed,
  isApplicationEditorEnabled,
}: FrameErrorLogParams): ServerLogEntry | undefined => {
  if (!applicationURL) {
    return {
      level: 'warn',
      message:
        'No application to edit: set `editor.applicationURL` in intlayer.config.ts (e.g. http://localhost:3000), then restart the editor.',
    };
  }

  if (!isConnectionFailed) return undefined;

  if (!isApplicationEditorEnabled) {
    return {
      level: 'error',
      message: `${applicationURL} did not connect to the editor: the visual editor is disabled in its configuration. Set \`editor.enabled: true\` in intlayer.config.ts, then restart the application.`,
    };
  }

  // Every frame embedding the editor (e.g. an IDE webview) must be allowed too
  const frameAncestorOrigins = [
    ...new Set([
      window.location.origin,
      ...Array.from(window.location.ancestorOrigins ?? []),
    ]),
  ].join(' ');

  return {
    level: 'error',
    message: `${applicationURL} did not connect to the editor. Check that its Content-Security-Policy \`frame-ancestors\` (or \`X-Frame-Options\`) allows ${frameAncestorOrigins}, and that the page renders the Intlayer provider of your framework.`,
  };
};
