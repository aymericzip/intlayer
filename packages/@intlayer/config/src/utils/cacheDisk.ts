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
import configPackageJson from '@intlayer/types/package.json' with {
  type: 'json',
};
import { type CacheKey, clearAllCache, computeKeyId } from './cacheMemory';

/** ------------------------- Persistence layer ------------------------- **/

/** Cache envelope structure stored on disk */
type CacheEnvelope = {
  /** Version of the config package (for cache invalidation) */
  version: string;
  /** Timestamp when the cache entry was created (in milliseconds) */
  timestamp: number;
  /** Data payload (the actual cached value) */
  data: unknown;
};

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

const cacheMap = new Map<string, any>();

export const cacheDisk = (
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
        typeof (maybeObj as any).version === 'string' &&
        typeof (maybeObj as any).timestamp === 'number' &&
        Object.hasOwn(maybeObj, 'data');

      if (isEnvelope) {
        const entry = maybeObj as CacheEnvelope;

        if (entry.version !== configPackageJson.version) {
          try {
            await unlink(filePath);
          } catch {}
          return undefined;
        }

        if (typeof maxTimeMs === 'number' && maxTimeMs > 0) {
          const age = Date.now() - entry.timestamp;
          if (age > maxTimeMs) {
            try {
              await unlink(filePath);
            } catch {}
            return undefined;
          }
        }

        value = entry.data;
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
      const envelope: CacheEnvelope = {
        version: configPackageJson.version,
        timestamp: Date.now(),
        data: value,
      };
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
      const cachedValue = cacheMap.get(id);
      if (cachedValue !== undefined) return true;

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
          typeof maybeObj.version === 'string' &&
          typeof maybeObj.timestamp === 'number' &&
          Object.hasOwn(maybeObj, 'data');

        if (isEnvelope) {
          const entry = maybeObj as CacheEnvelope;
          if (entry.version !== configPackageJson.version) return false;

          if (typeof maxTimeMs === 'number' && maxTimeMs > 0) {
            const age = Date.now() - entry.timestamp;
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
