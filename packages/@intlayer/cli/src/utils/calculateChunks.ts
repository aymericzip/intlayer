import { splitTextByLines } from './splitTextByLine';

export type ChunkLineResult = {
  lineStart: number;
  lineLength: number;
  charStart: number;
  charLength: number;
  content: string;
};

const DEFAULT_MAX_CHARS_PER_CHUNK = 800;
const DEFAULT_OVERLAP_CHARS = 0;

export const chunkText = (
  text: string,
  maxCharsPerChunk: number = DEFAULT_MAX_CHARS_PER_CHUNK,
  overlapChars: number = DEFAULT_OVERLAP_CHARS
): ChunkLineResult[] => {
  if (maxCharsPerChunk <= 0) {
    throw new Error('maxCharsPerChunk must be greater than 0');
  }

  const splittedText = splitTextByLines(text);

  // Split text into lines to faciliate the translation
  const lines: ChunkLineResult[] = [];
  let charStartAcc = 0;

  splittedText.forEach((line, index) => {
    lines.push({
      content: line,
      lineStart: index,
      lineLength: 1,
      charStart: charStartAcc,
      charLength: line.length,
    });
    charStartAcc += line.length;
  });

  // Group lines
  // as long as the chunk length is less than maxCharsPerChunk
  // if a line longer than maxCharsPerChunk, keep it alone
  // if a line is not longer than maxCharsPerChunk, it is grouped
  const groupedLines: ChunkLineResult[] = lines.reduce(
    (acc: ChunkLineResult[], line) => {
      // If this line alone exceeds maxCharsPerChunk, keep it separate
      if (line.content.length > maxCharsPerChunk) {
        acc.push(line);
        return acc;
      }

      // If we have no chunks yet, start with this line
      if (acc.length === 0) {
        acc.push(line);
        return acc;
      }

      // Get the last chunk
      const lastChunk = acc[acc.length - 1];

      // Calculate what the combined length would be (including newline character)
      const combinedLength = lastChunk.content.length + line.content.length;

      // If combining would exceed the limit, start a new chunk
      if (combinedLength > maxCharsPerChunk) {
        acc.push(line);
        return acc;
      }

      // Otherwise, combine with the last chunk
      const combinedContent = lastChunk.content + line.content;
      const updatedChunk = {
        content: combinedContent,
        lineStart: lastChunk.lineStart,
        lineLength: lastChunk.lineLength + line.lineLength,
        charStart: lastChunk.charStart,
        charLength: combinedContent.length,
      };

      acc[acc.length - 1] = updatedChunk;
      return acc;
    },
    []
  );

  // If one line is longer than maxCharsPerChunk, split it into multiple chunks
  const splittedLines: ChunkLineResult[] = groupedLines.flatMap((line) => {
    const chunk: ChunkLineResult[] = [];

    if (line.content.length <= maxCharsPerChunk) {
      chunk.push(line);
      return chunk;
    }

    for (let i = 0; i < line.content.length; i += maxCharsPerChunk) {
      const slicedContent = line.content.slice(i, i + maxCharsPerChunk);
      chunk.push({
        content: slicedContent,
        lineStart: line.lineStart,
        lineLength: 1,
        charStart: line.charStart + i,
        charLength: slicedContent.length,
      });
    }
    return chunk;
  });

  if (overlapChars === 0) return splittedLines;

  const overlapChunks: ChunkLineResult[] =
    splittedLines.length > 0 ? [splittedLines[0]] : [];

  for (let i = 1; i < splittedLines.length; i++) {
    const previousChunk = splittedLines[i - 1];
    const chunk = splittedLines[i];

    const overlapContent = previousChunk.content.slice(-overlapChars);
    const overlapLineNb = splitTextByLines(overlapContent).length;

    const overlapContentWithoutPartialLine = overlapContent.slice(
      overlapLineNb > 1 ? overlapContent.indexOf('\n') + 1 : 0,
      overlapContent.length
    );

    const newContent = overlapContentWithoutPartialLine + chunk.content;
    const newLineLength = splitTextByLines(newContent).length;
    const lineDiff = chunk.lineLength - newLineLength;

    const overlappedChunk = {
      content: newContent,
      lineStart: chunk.lineStart + lineDiff,
      lineLength: chunk.lineLength - lineDiff,
      charStart: chunk.charStart - overlapContentWithoutPartialLine.length,
      charLength: newContent.length,
    };

    overlapChunks.push(overlappedChunk);
  }

  return overlapChunks;
};
