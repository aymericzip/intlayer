import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { AssetPlugin } from './asset-plugin.mjs';

const cwd = process.cwd();

const packageJson = readFileSync(`${cwd}/package.json`, 'utf8');
const packageJsonObj = JSON.parse(packageJson);
const dependencies = packageJsonObj.dependencies;
const devDependencies = packageJsonObj.devDependencies;
const peerDependencies = packageJsonObj.peerDependencies;
const optionalDependencies = packageJsonObj.optionalDependencies;

const allDependencies = {
  ...dependencies,
  ...devDependencies,
  ...peerDependencies,
  ...optionalDependencies,
};

/** @type {(id: string) => boolean} */
export const isExternal = (id) => {
  // Externalize all dependencies like @intlayer/core, @intlayer/docs, etc.
  if (id in allDependencies) return true;

  // Externalize all builtin modules like fs, path, etc.
  if (id in builtinModules) return true;

  if (id.startsWith('node:')) return true;

  return false;
};

/** @type {import('tsdown').Options} */
export const commonOptions = {
  entry: [
    'src/**/*.{ts,tsx,js,jsx,mts,cts,vue,svelte,astro}',
    '!src/**/*.test.*',
    '!src/**/*.stories.*',
    '!src/**/_*',
    '!src/**/*.spec.*',
    '!src/**/__tests__/**',
  ],
  ignoreWatch: ['dist', 'node_modules'],
  target: 'esnext',
  dts: false,
  clean: process.env.NODE_ENV === 'production',
  sourcemap: true,
  platform: 'browser',
  unbundle: true,
  minify: false,
  fixedExtension: true,
  tsconfig: './tsconfig.json',
  // Externalize ALL bare imports (i.e., all packages)
  external: isExternal,
  plugins: [AssetPlugin()],
};

/** @type {import('tsdown').Options} */
export const cjsOptions = {
  ...commonOptions,
  format: ['cjs'],
  outDir: 'dist/cjs',
};

/** @type {import('tsdown').Options} */
export const esmOptions = {
  ...commonOptions,
  format: ['esm'],
  outDir: 'dist/esm',
};

/** @type {import('tsdown').Options} */
export const typesOptions = {
  ...commonOptions,
  outDir: 'dist/types',
  dts: {
    // oxc: true,
    emitDtsOnly: true,
    // Avoid inlining external type references which causes TS2742 in monorepos
    respectExternal: true,
  },
  outExtensions: () => ({
    dts: '.d.ts',
  }),
  tsconfig: './tsconfig.types.json',
};

/** @type {import('tsdown').Options[]} */
// ESM runs first to emit assets to dist/assets, then CJS and types reuse them
export const options = [esmOptions, cjsOptions, typesOptions];

/** @type {(options: { all?: Partial<import('tsdown').Options>, cjs?: Partial<import('tsdown').Options>, esm?: Partial<import('tsdown').Options>, types?: Partial<import('tsdown').Options> }) => import('tsdown').Options[]} */
export const getOptions = ({
  all: customOptions,
  cjs: cjsCustomOptions,
  esm: esmCustomOptions,
  types: typesCustomOptions,
}) => [
  {
    ...esmOptions,
    ...(customOptions ?? {}),
    ...(esmCustomOptions ?? {}),
  },
  {
    ...cjsOptions,
    ...(customOptions ?? {}),
    ...(cjsCustomOptions ?? {}),
  },
  {
    ...typesOptions,
    ...(customOptions ?? {}),
    ...(typesCustomOptions ?? {}),
  },
];
