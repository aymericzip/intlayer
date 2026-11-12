/**
 * Line `intlayer-editor` prints once listening. Its port differs from
 * `editor.port` when that one is taken.
 */
const EDITOR_RUNNING_AT_PATTERN = /Editor running at:\s+(https?:\/\/\S+)/;

/**
 * URL the editor server announces in its (color-stripped) output.
 *
 * @returns The URL, or `undefined` when the output does not announce it.
 */
export const parseEditorServerUrl = (output: string): string | undefined =>
  EDITOR_RUNNING_AT_PATTERN.exec(output)?.[1];
