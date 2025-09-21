import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { rename, rm, writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const hashFile = async (path: string) => {
  const h = createHash('sha256');
  const rs = createReadStream(path);
  rs.on('data', (chunk) => h.update(chunk));
  await new Promise<void>((res, rej) => {
    rs.on('end', () => res());
    rs.on('error', rej);
  });
  return h.digest('hex');
};

const isReadableStream = (value: unknown): value is Readable =>
  !!value &&
  typeof value === 'object' &&
  typeof (value as any).pipe === 'function';

export const writeFileIfChanged = async (
  path: string,
  dataOrStream: string | Buffer | Readable,
  { encoding = 'utf8' }: { encoding?: BufferEncoding } = {}
): Promise<boolean> => {
  // 1) write new content to temporary file (stream-safe)
  const tmp = `${path}.tmp`;

  if (isReadableStream(dataOrStream)) {
    await pipeline(dataOrStream, createWriteStream(tmp));
  } else {
    // dataOrStream = string | Buffer
    const buf = Buffer.isBuffer(dataOrStream)
      ? dataOrStream
      : Buffer.from(dataOrStream, encoding);
    await writeFile(tmp, buf);
  }

  // 2) if old file exists, compare hashes (streaming)
  let same = false;
  try {
    const [oldHash, newHash] = await Promise.all([
      hashFile(path),
      hashFile(tmp),
    ]);
    same = oldHash === newHash;
  } catch {
    // old file missing -> will replace
  }

  if (same) {
    await rm(tmp);
    return false; // no change
  }

  // 3) atomic replacement
  // On Unix, rename is atomic. On Windows, if file exists, we can delete it first.
  try {
    await rename(tmp, path);
  } catch {
    try {
      await rm(path);
    } catch {}
    await rename(tmp, path);
  }
  return true; // changed
};
