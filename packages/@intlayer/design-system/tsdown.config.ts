import svgr from '@svgr/rollup';
import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const options: Options[] = getOptions({
  all: {
    platform: 'neutral',
    plugins: [
      svgr({
        // Good defaults for a design system
        svgo: true,
        icon: true, // scale to 1em
        exportType: 'default', // default export a React component
        jsxRuntime: 'automatic', // no need to import React
        // ref: true,               // enable if you need refs
        // include/exclude if you want to limit where it runs:
        // include: '**/*.svg',
      }),
    ],
  },
  types: {
    // Provide TS compiler options to stabilize type resolution during d.ts emit
    dts: {
      // oxc: true,
      emitDtsOnly: true,
      // Provide TS compiler options to stabilize type resolution during d.ts emit
      compilerOptions: {
        preserveSymlinks: true,
        types: ['react', 'node'],
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
      },
    },
  },
});

const [esmOptions, _cjsOptions, typesOptions] = options;

export default defineConfig([esmOptions, typesOptions]);
