import { randomBytes } from 'node:crypto';
import { rmSync } from 'node:fs';
import {
  chmod,
  mkdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { basename, join } from 'node:path';

const activeTempFiles = new Set<string>();

// Synchronous cleanup on process exit
process.on('exit', () => {
  for (const file of activeTempFiles) {
    try {
      rmSync(file, { force: true });
    } catch {}
  }
});

/**
 * Permission bits a freshly created file receives on this system. Detected once
 * from the first temp file we actually write (`process.umask()` with no
 * argument is deprecated and thread-unsafe) and cached, so the atomic path can
 * skip restoring the mode whenever the source file already uses the default
 * mode — which is the case for essentially every generated file.
 */
let defaultFileMode: number | undefined;

/**
 * Options for {@link writeFileIfChanged}.
 */
export type WriteFileIfChangedOptions = {
  /** Encoding used to turn `data` into bytes. Defaults to `'utf8'`. */
  encoding?: BufferEncoding;
  /** Directory to hold the temporary file used for the atomic swap. */
  tempDir?: string;
  /**
   * Write atomically via a temp file + `rename` so readers never observe a
   * half-written file. This creates a fresh inode on every write, which roughly
   * doubles the cost of a changed write compared to overwriting in place. Set to
   * `false` for callers whose consumers tolerate torn reads to write directly.
   * Defaults to `true`.
   */
  atomic?: boolean;
};

/**
 * Write `data` to `path` only when it differs from the file already on disk,
 * preserving the existing file's permission mode.
 *
 * The whole file is read back and byte-compared because the files written here
 * (dictionaries, entry points, types) are small, so reading beats streaming a
 * hash. When the content is unchanged the write is skipped entirely, which both
 * avoids inode churn and prevents downstream watchers from rebuilding.
 *
 * @returns `true` when the file was written, `false` when it was already up to date.
 */
export const writeFileIfChanged = async (
  path: string,
  data: string,
  { encoding = 'utf8', tempDir, atomic = true }: WriteFileIfChangedOptions = {}
): Promise<boolean> => {
  const newData = Buffer.from(data, encoding);

  // Read the current content first: the common case is an unchanged file, and
  // this single read is the whole fast path (no stat/chmod needed to bail out).
  let existingData: Buffer | null = null;
  try {
    existingData = await readFile(path);
  } catch {}

  if (existingData?.equals(newData)) {
    return false;
  }

  // Fast path: overwrite in place. Truncating an existing file keeps its inode,
  // so its permission mode is preserved automatically (no chmod needed). This
  // skips the temp-file inode churn at the cost of exposing readers to a
  // partially written file.
  if (!atomic) {
    await writeFile(path, newData);
    return true;
  }

  // The atomic swap replaces the inode, so the existing mode is not preserved
  // and must be reapplied. Only a file that already exists has a mode to keep.
  let modeToRestore: number | undefined;
  if (existingData !== null) {
    try {
      modeToRestore = (await stat(path)).mode & 0o777;
    } catch {}
  }

  if (tempDir) {
    await mkdir(tempDir, { recursive: true });
  }

  const tempFileName = `${basename(path)}.${Date.now()}-${randomBytes(4).toString('hex')}.tmp`;
  const tempPath = tempDir
    ? join(tempDir, tempFileName)
    : `${path}.${tempFileName}`;
  activeTempFiles.add(tempPath);

  try {
    await writeFile(tempPath, newData);

    if (modeToRestore !== undefined) {
      // Learn the ambient default mode once from a real temp file, then only
      // chmod when the source file used a non-default mode.
      if (defaultFileMode === undefined) {
        try {
          defaultFileMode = (await stat(tempPath)).mode & 0o777;
        } catch {}
      }
      if (modeToRestore !== defaultFileMode) {
        await chmod(tempPath, modeToRestore);
      }
    }

    await rename(tempPath, path);
  } catch (error) {
    try {
      await rm(tempPath, { force: true });
    } catch {}
    throw error;
  } finally {
    activeTempFiles.delete(tempPath);
  }

  return true;
};
