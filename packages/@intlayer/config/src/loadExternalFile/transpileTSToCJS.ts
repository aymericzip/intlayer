import { existsSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { type BuildOptions, type BuildResult, build, buildSync } from 'esbuild';
import { getPackageJsonPath } from '../utils/getPackageJsonPath';
import { getLoader } from './bundleFile';

export type TranspileOptions = BuildOptions & {
  /**
   * Optional custom esbuild instance to use for transpilation.
   * Useful in environments (e.g. VS Code extensions) where the bundled
   * esbuild binary may not match the host platform.
   * When provided, its `buildSync`/`build` methods are used instead of
   * the ones imported from the `esbuild` package.
   */
  esbuildInstance?: typeof import('esbuild');
};

const getTsConfigPath = (filePath: string): string | undefined => {
  const tsconfigPath = join(
    getPackageJsonPath(dirname(filePath)).baseDir,
    'tsconfig.json'
  );

  // Only return the tsconfig path if it exists
  return existsSync(tsconfigPath) ? tsconfigPath : undefined;
};

const getTransformationOptions = (filePath: string): BuildOptions => ({
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.cjs': 'js',
    '.json': 'json',
    '.md': 'text',
    '.mdx': 'text',
  },
  format: 'cjs',
  target: 'node20',
  platform: 'node',
  write: false,
  packages: 'external',
  bundle: true,
  tsconfig: getTsConfigPath(filePath),
  define: {
    'import.meta.url': JSON.stringify(pathToFileURL(filePath).href),
  },
});

export const transpileTSToCJSSync = (
  code: string,
  filePath: string,
  options?: TranspileOptions
): string | undefined => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const { esbuildInstance, ...buildOptions } = options ?? {};
  const esbuildBuildSync = esbuildInstance?.buildSync ?? buildSync;

  const moduleResult: BuildResult = esbuildBuildSync({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
      sourcefile: filePath, // Add sourcefile for better error messages
    },
    ...getTransformationOptions(filePath),
    ...buildOptions,
  });

  const moduleResultString = moduleResult.outputFiles?.[0].text;

  return moduleResultString;
};

export const transpileTSToCJS = async (
  code: string,
  filePath: string,
  options?: TranspileOptions
): Promise<string | undefined> => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const { esbuildInstance, ...buildOptions } = options ?? {};
  const esbuildBuild = esbuildInstance?.build ?? build;

  const moduleResult: BuildResult = await esbuildBuild({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
      sourcefile: filePath, // Add sourcefile for better error messages
    },
    ...getTransformationOptions(filePath),
    ...buildOptions,
  });

  const moduleResultString = moduleResult.outputFiles?.[0].text;

  return moduleResultString;
};
