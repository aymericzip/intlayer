import { cpSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { esmOptions, typesOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

/**
 * Plugin to recursively copy all .json and .md files from src to dist/esm
 * preserving the directory structure.
 */
const copyAssetsPlugin = () => ({
  name: 'copy-assets',
  writeBundle() {
    const srcDir = 'src';
    const outDir = 'dist/esm';

    // Helper to walk directories recursively
    function copyFilesRecursively(currentDir: string) {
      const entries = readdirSync(currentDir);

      for (const entry of entries) {
        const srcPath = join(currentDir, entry);
        const stats = statSync(srcPath);

        if (stats.isDirectory()) {
          copyFilesRecursively(srcPath);
        } else if (stats.isFile() && /\.(json|md)$/.test(entry)) {
          // Calculate destination path
          const relPath = relative(srcDir, srcPath);
          const destPath = join(outDir, relPath);

          // Ensure directory exists
          mkdirSync(dirname(destPath), { recursive: true });

          // Copy file
          cpSync(srcPath, destPath);
        }
      }
    }

    try {
      copyFilesRecursively(srcDir);
      console.log('Assets (.json, .md) copied to dist/esm');
    } catch (e) {
      console.error('Failed to copy assets:', e);
    }
  },
});

export default defineConfig([
  {
    ...esmOptions,
    // Overwrite plugins: Remove the default AssetPlugin and add our custom copy plugin
    plugins: [copyAssetsPlugin()],
  } as UserConfig,
  {
    ...typesOptions,
  } as UserConfig,
]);
