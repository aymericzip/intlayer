import type { Block, LineChange } from './types';

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
