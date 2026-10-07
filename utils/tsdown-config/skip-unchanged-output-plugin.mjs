import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Checks whether `filePath` already holds exactly `content`.
 * @param {string} filePath
 * @param {Buffer} content
 * @returns {Promise<boolean>}
 */
const isFileContentEqual = async (filePath, content) => {
  try {
    const fileStats = await stat(filePath);

    if (fileStats.size !== content.byteLength) return false;

    const existingContent = await readFile(filePath);

    return existingContent.equals(content);
  } catch {
    return false;
  }
};

/**
 * Drops every output file whose content is identical to the file already on
 * disk, so it is not rewritten.
 *
 * tsdown `--watch` re-emits the whole output on each rebuild. In unbundle
 * mode that is one write per source file, and every consumer watching `dist`
 * (Vite, the intlayer content watcher) reacts to all of them. Keeping the
 * unchanged files untouched limits a rebuild to the files that really changed.
 *
 * @returns {import('rolldown').Plugin}
 */
export const SkipUnchangedOutputPlugin = () => ({
  name: 'skip-unchanged-output',
  generateBundle: {
    order: 'post',
    async handler(outputOptions, bundle) {
      const outputDirectory = outputOptions.dir;

      if (!outputDirectory) return;

      const unchangedFileNames = await Promise.all(
        Object.entries(bundle).map(async ([fileName, outputEntry]) => {
          const content = Buffer.from(
            outputEntry.type === 'chunk' ? outputEntry.code : outputEntry.source
          );
          const isUnchanged = await isFileContentEqual(
            join(outputDirectory, fileName),
            content
          );

          return isUnchanged ? fileName : null;
        })
      );

      for (const fileName of unchangedFileNames) {
        if (fileName) delete bundle[fileName];
      }
    },
  },
});
