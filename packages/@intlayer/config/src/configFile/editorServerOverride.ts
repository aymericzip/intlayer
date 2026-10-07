import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Port of the `intlayer-editor` server, set by `intlayer-editor start --with`
 * on the application it starts. Turns the editor on for that application and
 * points `editor.editorURL` at the server, without touching the configuration
 * file.
 */
export const EDITOR_SERVER_PORT_ENV_VAR = 'INTLAYER_EDITOR_SERVER_PORT';

/** Hostnames `editor.editorURL` may name the local editor server with. */
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]']);

/**
 * `editor.editorURL` adapted to the port the local editor server listens on,
 * which differs from `editor.port` when that one is taken.
 *
 * @returns The adapted URL, or `undefined` when the URL already targets that
 * port or names another host (e.g. a proxy) that cannot be adapted.
 */
export const getEditorURLForPort = (
  editorURL: string | undefined,
  port: number
): string | undefined => {
  const localEditorURL = `http://localhost:${port}`;

  if (!editorURL) return localEditorURL;

  let parsedEditorURL: URL;

  try {
    parsedEditorURL = new URL(editorURL);
  } catch {
    return localEditorURL;
  }

  if (!LOCAL_HOSTNAMES.has(parsedEditorURL.hostname)) return undefined;

  const editorPort =
    parsedEditorURL.port ||
    (parsedEditorURL.protocol === 'https:' ? '443' : '80');

  if (editorPort === String(port)) return undefined;

  parsedEditorURL.port = String(port);

  // `URL` adds a trailing slash to a bare origin
  return editorURL.endsWith('/')
    ? parsedEditorURL.href
    : parsedEditorURL.href.replace(/\/$/, '');
};

/**
 * Applies {@link EDITOR_SERVER_PORT_ENV_VAR}: enables the editor and adapts
 * its URL and port to the running editor server.
 *
 * @returns The configuration unchanged when the variable is not set.
 */
export const applyEditorServerOverride = (
  configuration: IntlayerConfig,
  environment: NodeJS.ProcessEnv = process.env
): IntlayerConfig => {
  const editorServerPort = Number(environment[EDITOR_SERVER_PORT_ENV_VAR]);

  if (!Number.isInteger(editorServerPort) || editorServerPort <= 0) {
    return configuration;
  }

  return {
    ...configuration,
    editor: {
      ...configuration.editor,
      enabled: true,
      port: editorServerPort,
      editorURL:
        getEditorURLForPort(configuration.editor.editorURL, editorServerPort) ??
        configuration.editor.editorURL,
    },
  };
};
