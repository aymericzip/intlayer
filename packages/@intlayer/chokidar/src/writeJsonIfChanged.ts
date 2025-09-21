import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

// Optional: stringify stable (avoid variations in order)
const normalize = (value: unknown): unknown => {
  if (value === null) return null;
  if (typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(normalize);
  const obj = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj).sort()) {
    result[key] = normalize(obj[key]);
  }
  return result;
};

const stableStringify = (value: unknown): string =>
  JSON.stringify(normalize(value));

export const writeJsonIfChanged = async <T>(
  path: string,
  data: T,
  { stable = true, pretty = process.env.NODE_ENV === 'development' } = {}
): Promise<boolean> => {
  const json = stable ? stableStringify(data) : JSON.stringify(data);
  const formatted = pretty ? JSON.stringify(JSON.parse(json), null, 2) : json; // pretty optional
  const newBuf = Buffer.from(formatted);

  // Ensure target directory exists
  await mkdir(dirname(path), { recursive: true });

  try {
    const oldBuf = await readFile(path);
    if (oldBuf.length === newBuf.length && oldBuf.equals(newBuf)) {
      return false; // no change → no write
    }
  } catch (e) {
    // file absent → on write
  }

  // atomic write
  const tmp = `${path}.tmp`;
  await writeFile(tmp, newBuf);
  await rename(tmp, path);
  return true; // written
};
