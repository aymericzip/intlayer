import { ChunkLineResult, chunkText } from './calculateChunks';
import { splitTextByLines } from './splitTextByLine';

export interface ChunkMapping {
  baseChunk: ChunkLineResult;
  updatedChunk: ChunkLineResult | null; // null if the chunk was deleted
  hasChanges: boolean;
}

/**
 * Maps chunks from base file to corresponding chunks in updated file,
 * handling insertions, deletions, and modifications properly.
 */
export const mapChunksBetweenFiles = (
  baseFileContent: string,
  updatedFileContent: string,
  maxCharsPerChunk: number = 800,
  changedLines?: number[]
): ChunkMapping[] => {
  const baseChunks = chunkText(baseFileContent, maxCharsPerChunk, 0);
  const baseLines = splitTextByLines(baseFileContent);
  const updatedLines = splitTextByLines(updatedFileContent);

  // Create a simple line mapping using LCS (Longest Common Subsequence) approach
  const lineMapping = createLineMapping(baseLines, updatedLines);

  return baseChunks.map((baseChunk): ChunkMapping => {
    // Map the base chunk's line range to the updated file
    const mappedRange = mapLineRange(
      baseChunk.lineStart,
      baseChunk.lineLength,
      lineMapping
    );

    if (!mappedRange) {
      // This chunk was completely deleted
      return {
        baseChunk,
        updatedChunk: null,
        hasChanges: true,
      };
    }

    // Create the corresponding chunk in the updated file
    const updatedChunk: ChunkLineResult = {
      lineStart: mappedRange.start,
      lineLength: mappedRange.length,
      charStart: 0, // Will be calculated when needed
      charLength: 0, // Will be calculated when needed
      content: extractLinesFromRange(
        updatedLines,
        mappedRange.start,
        mappedRange.length
      ),
    };

    // Calculate character positions
    updatedChunk.charStart = getCharStartForLine(
      updatedFileContent,
      updatedChunk.lineStart
    );
    updatedChunk.charLength = updatedChunk.content.length;

    // Determine if this chunk has changes
    const hasChanges = determineIfChunkHasChanges(
      baseChunk,
      updatedChunk,
      changedLines
    );

    return {
      baseChunk,
      updatedChunk,
      hasChanges,
    };
  });
};

/**
 * Creates a mapping between line numbers in base file and updated file
 * Returns a map where key = base line number, value = updated line number (or null if deleted)
 */
function createLineMapping(
  baseLines: string[],
  updatedLines: string[]
): Map<number, number | null> {
  const mapping = new Map<number, number | null>();

  // Use a simple diff algorithm (similar to Myers algorithm but simplified)
  const dp: number[][] = Array(baseLines.length + 1)
    .fill(null)
    .map(() => Array(updatedLines.length + 1).fill(0));

  // Fill the DP table
  for (let i = 1; i <= baseLines.length; i++) {
    for (let j = 1; j <= updatedLines.length; j++) {
      if (baseLines[i - 1] === updatedLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to create the mapping
  let i = baseLines.length;
  let j = updatedLines.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && baseLines[i - 1] === updatedLines[j - 1]) {
      // Lines match
      mapping.set(i - 1, j - 1);
      i--;
      j--;
    } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
      // Line was deleted from base
      mapping.set(i - 1, null);
      i--;
    } else {
      // Line was added to updated (no mapping needed for base)
      j--;
    }
  }

  return mapping;
}

/**
 * Maps a line range from base file to updated file using the line mapping
 */
function mapLineRange(
  baseStart: number,
  baseLength: number,
  lineMapping: Map<number, number | null>
): { start: number; length: number } | null {
  const mappedLines: number[] = [];

  for (let i = baseStart; i < baseStart + baseLength; i++) {
    const mappedLine = lineMapping.get(i);
    if (mappedLine !== null && mappedLine !== undefined) {
      mappedLines.push(mappedLine);
    }
  }

  if (mappedLines.length === 0) {
    return null; // All lines were deleted
  }

  // Find the continuous range in the mapped lines
  mappedLines.sort((a, b) => a - b);
  const start = mappedLines[0];
  const end = mappedLines[mappedLines.length - 1];

  return {
    start,
    length: end - start + 1,
  };
}

/**
 * Extracts lines from a range in the lines array
 */
function extractLinesFromRange(
  lines: string[],
  start: number,
  length: number
): string {
  const endIndex = Math.min(start + length, lines.length);
  return lines.slice(start, endIndex).join('');
}

/**
 * Gets the character position where a line starts in the text
 */
function getCharStartForLine(text: string, lineNumber: number): number {
  const lines = splitTextByLines(text);
  let charStart = 0;

  for (let i = 0; i < Math.min(lineNumber, lines.length); i++) {
    charStart += lines[i].length;
  }

  return charStart;
}

/**
 * Determines if a chunk has changes based on git changed lines or content comparison
 */
function determineIfChunkHasChanges(
  baseChunk: ChunkLineResult,
  updatedChunk: ChunkLineResult,
  changedLines?: number[]
): boolean {
  // If we have git changed lines, use them for precise detection
  if (changedLines && changedLines.length > 0) {
    return changedLines.some(
      (line) =>
        line >= updatedChunk.lineStart &&
        line < updatedChunk.lineStart + updatedChunk.lineLength
    );
  }

  // Fallback to content comparison
  return baseChunk.content !== updatedChunk.content;
}
