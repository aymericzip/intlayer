import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  type BuildOptions,
  type BuildResult,
  buildSync,
  context,
} from 'esbuild';
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
    'import.meta.env': 'process.env',
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

  // esbuild's worker thread service calls `new Worker(__filename, …)` on first use.
  // In Vite's SSR module runner the SSR-optimised chunk is ESM and __filename is
  // never declared (confirmed: accessing it throws ReferenceError, not undefined).
  // Because there is no local declaration the bare `__filename` lookup falls
  // through to globalThis, so we set it there to esbuild's own CJS entry-point –
  // the exact path esbuild would use if it were loaded in a normal CJS context.
  //
  // IMPORTANT: We save/restore the globals so this temporary shim does not leak
  // to other Vite plugins (e.g. `@vitejs/plugin-react-swc`) that check
  // `typeof __dirname !== "undefined"` to locate their own assets.
  const g = globalThis as Record<string, unknown>;
  const hadFilename = typeof g.__filename === 'string';
  const prevFilename = g.__filename;
  const prevDirname = g.__dirname;

  if (!hadFilename) {
    try {
      const _require = createRequire(import.meta.url);
      const esbuildEntry = _require.resolve('esbuild');
      g.__filename = esbuildEntry;
      g.__dirname = dirname(esbuildEntry);
    } catch {
      // Best-effort: if esbuild can't be resolved the caller's catch handles it
    }
  }

  let moduleResult: BuildResult;
  try {
    moduleResult = esbuildBuildSync({
      stdin: {
        contents: code,
        loader,
        resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
        sourcefile: filePath, // Add sourcefile for better error messages
      },
      ...getTransformationOptions(filePath),
      ...buildOptions,
    });
  } finally {
    // Always restore the previous values so the globals don't linger.
    if (!hadFilename) {
      if (prevFilename === undefined) {
        delete g.__filename;
      } else {
        g.__filename = prevFilename;
      }
      if (prevDirname === undefined) {
        delete g.__dirname;
      } else {
        g.__dirname = prevDirname;
      }
    }
  }

  const moduleResultString = moduleResult!.outputFiles?.[0]?.text;

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
  // Use context() + rebuild() + dispose() so esbuild deterministically releases
  // Go-subprocess resources for each one-shot transpilation, preventing them
  // from accumulating between rapid HMR-driven file changes.
  const esbuildContext = esbuildInstance?.context ?? context;

  const ctx = await esbuildContext({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath),
      sourcefile: filePath,
    },
    ...getTransformationOptions(filePath),
    ...buildOptions,
  });

  try {
    const moduleResult = await ctx.rebuild();
    return moduleResult.outputFiles?.[0].text;
  } finally {
    await ctx.dispose();
  }
};
