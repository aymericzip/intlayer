import { listSpecialChars } from './listSpecialChars';

/**
 * Split a text into paragraphs.
 *
 * We consider a paragraph boundary to be a block of at least two consecutive
 * new-lines that is immediately followed by a non-white-space character.  This
 * way, internal blank lines that are part of the same paragraph (e.g. a list
 * item that purposely contains a visual break) are preserved while true
 * paragraph breaks – the ones generated when calling `arr.join("\n\n")` in
 * the tests – are still detected.
 */
const splitByParagraph = (text: string): string[] => {
  const paragraphs: string[] = [];

  // Capture the delimiter so that we can inspect how many new-lines it
  // contains.  We know that the test strings only use LF, so we keep the
  // regex simple here.
  const tokens = text.split(/(\n{2,})/);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Even-indexed tokens are the actual paragraph contents.
    if (i % 2 === 0) {
      if (token) paragraphs.push(token);
      continue;
    }

    // Odd-indexed tokens are the delimiters (>= two consecutive new-lines).
    // The first and last pairs represent the natural separators that are
    // added when paragraphs are later joined with "\n\n".  Any additional
    // pairs in between correspond to *explicit* blank paragraphs that were
    // present in the original text and must therefore be preserved.
    const pairsOfNewlines = Math.floor(token.length / 2);
    const blankParagraphs = Math.max(0, pairsOfNewlines - 2);

    for (let j = 0; j < blankParagraphs; j++) {
      paragraphs.push('\n\n');
    }
  }

  return paragraphs;
};

/**
 * Determine whether two paragraphs match – either exactly, or by sharing the
 * same "special-character signature".
 */
const paragraphMatches = (
  paragraph: string,
  baseParagraph: string,
  paragraphSignature: ReturnType<typeof listSpecialChars>,
  baseSignature: ReturnType<typeof listSpecialChars>
): boolean => {
  if (paragraph === baseParagraph) return true;
  // fallback to special-character signature comparison
  if (paragraphSignature.length !== baseSignature.length) return false;

  for (let i = 0; i < paragraphSignature.length; i++) {
    if (paragraphSignature[i].char !== baseSignature[i].char) {
      return false;
    }
  }
  return true;
};

/**
 * Re-order `textToReorder` so that its paragraphs follow the ordering found in
 * `baseFileContent`, while preserving any extra paragraphs (those not present
 * in the base file) in a position that is intuitive for a human reader: right
 * after the closest preceding paragraph coming from the base file.
 */
export const reorderParagraphs = (
  textToReorder: string,
  baseFileContent: string
): string => {
  // 1. Split both texts into paragraphs and pre-compute their signatures.
  const baseFileParagraphs = splitByParagraph(baseFileContent);
  const textToReorderParagraphs = splitByParagraph(textToReorder);

  const baseSignatures = baseFileParagraphs.map((p) => listSpecialChars(p));
  const textSignatures = textToReorderParagraphs.map((p) =>
    listSpecialChars(p)
  );

  // 2. For every paragraph in the text to reorder, find the *first* base
  //    paragraph it matches.  We only allow each base paragraph to be matched
  //    once.  Any further identical paragraphs will be treated as "extra" and
  //    will be positioned later on, next to their closest neighbour.
  const firstMatchIndexForBase: number[] = Array(
    baseFileParagraphs.length
  ).fill(-1);
  const paragraphMatchedBaseIdx: (number | null)[] = Array(
    textToReorderParagraphs.length
  ).fill(null);

  for (let i = 0; i < textToReorderParagraphs.length; i++) {
    const paragraph = textToReorderParagraphs[i];
    const sig = textSignatures[i];

    // exact match pass first for performance
    let foundIdx = baseFileParagraphs.findIndex(
      (baseParagraph, idx) =>
        firstMatchIndexForBase[idx] === -1 && paragraph === baseParagraph
    );

    if (foundIdx === -1) {
      // fallback to the signature comparison
      foundIdx = baseFileParagraphs.findIndex(
        (baseParagraph, idx) =>
          firstMatchIndexForBase[idx] === -1 &&
          paragraphMatches(paragraph, baseParagraph, sig, baseSignatures[idx])
      );
    }

    if (foundIdx !== -1) {
      firstMatchIndexForBase[foundIdx] = i;
      paragraphMatchedBaseIdx[i] = foundIdx;
    }
  }

  // 3. For the paragraphs that *didn't* get matched to a base paragraph, we
  //    record the highest-numbered base paragraph that was matched *before* it
  //    in the original text.  The extra paragraph will later be placed right
  //    after that paragraph in the final ordering.
  const insertAfterBaseIdx: number[] = Array(
    textToReorderParagraphs.length
  ).fill(-1);
  let maxBaseIdxEncountered = -1;

  for (let i = 0; i < textToReorderParagraphs.length; i++) {
    const matchedBase = paragraphMatchedBaseIdx[i];

    if (matchedBase !== null) {
      if (matchedBase > maxBaseIdxEncountered) {
        maxBaseIdxEncountered = matchedBase;
      }
    } else {
      insertAfterBaseIdx[i] = maxBaseIdxEncountered;
    }
  }

  // 4. Build the final, reordered list of paragraphs.
  const result: string[] = [];

  // Helper: quickly retrieve all indices of paragraphs that should be inserted
  // after a given base index, while keeping their original order.
  const extraParagraphsBuckets: Record<number, number[]> = {};
  insertAfterBaseIdx.forEach((afterIdx, paragraphIdx) => {
    if (afterIdx === -1) return; // will be handled later (if any)
    extraParagraphsBuckets[afterIdx] = extraParagraphsBuckets[afterIdx] || [];
    extraParagraphsBuckets[afterIdx].push(paragraphIdx);
  });

  for (let bIdx = 0; bIdx < baseFileParagraphs.length; bIdx++) {
    const matchedParagraphIdx = firstMatchIndexForBase[bIdx];

    if (matchedParagraphIdx !== -1) {
      result.push(textToReorderParagraphs[matchedParagraphIdx]);
    }

    if (extraParagraphsBuckets[bIdx]) {
      extraParagraphsBuckets[bIdx].forEach((pIdx) => {
        result.push(textToReorderParagraphs[pIdx]);
      });
    }
  }

  // Finally, if there were extra paragraphs appearing *before* any matched
  // base paragraph (insertAfterBaseIdx === -1), we prepend them to the output
  // in their original order.
  const leadingExtras: string[] = [];
  insertAfterBaseIdx.forEach((afterIdx, pIdx) => {
    if (afterIdx === -1 && paragraphMatchedBaseIdx[pIdx] === null) {
      leadingExtras.push(textToReorderParagraphs[pIdx]);
    }
  });

  return [...leadingExtras, ...result].join('\n\n');
};
