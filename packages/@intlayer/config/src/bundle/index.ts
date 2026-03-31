import { exec } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { isAbsolute, join, resolve } from 'node:path';
import { promisify } from 'node:util';
import packageJSON from '@intlayer/types/package.json' with { type: 'json' };
import { type BuildOptions, build, type Plugin } from 'esbuild';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '../configFile/getConfiguration';
import { getConfigEnvVars } from '../envVars/envVars';
import { getAlias } from '../utils/alias';
import { BundleLogger } from './logBundle';

const execAsync = promisify(exec);

export const packageList = [
  'next-intlayer',
  'react-intlayer',
  'vue-intlayer',
  'svelte-intlayer',
  'preact-intlayer',
  'solid-intlayer',
  'angular-intlayer',
  'lit-intlayer',
  'express-intlayer',
  'hono-intlayer',
  'fastify-intlayer',
  'adonis-intlayer',
  'vanilla-intlayer',
  'intlayer',
] as const;

const defaultVersion = packageJSON.version;

export type BundleIntlayerOptions = {
  outfile?: string;
  configOptions?: GetConfigurationOptions;
  bundlePackages?: string[];
  version?: string;
} & BuildOptions;

/**
 * Bundle the application content using esbuild.
 * It uses the Intlayer configuration to set up aliases and other esbuild options.
 *
 * @param options - Bundle options including entryPoint, outfile, and esbuild options.
 * @returns The build result.
 */
export const bundleIntlayer = async (options: BundleIntlayerOptions) => {
  const {
    outfile = 'intlayer-bundle.js',
    configOptions,
    bundlePackages = [...packageList],
    version = defaultVersion,
    ...esbuildOptions
  } = options;

  const intlayerConfig = getConfiguration(configOptions);

  const logger = new BundleLogger(intlayerConfig);

  const alias = getAlias({
    configuration: intlayerConfig,
    formatter: (value: string) => resolve(process.cwd(), value),
  });

  // Fetch dictionaries and calculate tree-shaking variables

  const treeShakingDefines = getConfigEnvVars(
    intlayerConfig,
    (key) => `process.env.${key}`,
    (value) => `"${value}"` // Properly wraps the string in quotes
  );

  const intlayerBundlePlugin: Plugin = {
    name: 'intlayer-bundle-plugin',
    setup(build) {
      // Create a regex that matches the provided packages
      // It matches both the package name and any sub-exports
      const packagesRegex = new RegExp(
        `^(${bundlePackages
          .map((packages) => packages.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join('|')})(\\/.*)?$`
      );

      build.onResolve({ filter: packagesRegex }, () => ({
        external: false,
      }));

      // Also ensure @intlayer/ packages are bundled if not explicitly excluded
      build.onResolve({ filter: /^@intlayer\// }, () => ({
        external: false,
      }));
    },
  };

  const tempDir = join(intlayerConfig.system.tempDir, 'intlayer-bundle-tmp');

  logger.setStatus('installing');

  try {
    // Clean and prepare temp directory
    await rm(tempDir, { recursive: true, force: true });
    await mkdir(tempDir, { recursive: true });

    // Write package.json to fetch packages via npm/bun
    const deps = Object.fromEntries(
      bundlePackages.map((pkg) => [pkg, version])
    );
    await writeFile(
      join(tempDir, 'package.json'),
      JSON.stringify({ dependencies: deps, type: 'module' })
    );

    // Determine package manager (prefer bun if available)
    let pm = 'npm install';
    try {
      await execAsync('bun --version');
      pm = 'bun install';
    } catch {}

    // Install the packages in the temp directory
    await execAsync(pm, { cwd: tempDir });

    const absoluteOutfile = isAbsolute(outfile)
      ? outfile
      : join(process.cwd(), outfile);

    const buildOptions: BuildOptions = {
      bundle: true,
      outfile: absoluteOutfile,
      absWorkingDir: tempDir,
      platform: 'browser',
      conditions: ['browser', 'module', 'import', 'default'],
      minify: true,
      minifyIdentifiers: true,
      treeShaking: true,
      format: 'iife',
      ignoreAnnotations: true,
      stdin: {
        contents: bundlePackages
          .map((packageName) => {
            // Convert package name to global name (e.g. vanilla-intlayer -> VanillaIntlayer)
            const globalName = packageName
              .split('-')
              .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
              .join('');
            // Create a global variable for each package
            return `import * as ${globalName} from '${packageName}';\nif (typeof window !== 'undefined') { window['${globalName}'] = ${globalName}; }`;
          })
          .join('\n'),
        resolveDir: tempDir,
      },
      define: {
        'process.env': '{}', // Fix ReferenceError: process is not defined
        // Inject generated environment variables
        ...treeShakingDefines,
        ...esbuildOptions.define,
      },
      alias: {
        ...alias,
        ...esbuildOptions.alias,
      },
      ...esbuildOptions,
      plugins: [intlayerBundlePlugin, ...(esbuildOptions.plugins || [])],
    };

    logger.setStatus('bundling');
    const result = await build(buildOptions);
    logger.setStatus('success');
    return result;
  } catch (error) {
    logger.setError(error);
    throw error;
  } finally {
    // Clean up temp directory
    await rm(tempDir, { recursive: true, force: true });
  }
};
