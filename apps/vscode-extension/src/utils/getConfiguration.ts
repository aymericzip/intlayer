import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import {
  type GetConfigurationOptions,
  searchConfigurationFile,
} from '@intlayer/config/node';
import { getSelectedEnvironment } from './envStore';
import { loadEnvFromWorkspace } from './loadEnvFromWorkspace';
import { prefix } from './logFunctions';

// --- Cache Definition ---
interface EnvCacheEntry {
  data: Record<string, string> | undefined;
  timestamp: number;
}

// Cache key will be `${projectDir}:${envName}`
const envCache = new Map<string, EnvCacheEntry>();
const ENV_CACHE_TTL = 10 * 60 * 1000; // 10min

/**
 * Checks if the Intlayer configuration file contains usage of environment variables.
 * It looks for "process.env" or "import.meta.env".
 */
const checkConfigFileForEnvUsage = (projectDir: string): boolean => {
  try {
    const result = searchConfigurationFile(projectDir);

    if (
      result?.configurationFilePath &&
      existsSync(result.configurationFilePath)
    ) {
      const content = readFileSync(result.configurationFilePath, 'utf8');
      // Regex to check for process.env or import.meta.env
      if (/\bprocess\.env\b|\bimport\.meta\.env\b/.test(content)) {
        return true;
      }
    }
  } catch {
    // If search or read fails, assume false
    return false;
  }

  return false;
};

export const getConfigurationOptionsSync = (
  projectDir: string
): GetConfigurationOptions => {
  const projectRequire = createRequire(join(projectDir, 'package.json'));

  const configOptions: GetConfigurationOptions = {
    baseDir: projectDir,
    override: {
      log: {
        prefix,
      },
    },
    require: projectRequire,
  };

  // Try to use the project's own esbuild instance (which has the correct
  // platform-specific binary). This fixes config loading on Windows when the
  // extension was built on macOS and only ships the darwin binary.
  // buildOptions.esbuildInstance is available in @intlayer/config >= 8.4.2
  try {
    const projectEsbuild = projectRequire('esbuild');
    (configOptions as Record<string, unknown>).buildOptions = {
      esbuildInstance: projectEsbuild,
    };
  } catch {
    // Project doesn't have esbuild — fall back to the extension's bundled binary
  }

  return configOptions;
};

export const clearConfigurationCache = (projectDir: string): void => {
  for (const key of envCache.keys()) {
    if (key.startsWith(`${projectDir}:`)) {
      envCache.delete(key);
    }
  }
};

export const getConfigurationOptions = async (
  projectDir: string,
  logEnvFileName: boolean = true
): Promise<GetConfigurationOptions> => {
  const env = getSelectedEnvironment(projectDir);
  const cacheKey = `${projectDir}:${env || 'default'}`;
  const now = Date.now();

  let additionalEnvVars: Record<string, string> | undefined;

  // Check Cache
  const cached = envCache.get(cacheKey);
  if (cached && now - cached.timestamp < ENV_CACHE_TTL) {
    additionalEnvVars = cached.data;
  } else {
    // Check if Config uses Env Vars
    const hasEnvUsage = checkConfigFileForEnvUsage(projectDir);

    if (hasEnvUsage) {
      // Load Fresh Env Vars if needed
      additionalEnvVars = await loadEnvFromWorkspace(
        projectDir,
        env,
        logEnvFileName
      );
    }

    // Update Cache (store undefined if not loaded, to avoid re-checking)
    envCache.set(cacheKey, {
      data: additionalEnvVars,
      timestamp: now,
    });
  }

  const projectRequire = createRequire(join(projectDir, 'package.json'));

  const configOptions: GetConfigurationOptions = {
    baseDir: projectDir,
    override: {
      log: {
        prefix,
      },
    },
    ...(additionalEnvVars && { additionalEnvVars }),
    require: projectRequire,
    cache: false,
  };

  // Try to use the project's own esbuild instance (which has the correct
  // platform-specific binary). This fixes config loading on Windows when the
  // extension was built on macOS and only ships the darwin binary.
  // buildOptions.esbuildInstance is available in @intlayer/config >= 8.4.2
  try {
    const projectEsbuild = projectRequire('esbuild');
    (configOptions as Record<string, unknown>).buildOptions = {
      esbuildInstance: projectEsbuild,
    };
  } catch {
    // Project doesn't have esbuild — fall back to the extension's bundled binary
  }

  return configOptions;
};
