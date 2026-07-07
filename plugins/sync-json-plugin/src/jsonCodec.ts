import { loadExternalFile } from '@intlayer/config/file';
import type { FormatCodec, SyncContent } from '@intlayer/engine/syncPluginKit';

/**
 * JSON payload codec: standard JSON parsing, pretty-printed serialization
 * (2-space indentation, trailing newline).
 */
export const jsonCodec: FormatCodec = {
  parse: (raw) => JSON.parse(raw),
  serialize: (content) => `${JSON.stringify(content, null, 2)}\n`,
};

/**
 * Read one JSON source through `loadExternalFile`, which also supports JSON5,
 * JSONC and transpiled JS/TS message files. Returns `undefined` for missing or
 * unreadable files so callers fall back to empty content.
 */
export const readJSONEntry = async (
  absoluteFilePath: string
): Promise<SyncContent | undefined> =>
  await loadExternalFile(absoluteFilePath, { logError: false });
