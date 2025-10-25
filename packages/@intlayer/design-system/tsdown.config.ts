import svgr from '@svgr/rollup';
import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

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

const options: Options[] = getOptions({
  all: {
    platform: 'neutral',
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
