import crypto from 'node:crypto';
import type { FingerprintedBlock, NormalizedBlock } from './types';

const computeStringDigest = (text: string): string =>
  crypto.createHash('sha256').update(text).digest('hex');

/**
 * Compute content and context digests for a normalized block.
 *
 * The context key (digest of the surrounding blocks) lets the planner tell apart
 * two blocks that share the same content but live in different sections.
 *
 * @param block - The block to fingerprint.
 * @param previousBlock - The block immediately before, or `null` at the start.
 * @param nextBlock - The block immediately after, or `null` at the end.
 * @returns The block enriched with its digests.
 */
export const fingerprintBlock = (
  block: NormalizedBlock,
  previousBlock: NormalizedBlock | null,
  nextBlock: NormalizedBlock | null
): FingerprintedBlock => {
  const semanticDigest = computeStringDigest(block.semanticText);
  const anchorDigest = computeStringDigest(block.anchorText);
  const compositeKey = `${semanticDigest}:${anchorDigest}`;

  const previousDigest = computeStringDigest(previousBlock?.semanticText ?? '');
  const nextDigest = computeStringDigest(nextBlock?.semanticText ?? '');
  const contextKey = computeStringDigest(`${previousDigest}:${nextDigest}`);

  return {
    ...block,
    semanticDigest,
    anchorDigest,
    compositeKey,
    contextKey,
  };
};
