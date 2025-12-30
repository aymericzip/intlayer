import { existsSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  type BuildOptions,
  type BuildResult,
  build,
  buildSync,
  type Plugin,
} from 'esbuild';
import { getPackageJsonPath } from '..';
import { getLoader } from './bundleFile';

export type ESBuildPlugin = Plugin;

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

export const transpileTSToMJSSync = (
  code: string,
  filePath: string,
  options?: BuildOptions
): string | undefined => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const moduleResult: BuildResult = buildSync({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
      sourcefile: filePath, // Add sourcefile for better error messages
    },
    ...getTransformationOptions(filePath),
    ...options,
  });

  const moduleResultString = moduleResult.outputFiles?.[0].text;

  return moduleResultString;
};

export const transpileTSToMJS = async (
  code: string,
  filePath: string,
  options?: BuildOptions
): Promise<string | undefined> => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const moduleResult: BuildResult = await build({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
      sourcefile: filePath, // Add sourcefile for better error messages
    },
    ...getTransformationOptions(filePath),
    ...options,
  });

  const moduleResultString = moduleResult.outputFiles?.[0].text;

  return moduleResultString;
};
