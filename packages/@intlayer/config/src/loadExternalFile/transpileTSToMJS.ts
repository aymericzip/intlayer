import { dirname, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  type BuildOptions,
  type BuildResult,
  build,
  buildSync,
  type Plugin,
} from 'esbuild';
import { getLoader } from './bundleFile';
import { tsPathsPlugin } from './resolveTSAliases';

export type ESBuildPlugin = Plugin;

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
  tsconfig: join(process.cwd(), 'tsconfig.json'),
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
