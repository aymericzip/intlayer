import crypto from 'node:crypto';
import type { FingerprintedBlock, NormalizedBlock } from './types';

const computeStringDigest = (text: string): string =>
  crypto.createHash('sha256').update(text).digest('hex');

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
