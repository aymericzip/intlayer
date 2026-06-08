export const mergeChunks = (chunks: any[]): any => {
  if (chunks.length === 0) return {};

  let result = chunks[0];

  for (let i = 1; i < chunks.length; i++) {
    result = customChunkMerge(result, chunks[i]);
  }

  return result;
};

const customChunkMerge = (dest: any, source: any): any => {
  if (dest === undefined || dest === null) return source;
  if (source === undefined || source === null) return dest;

  if (Array.isArray(dest) && Array.isArray(source)) {
    const maxLength = Math.max(dest.length, source.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      result[i] = customChunkMerge(dest[i], source[i]);
    }
    return result;
  }

  if (typeof dest === 'object' && typeof source === 'object') {
    const result: any = { ...dest };
    for (const key of Object.keys(source)) {
      result[key] = customChunkMerge(result[key], source[key]);
    }
    return result;
  }

  // Primitives: if we are here, both are not null.
  // Since chunks shouldn't overlap, we can return dest.
  return dest;
};
