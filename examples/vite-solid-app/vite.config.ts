import solid from '@solidjs/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

export default defineConfig({
  // Workspace packages are symlinked: resolve Solid from this app, so the
  // uncompiled JSX of solid-intlayer shares the app's Solid 2 runtime.
  resolve: { dedupe: ['solid-js', '@solidjs/web'] },
  plugins: [
    solid(),
    intlayer(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
