import { createHash, type Hash } from 'node:crypto';
import {
  mkdir,
  readFile,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { deserialize, serialize } from 'node:v8';
import { gunzipSync, gzipSync } from 'node:zlib';
import type { IntlayerConfig } from '@intlayer/types';
import configPackageJson from '../../package.json' with { type: 'json' };

/** ------------------------- Utilities ------------------------- **/

/** Prefer a fast non-crypto hash if available, then fast crypto, then sha256. */
const pickHashAlgorithm = (): string => {
  try {
    // Node 20+ supports xxhash64 (very fast). We feature-detect at module load.
    createHash('xxhash64').update('test').digest();
    return 'xxhash64';
  } catch {}
  try {
    // sha1 is faster than sha256 and sufficient for cache keys.
    createHash('sha1').update('test').digest();
    return 'sha1';
  } catch {}

  return 'sha256';
};
const HASH_ALGORITHM = pickHashAlgorithm();

/** Base64url without padding for compact, file-system-safe ids. */
const toBase64Url = (buffer: Buffer): string =>
  buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

/** Token helpers to minimize collisions while streaming to the hasher. */
const token = {
  start: (hasher: Hash, tag: string) => hasher.update(`<${tag}>`),
  sep: (hasher: Hash) => hasher.update('|'),
  end: (hasher: Hash, tag: string) => hasher.update(`</${tag}>`),
  str: (hasher: Hash, stringValue: string) => {
    // length prefix to avoid ambiguity: len#value
    hasher.update(`${stringValue.length}#`);
    hasher.update(stringValue);
  },
  num: (hasher: Hash, numberValue: number) =>
    hasher.update(
      Number.isNaN(numberValue)
        ? 'NaN'
        : numberValue === Infinity
          ? 'Inf'
          : numberValue === -Infinity
            ? '-Inf'
            : String(numberValue)
    ),
  big: (hasher: Hash, bigintValue: bigint) =>
    hasher.update(bigintValue.toString(10)),
  bool: (hasher: Hash, booleanValue: boolean) =>
    hasher.update(booleanValue ? '1' : '0'),
};

/** ------------------- Canonical, streaming hasher ------------------- **/

type Seen = WeakSet<object>;

/**
 * Streams a canonical representation of `value` into `hasher` without
 * constructing large intermediate strings. Objects/Maps/Sets are normalized.
 */
const stableHashValue = (hasher: Hash, value: unknown, seen: Seen): void => {
  const valueType = typeof value;

  if (value === null) {
    token.start(hasher, 'null');
    token.end(hasher, 'null');
    return;
  }

  if (valueType === 'undefined') {
    token.start(hasher, 'undef');
    token.end(hasher, 'undef');
    return;
  }

  if (valueType === 'number') {
    token.start(hasher, 'num');
    token.num(hasher, value as number);
    token.end(hasher, 'num');
    return;
  }

  if (valueType === 'bigint') {
    token.start(hasher, 'big');
    token.big(hasher, value as bigint);
    token.end(hasher, 'big');
    return;
  }

  if (valueType === 'boolean') {
    token.start(hasher, 'bool');
    token.bool(hasher, value as boolean);
    token.end(hasher, 'bool');
    return;
  }

  if (valueType === 'string') {
    token.start(hasher, 'str');
    token.str(hasher, value as string);
    token.end(hasher, 'str');
    return;
  }

  if (valueType === 'symbol') {
    token.start(hasher, 'sym');
    token.str(hasher, String(value));
    token.end(hasher, 'sym');
    return;
  }

  if (valueType === 'function') {
    // Stable-ish fingerprint: name and arity (avoid source text).
    const functionValue = value as Function;
    token.start(hasher, 'fn');
    token.str(hasher, functionValue.name ?? '');
    token.sep(hasher);
    token.num(hasher, functionValue.length);
    token.end(hasher, 'fn');
    return;
  }

  // Arrays and typed arrays
  if (Array.isArray(value)) {
    if (seen.has(value)) {
      token.start(hasher, 'arr');
      token.str(hasher, 'Circular');
      token.end(hasher, 'arr');
      return;
    }
    seen.add(value);
    token.start(hasher, 'arr');
    for (let i = 0; i < value.length; i++) {
      token.sep(hasher);
      stableHashValue(hasher, value[i], seen);
    }
    token.end(hasher, 'arr');
    seen.delete(value);
    return;
  }

  // Node/Builtins
  if (value instanceof Date) {
    token.start(hasher, 'date');
    token.str(hasher, (value as Date).toISOString());
    token.end(hasher, 'date');
    return;
  }

  if (value instanceof RegExp) {
    const regex = value as RegExp;
    token.start(hasher, 're');
    token.str(hasher, regex.source);
    token.sep(hasher);
    token.str(hasher, regex.flags);
    token.end(hasher, 're');
    return;
  }

  if (value instanceof Set) {
    const setValue = value as Set<unknown>;
    if (seen.has(setValue)) {
      token.start(hasher, 'set');
      token.str(hasher, 'Circular');
      token.end(hasher, 'set');
      return;
    }
    seen.add(setValue);
    // Normalize by item fingerprints (strings) to sort deterministically.
    const items: string[] = [];
    for (const v of setValue) items.push(stableStringify(v)); // small, bounded use of stringify
    items.sort();
    token.start(hasher, 'set');
    for (const item of items) {
      token.sep(hasher);
      token.str(hasher, item);
    }
    token.end(hasher, 'set');
    seen.delete(setValue);
    return;
  }

  if (value instanceof Map) {
    const mapObject = value as Map<unknown, unknown>;
    if (seen.has(mapObject)) {
      token.start(hasher, 'map');
      token.str(hasher, 'Circular');
      token.end(hasher, 'map');
      return;
    }
    seen.add(mapObject);
    // Normalize by sorted key fingerprints.
    const entries: Array<[string, unknown]> = [];
    for (const [k, v] of mapObject.entries())
      entries.push([stableStringify(k), v]);
    entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    token.start(hasher, 'map');
    for (const [keyFingerprint, entryValue] of entries) {
      token.sep(hasher);
      token.str(hasher, keyFingerprint);
      token.sep(hasher);
      stableHashValue(hasher, entryValue, seen);
    }
    token.end(hasher, 'map');
    seen.delete(mapObject);
    return;
  }

  // ArrayBuffer & typed arrays
  if (ArrayBuffer.isView(value)) {
    const view = value as ArrayBufferView;
    token.start(hasher, 'typed');
    token.str(hasher, Object.getPrototypeOf(view).constructor.name);
    token.sep(hasher);
    hasher.update(Buffer.from(view.buffer, view.byteOffset, view.byteLength));
    token.end(hasher, 'typed');
    return;
  }
  if (value instanceof ArrayBuffer) {
    const buffer = Buffer.from(value as ArrayBuffer);
    token.start(hasher, 'ab');
    hasher.update(buffer);
    token.end(hasher, 'ab');
    return;
  }

  // URL
  if (typeof URL !== 'undefined' && value instanceof URL) {
    token.start(hasher, 'url');
    token.str(hasher, (value as URL).toString());
    token.end(hasher, 'url');
    return;
  }

  // Errors
  if (value instanceof Error) {
    const errorValue = value as Error;
    token.start(hasher, 'err');
    token.str(hasher, errorValue.name || '');
    token.sep(hasher);
    token.str(hasher, errorValue.message || '');
    token.sep(hasher);
    token.str(hasher, errorValue.stack || '');
    token.end(hasher, 'err');
    return;
  }

  // Generic objects
  if (valueType === 'object') {
    const objectValue = value as Record<string, unknown>;
    if (seen.has(objectValue)) {
      token.start(hasher, 'obj');
      token.str(hasher, 'Circular');
      token.end(hasher, 'obj');
      return;
    }
    seen.add(objectValue);

    const keys = Object.keys(objectValue).sort();
    token.start(hasher, 'obj');
    for (const key of keys) {
      token.sep(hasher);
      token.str(hasher, key);
      token.sep(hasher);
      stableHashValue(hasher, (objectValue as any)[key], seen);
    }
    token.end(hasher, 'obj');

    seen.delete(objectValue);
    return;
  }

  // Fallback
  token.start(hasher, 'other');
  token.str(hasher, String(value));
  token.end(hasher, 'other');
};

/** Public stringify kept for convenience / debugging (now faster & broader). */
export const stableStringify = (
  value: unknown,
  _stack = new WeakSet<object>()
): string => {
  const hasher = createHash(HASH_ALGORITHM);
  stableHashValue(hasher, value, _stack);
  return toBase64Url(hasher.digest());
};

/** Compute a compact, stable id for arbitrary key tuples. */
const computeKeyId = (keyParts: unknown[]): string => {
  const h = createHash(HASH_ALGORITHM);
  token.start(h, 'keys');
  for (let i = 0; i < keyParts.length; i++) {
    token.sep(h);
    stableHashValue(h, keyParts[i], new WeakSet());
  }
  token.end(h, 'keys');
  return toBase64Url(h.digest());
};

/** ------------------------- In-memory cache ------------------------- **/

type CacheKey = unknown;
const cacheMap = new Map<string, any>();

export const getCache = <T>(...key: CacheKey[]): T | undefined => {
  return cacheMap.get(computeKeyId(key));
};

type CacheSetArgs<T> = [...keys: CacheKey[], value: T];

export const setCache = <T>(...args: CacheSetArgs<T>): void => {
  const value = args[args.length - 1] as T;
  const key = args.slice(0, -1) as CacheKey[];
  cacheMap.set(computeKeyId(key), value);
};

export const clearCache = (idOrKey: string): void => {
  // Accept either our computed id or a legacy string id the caller already computed.
  cacheMap.delete(idOrKey);
};

export const clearAllCache = (): void => {
  cacheMap.clear();
};

export const cache = {
  get: getCache,
  set: setCache,
  clear: clearCache,
};

/** ------------------------- Persistence layer ------------------------- **/

type LocalCacheOptions = {
  /** Preferred new option name */
  persistent?: boolean;
  /** Time-to-live in ms; if expired, disk entry is ignored. */
  ttlMs?: number;
  /** Max age in ms based on stored creation timestamp; invalidates on exceed. */
  maxTimeMs?: number;
  /** Optional namespace to separate different logical caches. */
  namespace?: string;
  /** Gzip values on disk (on by default for blobs > 1KB). */
  compress?: boolean;
};

const DEFAULTS: Required<Pick<LocalCacheOptions, 'compress'>> = {
  compress: true,
};

const ensureDir = async (dir: string) => {
  await mkdir(dir, { recursive: true });
};

const atomicWriteFile = async (file: string, data: Buffer) => {
  const tmp = `${file}.tmp-${process.pid}-${Math.random().toString(36).slice(2)}`;
  await writeFile(tmp, data);
  await rename(tmp, file);
};

const shouldUseCompression = (buf: Buffer, force?: boolean) =>
  force === true || (force !== false && buf.byteLength > 1024);

/** Derive on-disk path from config dir + namespace + key id. */
const cachePath = (cacheDir: string, id: string, ns?: string) =>
  join(cacheDir, ns ? join(ns, id) : id);

/** ------------------------- Local cache facade ------------------------- **/

export const localCache = (
  intlayerConfig: IntlayerConfig,
  keys: CacheKey[],
  options?: LocalCacheOptions
) => {
  const { cacheDir } = intlayerConfig.content;
  const buildCacheEnabled = intlayerConfig.build.cache ?? true;
  const persistent =
    options?.persistent === true ||
    (typeof options?.persistent === 'undefined' && buildCacheEnabled);

  const { compress, ttlMs, maxTimeMs, namespace } = {
    ...DEFAULTS,
    ...options,
  };

  // single stable id for this key tuple (works for both memory & disk)
  const id = computeKeyId(keys);
  const filePath = cachePath(cacheDir, id, namespace);

  const readFromDisk = async (): Promise<unknown | undefined> => {
    try {
      const statValue = await stat(filePath).catch(() => undefined);

      if (!statValue) return undefined;

      if (typeof ttlMs === 'number' && ttlMs > 0) {
        const age = Date.now() - statValue.mtimeMs;
        if (age > ttlMs) return undefined;
      }
      let raw = await readFile(filePath);
      // header: 1 byte flag (0x00 raw, 0x01 gzip)
      const flag = raw[0];

      raw = raw.subarray(1);

      const payload = flag === 0x01 ? gunzipSync(raw) : raw;
      const deserialized = deserialize(payload) as unknown;

      let value: unknown;
      const maybeObj = deserialized as Record<string, unknown> | null;
      const isEnvelope =
        !!maybeObj &&
        typeof maybeObj === 'object' &&
        typeof (maybeObj as any).v === 'string' &&
        typeof (maybeObj as any).ts === 'number' &&
        Object.hasOwn(maybeObj, 'd');

      if (isEnvelope) {
        const entry = maybeObj as { v: string; ts: number; d: unknown };

        if (entry.v !== configPackageJson.version) {
          try {
            await unlink(filePath);
          } catch {}
          return undefined;
        }

        if (typeof maxTimeMs === 'number' && maxTimeMs > 0) {
          const age = Date.now() - entry.ts;
          if (age > maxTimeMs) {
            try {
              await unlink(filePath);
            } catch {}
            return undefined;
          }
        }

        value = entry.d;
      } else {
        // Backward compatibility: old entries had raw serialized value.
        if (typeof maxTimeMs === 'number' && maxTimeMs > 0) {
          const age = Date.now() - statValue.mtimeMs;
          if (age > maxTimeMs) {
            try {
              await unlink(filePath);
            } catch {}
            return undefined;
          }
        }
        value = deserialized;
      }

      // hydrate memory cache as well
      cacheMap.set(id, value);
      return value;
    } catch {
      return undefined;
    }
  };

  const writeToDisk = async (value: unknown) => {
    try {
      await ensureDir(dirname(filePath));
      const envelope = {
        v: configPackageJson.version,
        ts: Date.now(),
        d: value,
      } as const;
      const payload = Buffer.from(serialize(envelope));

      const gz = shouldUseCompression(payload, compress)
        ? gzipSync(payload)
        : payload;

      // prepend a 1-byte header indicating compression
      const buf = Buffer.concat([
        Buffer.from([gz === payload ? 0x00 : 0x01]),
        gz,
      ]);

      await atomicWriteFile(filePath, buf);
    } catch {
      // swallow disk errors for cache writes
    }
  };

  return {
    /** In-memory first, then disk (if enabled), otherwise undefined. */
    get: async <T>(): Promise<T | undefined> => {
      const mem = cacheMap.get(id);

      if (mem !== undefined) return mem as T;

      if (persistent && buildCacheEnabled) {
        return (await readFromDisk()) as T | undefined;
      }
      return undefined;
    },
    /** Sets in-memory (always) and persists to disk if enabled. */
    set: async (value: unknown): Promise<void> => {
      cacheMap.set(id, value);

      if (persistent && buildCacheEnabled) {
        await writeToDisk(value);
      }
    },
    /** Clears only this entry from memory and disk. */
    clear: async (): Promise<void> => {
      cacheMap.delete(id);

      try {
        await unlink(filePath);
      } catch {}
    },
    /** Clears ALL cached entries (memory Map and entire cacheDir namespace if persistent). */
    clearAll: async (): Promise<void> => {
      clearAllCache();
      if (persistent && buildCacheEnabled) {
        // remove only the current namespace (if provided), else the root dir
        const base = namespace ? join(cacheDir, namespace) : cacheDir;

        try {
          await rm(base, { recursive: true, force: true });
        } catch {}

        try {
          await mkdir(base, { recursive: true });
        } catch {}
      }
    },
    /** Expose the computed id (useful if you want to key other structures). */
    isValid: async (): Promise<boolean> => {
      const mem = cacheMap.get(id);
      if (mem !== undefined) return true;

      // If persistence is disabled or build cache disabled, only memory can be valid
      if (!persistent || !buildCacheEnabled) return false;

      try {
        const statValue = await stat(filePath).catch(() => undefined);
        if (!statValue) return false;

        if (typeof ttlMs === 'number' && ttlMs > 0) {
          const age = Date.now() - statValue.mtimeMs;
          if (age > ttlMs) return false;
        }

        let raw = await readFile(filePath);
        const flag = raw[0];
        raw = raw.subarray(1);
        const payload = flag === 0x01 ? gunzipSync(raw) : raw;
        const deserialized = deserialize(payload) as unknown;

        const maybeObj = deserialized as Record<string, unknown> | null;
        const isEnvelope =
          !!maybeObj &&
          typeof maybeObj === 'object' &&
          typeof (maybeObj as any).v === 'string' &&
          typeof (maybeObj as any).ts === 'number' &&
          Object.hasOwn(maybeObj, 'd');

        if (isEnvelope) {
          const entry = maybeObj as { v: string; ts: number; d: unknown };
          if (entry.v !== configPackageJson.version) return false;
          if (typeof maxTimeMs === 'number' && maxTimeMs > 0) {
            const age = Date.now() - entry.ts;
            if (age > maxTimeMs) return false;
          }
          return true;
        }

        if (typeof maxTimeMs === 'number' && maxTimeMs > 0) {
          const age = Date.now() - statValue.mtimeMs;
          if (age > maxTimeMs) return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    /** Expose the computed id (useful if you want to key other structures). */
    id,
    /** Expose the absolute file path for debugging. */
    filePath,
  };
};
