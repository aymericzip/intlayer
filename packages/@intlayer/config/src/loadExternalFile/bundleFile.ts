import { dirname, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  type BuildOptions,
  type BuildResult,
  build,
  buildSync,
  type Loader,
  type Plugin,
} from 'esbuild';

export type ESBuildPlugin = Plugin;

export const getLoader = (extension: string): Loader => {
  switch (extension) {
    case '.js':
      return 'js';
    case '.jsx':
      return 'jsx';
    case '.mjs':
      return 'js';
    case '.ts':
      return 'ts';
    case '.tsx':
      return 'tsx';
    case '.cjs':
      return 'js';
    case '.json':
      return 'json';
    case '.md':
      return 'text';
    case '.mdx':
      return 'text';
    default:
      return 'js';
  }
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
  target: 'node16',
  platform: 'neutral',
  write: false,
  packages: 'bundle',
  external: ['esbuild'],
  bundle: true,
  define: {
    'import.meta.url': JSON.stringify(pathToFileURL(filePath).href),
  },
});

export const bundleFileSync = (
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

export const bundleFile = async (
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
