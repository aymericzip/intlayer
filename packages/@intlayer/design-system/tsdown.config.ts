import svgr from '@svgr/rollup';
import { getOptions, SkipUnchangedOutputPlugin } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

// Plugin to inject React import into SVG files that use React.createElement
const injectReactPlugin = () => ({
  name: 'inject-react',
  renderChunk(code: string, chunk: { fileName: string }) {
    // Check if this is an SVG file and uses React.createElement
    if (
      chunk.fileName.match(/\.svg\.(mjs|js)$/) &&
      code.includes('React.createElement')
    ) {
      // Add React import at the top if not already present
      if (
        !code.includes('import React') &&
        !code.includes('from "react"') &&
        !code.includes("from 'react'")
      ) {
        const regionMatch = code.match(/^(\/\/#region [^\n]+\n)/);
        if (regionMatch) {
          // Insert after #region comment
          return code.replace(
            regionMatch[0],
            `${regionMatch[0]}import * as React from "react";\n`
          );
        }
        // Insert at the top
        return `import * as React from "react";\n${code}`;
      }
    }
    return null;
  },
});

const options: UserConfig[] = getOptions({
  all: {
    platform: 'neutral',
    unbundle: true,
    plugins: [
      svgr({
        // Good defaults for a design system
        svgo: true,
        icon: true, // scale to 1em
        exportType: 'default', // default export a React component
        jsxRuntime: 'classic', // Use classic runtime to ensure React import
        // ref: true,               // enable if you need refs
        // include/exclude if you want to limit where it runs:
        // include: '**/*.svg',
      }),
      injectReactPlugin(),
      SkipUnchangedOutputPlugin(),
    ],
  },
  types: {
    // Every package import stays bare (never a `node_modules` path of the
    // build machine). Local path aliases look like scoped packages, so they
    // are opted back in explicitly.
    deps: {
      neverBundle: true,
      alwaysBundle: [/^@(components|utils|libs|hooks|providers|api)\//, /^@\//],
    },
    // Provide TS compiler options to stabilize type resolution during d.ts emit
    dts: {
      // generator: 'oxc',
      emitDtsOnly: true,
      // Provide TS compiler options to stabilize type resolution during d.ts emit
      compilerOptions: {
        types: ['react', 'node'],
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
      },
    },
  },
});

const [esmOptions, _cjsOptions, typesOptions] = options;

export default defineConfig([esmOptions, typesOptions]);
