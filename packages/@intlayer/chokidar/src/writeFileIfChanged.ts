import { createHash, randomBytes } from 'node:crypto';
import { createReadStream, rmSync } from 'node:fs';
import { chmod, mkdir, rename, rm, stat, writeFile } from 'node:fs/promises';
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

// Helper to hash existing file via stream
const getFileHash = (path: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const hash = createHash('sha256');
    const stream = createReadStream(path);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', () => resolve(null));
  });
};

export const writeFileIfChanged = async (
  path: string,
  data: string,
  {
    encoding = 'utf8',
    tempDir,
  }: { encoding?: BufferEncoding; tempDir?: string } = {}
): Promise<boolean> => {
  const newDataHash = createHash('sha256').update(data, encoding).digest('hex');
  const existingHash = await getFileHash(path);

  if (newDataHash === existingHash) {
    return false;
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
    let mode: number | undefined;
    try {
      mode = (await stat(path)).mode;
    } catch {}

    await writeFile(tempPath, data, { encoding });

    if (mode !== undefined) {
      await chmod(tempPath, mode);
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
