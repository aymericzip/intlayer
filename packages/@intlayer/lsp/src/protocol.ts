/**
 * Custom notifications the Intlayer language server sends to its client, on
 * top of the standard LSP surface. Kept in a dedicated module so the client
 * (the VS Code extension host) can import the contract without pulling in the
 * server entry point, which opens a connection on import.
 */

/**
 * Raised when a document references Intlayer dictionaries but the project has
 * none built under `system.unmergedDictionariesDir`.
 *
 * Unmerged dictionaries are only written by a dev build, or by any build when
 * the visual editor is enabled — a production build cleans the directory
 * without rewriting it. With nothing to validate against, the server would
 * report every key as undeclared, so it stays silent and asks the client to
 * run the build instead.
 */
export const DICTIONARIES_NOT_BUILT_NOTIFICATION =
  'intlayer/dictionariesNotBuilt';

/** Payload of {@link DICTIONARIES_NOT_BUILT_NOTIFICATION}. */
export type DictionariesNotBuiltParams = {
  /** Root directory of the project whose dictionaries are missing. */
  baseDir: string;
};
