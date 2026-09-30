import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import {
  type GetConfigurationOptions,
  searchConfigurationFile,
} from '@intlayer/config/node';
import { getSelectedEnvironment } from './envStore';
import { loadEnvFromWorkspace } from './loadEnvFromWorkspace';
import { backgroundLogFunctions, logFunctions, prefix } from './logFunctions';

type EnvironmentVariables = Record<string, string>;

/**
 * Env vars loaded per `${projectDir}:${environment}` (`undefined` when the
 * configuration reads none). Cleared by the workspace watchers when an env or
 * configuration file changes.
 */
const environmentVariablesCache = new Map<
  string,
  EnvironmentVariables | undefined
>();

/** Whether the project's configuration file reads environment variables. */
const configurationReadsEnvironment = (projectDir: string): boolean => {
  try {
    const { configurationFilePath } = searchConfigurationFile(projectDir);

    if (!configurationFilePath) return false;

    return /\bprocess\.env\b|\bimport\.meta\.env\b/.test(
      readFileSync(configurationFilePath, 'utf8')
    );
  } catch {
    return false;
  }
};

/**
 * Options shared by every configuration load: log to VS Code notifications,
 * resolve modules from the project, and prefer the project's own esbuild — it
 * carries the right platform binary, whereas the extension may ship another
 * platform's one.
 */
const createConfigurationOptions = (
  projectDir: string,
  extraOptions: Partial<GetConfigurationOptions> = {}
): GetConfigurationOptions => {
  const projectRequire = createRequire(join(projectDir, 'package.json'));

  const configurationOptions: GetConfigurationOptions = {
    baseDir: projectDir,
    override: { log: { prefix } },
    require: projectRequire,
    ...extraOptions,
  };

  try {
    (configurationOptions as Record<string, unknown>).buildOptions = {
      esbuildInstance: projectRequire('esbuild'),
    };
  } catch {
    // Project has no esbuild — fall back to the extension's bundled binary
  }

  return configurationOptions;
};

/** Synchronous variant, without env files — for the built config shim. */
export const getConfigurationOptionsSync = (
  projectDir: string
): GetConfigurationOptions =>
  createConfigurationOptions(projectDir, {
    logFunctions: backgroundLogFunctions,
  });

export const clearEnvironmentVariablesCache = (): void => {
  environmentVariablesCache.clear();
};

/** Env vars of the selected environment, when the configuration reads any. */
const getEnvironmentVariables = async (
  projectDir: string,
  logEnvFileName: boolean
): Promise<EnvironmentVariables | undefined> => {
  const environment = getSelectedEnvironment(projectDir);
  const cacheKey = `${projectDir}:${environment ?? 'default'}`;
  if (environmentVariablesCache.has(cacheKey)) {
    return environmentVariablesCache.get(cacheKey);
  }

  const variables = configurationReadsEnvironment(projectDir)
    ? await loadEnvFromWorkspace(projectDir, environment, logEnvFileName)
    : undefined;

  // Cached even when undefined, to skip re-reading the configuration file
  environmentVariablesCache.set(cacheKey, variables);

  return variables;
};

/**
 * Options to load a project's configuration with, including the env vars of
 * the environment selected for the project.
 *
 * @param options.isBackground - Not triggered by the user: only warnings and
 * errors notify, and the loaded env file is not announced.
 */
export const getConfigurationOptions = async (
  projectDir: string,
  options: { isBackground?: boolean } = {}
): Promise<GetConfigurationOptions> => {
  const additionalEnvVars = await getEnvironmentVariables(
    projectDir,
    !options.isBackground
  );

  return createConfigurationOptions(projectDir, {
    ...(additionalEnvVars && { additionalEnvVars }),
    logFunctions: options.isBackground ? backgroundLogFunctions : logFunctions,
    cache: false,
  });
};
