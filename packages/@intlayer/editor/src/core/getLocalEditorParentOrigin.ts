/** Hostnames of the local machine, as `URL.hostname` reports them. */
const LOOPBACK_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

const isLoopbackUrl = (url: string): boolean => {
  try {
    return LOOPBACK_HOSTNAMES.has(new URL(url).hostname);
  } catch {
    return false;
  }
};

/**
 * Origin of the parent frame to trust as the editor, when both it and the
 * configured `editorURL` are local. A local editor moves to the next free port
 * when its own is taken, so the `editorURL` baked into the app can miss it.
 *
 * @param editorURL - Configured editor URL.
 * @param parentOrigin - Origin of the frame embedding the app.
 * @returns The parent origin, or `undefined` when it must not be trusted.
 */
export const getLocalEditorParentOrigin = (
  editorURL: string | undefined,
  parentOrigin: string | undefined
): string | undefined => {
  if (!editorURL || !parentOrigin) return undefined;
  if (!isLoopbackUrl(editorURL) || !isLoopbackUrl(parentOrigin)) {
    return undefined;
  }

  return new URL(parentOrigin).origin;
};
