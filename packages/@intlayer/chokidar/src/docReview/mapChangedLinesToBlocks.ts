import type { Block, LineChange } from './types';

/**
 * Map a set of changed line numbers onto the indexes of the blocks that contain
 * them.
 *
 * @param blocks - The ordered blocks of the base document.
 * @param changedLines - 1-based line numbers that changed in the base document.
 * @returns The set of block indexes touched by at least one changed line.
 */
export const mapChangedLinesToBlocks = (
  blocks: Block[],
  changedLines: LineChange[]
): Set<number> => {
  const changedSet = new Set<number>();
  if (!changedLines || changedLines.length === 0) return changedSet;

  const changedLookup = new Set<number>(changedLines);

  blocks.forEach((block, index) => {
    for (let line = block.lineStart; line <= block.lineEnd; line += 1) {
      if (changedLookup.has(line)) {
        changedSet.add(index);
        break;
      }
    }
  });

  return changedSet;
};
