
/** @type {import('tsdown').Options} */
export const commonOptions = {
  entry: [
    'src/**/*',
    '!src/**/*.test.*',
    '!src/**/_*',
    '!src/**/*.spec.*',
    '!src/**/__tests__/**',
  ],
  target: 'esnext',
  dts: false,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
  unbundle: true,
  minify: false,
  tsConfig: './tsconfig.json',
};

/** @type {import('tsdown').Options} */
export const cjsOptions = {
  ...commonOptions,
  format: ['cjs'],
  outDir: 'dist/cjs',
  fixedExtension: true,
};

/** @type {import('tsdown').Options} */
export const esmOptions = {
  ...commonOptions,
  format: ['esm'],
  outDir: 'dist/esm',
  fixedExtension: true,
};

/** @type {import('tsdown').Options} */
export const typesOptions = {
  ...commonOptions,
  outDir: 'dist/types',
  dts: {
    // oxc: true,
    emitDtsOnly: true,
  },
  outExtensions: () => ({
    dts: '.d.ts',
  }),
  tsconfig: './tsconfig.types.json',
};

/** @type {import('tsdown').Options[]} */
export const options = [cjsOptions, esmOptions, typesOptions];

/** @type {(options: { all?: Partial<import('tsdown').Options>, cjs?: Partial<import('tsdown').Options>, esm?: Partial<import('tsdown').Options>, types?: Partial<import('tsdown').Options> }) => import('tsdown').Options[]} */
export const getOptions = ({all: customOptions, cjs: cjsCustomOptions, esm: esmCustomOptions, types: typesCustomOptions}) => ([
  {
    ...esmOptions,
    ...customOptions ?? {},
    ...cjsCustomOptions ?? {},
  },
  {
    ...cjsOptions,
    ...customOptions ?? {},
    ...esmCustomOptions ?? {},
  },
  {
    ...typesOptions,
    ...customOptions ?? {},
    ...typesCustomOptions ?? {},
  },
])


