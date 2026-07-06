import { existsSync, statSync } from 'node:fs';
import dotenv from 'dotenv';

const DEFAULT_ENV = process.env.NODE_ENV ?? 'development';

export type LoadEnvFileOptions = {
  env?: string;
  envFile?: string;
};

export const getEnvFilePath = (
  env: string = process.env.NODE_ENV ?? 'development',
  envFile?: string
): string | undefined => {
  const envFiles = envFile
    ? [envFile]
    : [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'];

  return envFiles.find(existsSync); // Returns the first existing env file
};

type EnvFileCacheEntry = {
  /** The env file that was resolved and parsed (undefined if none exists). */
  envFilePath: string | undefined;
  /** Fingerprint of the parsed file, used to detect edits. */
  mtimeMs: number;
  size: number;
  /** The parsed env variables. */
  parsedEnv: Record<string, string>;
};

/**
 * Cache of parsed env files keyed by `cwd|env|envFile`. Loading content
 * declarations calls `loadEnvFile` once per file; without this every call pays
 * up to 4 `existsSync` probes plus a dotenv read+parse. A cached hit is
 * validated with a single `stat` so edits to the env file are still picked up.
 */
const envFileCache = new Map<string, EnvFileCacheEntry>();

const parseEnvFile = (envFilePath: string): Record<string, string> => {
  const parsedEnv: Record<string, string> = {};

  dotenv.config({
    path: envFilePath,
    processEnv: parsedEnv,
    quiet: true,
  });

  return parsedEnv;
};

export const loadEnvFile = (
  options?: Partial<LoadEnvFileOptions>
): Record<string, string> => {
  const env = options?.env ?? DEFAULT_ENV;

  // Env file candidates are resolved relative to the working directory
  const cacheKey = `${process.cwd()}|${env}|${options?.envFile ?? ''}`;

  const cachedEntry = envFileCache.get(cacheKey);

  if (cachedEntry) {
    if (cachedEntry.envFilePath === undefined) {
      // No env file existed. Re-probe cheaply in case one was created since.
      const envFilePath = getEnvFilePath(env, options?.envFile);
      if (!envFilePath) return cachedEntry.parsedEnv;
    } else {
      try {
        const stats = statSync(cachedEntry.envFilePath);
        if (
          stats.mtimeMs === cachedEntry.mtimeMs &&
          stats.size === cachedEntry.size
        ) {
          return cachedEntry.parsedEnv;
        }
      } catch {
        // File was removed — fall through and re-resolve
      }
    }
  }

  const envFilePath = getEnvFilePath(env, options?.envFile);

  if (!envFilePath) {
    envFileCache.set(cacheKey, {
      envFilePath: undefined,
      mtimeMs: 0,
      size: 0,
      parsedEnv: {},
    });
    return {};
  }

  const parsedEnv = parseEnvFile(envFilePath);

  try {
    const stats = statSync(envFilePath);
    envFileCache.set(cacheKey, {
      envFilePath,
      mtimeMs: stats.mtimeMs,
      size: stats.size,
      parsedEnv,
    });
  } catch {
    // Race: file removed between parse and stat — skip caching this round
  }

  return parsedEnv; // Return the parsed env object
};
