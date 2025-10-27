/**
 * Split & reassemble JSON by character budget.
 * - Measures serialized size using JSON.stringify(..).length (characters).
 * - Ensures each chunk is itself valid JSON.
 * - Very large strings are split into safe pieces using getChunk and re-concatenated on assemble.
 * - Protects against circular structures (JSON can't serialize those anyway).
 */

import { getChunk } from './getChunk';

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type JSONObject = {
  [k: string]: JSONValue;
};

type JSONArray = JSONValue[];

type Path = Array<string | number>;

type SetPatch = { op: 'set'; path: Path; value: JSONValue };
type StrAppendPatch = {
  op: 'str-append';
  path: Path;
  value: string; // part of a longer string
  index: number;
  total: number;
};
type Patch = SetPatch | StrAppendPatch;

type RootType = 'object' | 'array';

export type JsonChunk = {
  schemaVersion: 1;
  index: number;
  total: number;
  rootType: RootType;
  checksum: string; // hash of the full original JSON string
  entries: Patch[];
};

const isObject = (val: unknown): val is Record<string, unknown> => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
};

const computeDjb2 = (str: string): string => {
  // Simple 32-bit hash; deterministic & fast
  let hash = 5381;

  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }

  // convert to unsigned hex
  return (hash >>> 0).toString(16).padStart(8, '0');
};

const setAtPath = (root: any, path: Path, value: JSONValue) => {
  let current = root;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];
    const isNextIndex = typeof nextKey === 'number';

    if (typeof key === 'number') {
      if (!Array.isArray(current)) {
        throw new Error(`Expected array at path segment ${i}`);
      }

      if (current[key] === undefined) {
        current[key] = isNextIndex ? [] : {};
      }

      current = current[key];
    } else {
      if (!isObject(current)) {
        throw new Error(`Expected object at path segment ${i}`);
      }

      if (!(key in current)) {
        (current as any)[key] = isNextIndex ? [] : {};
      }

      current = (current as any)[key];
    }
  }

  const last = path[path.length - 1];

  if (typeof last === 'number') {
    if (!Array.isArray(current)) {
      throw new Error(`Expected array at final segment`);
    }

    current[last] = value as any;
  } else {
    if (!isObject(current)) {
      throw new Error(`Expected object at final segment`);
    }

    (current as any)[last] = value as any;
  }
};

const pathKey = (path: Path): string => {
  // stable key for grouping string parts
  return JSON.stringify(path);
};

/**
 * Split a string into parts using getChunk with a charLength budget per part.
 */
const splitStringByBudget = (
  str: string,
  maxCharsPerPart: number
): string[] => {
  if (maxCharsPerPart <= 0) {
    throw new Error('maxChars must be > 0');
  }

  const output: string[] = [];
  let offset = 0;

  while (offset < str.length) {
    const part = getChunk(str, {
      charStart: offset,
      charLength: maxCharsPerPart,
    });

    if (!part) break;

    output.push(part);
    offset += part.length;
  }

  return output;
};

/**
 * Flatten JSON into patches (leaf writes). Strings too large to fit in a single
 * chunk are yielded as multiple str-append patches.
 */
const flattenToPatches = (
  value: JSONValue,
  maxCharsPerChunk: number,
  path: Path = [],
  seen = new WeakSet<object>()
): Patch[] => {
  // Conservative per-entry cap so a single entry fits into an empty chunk with envelope overhead.
  // (Envelope ~ a few hundred chars; we keep a comfortable margin.)
  const maxStringPiece = Math.max(
    1,
    Math.floor((maxCharsPerChunk - 400) * 0.8)
  );

  const patches: Patch[] = [];

  const walk = (currentValue: JSONValue, currentPath: Path) => {
    if (typeof currentValue === 'string') {
      // If the serialized patch wouldn't fit, split the string into multiple parts
      // and encode as a split-node sentinel with numbered keys.
      const testPatch: SetPatch = {
        op: 'set',
        path: currentPath,
        value: currentValue,
      };
      const testLen = JSON.stringify(testPatch).length + 150; // margin

      if (testLen <= maxCharsPerChunk) {
        patches.push(testPatch);
        return;
      }

      // Use getChunk-based splitting to produce stable parts
      const parts = splitStringByBudget(currentValue, maxStringPiece);

      // Emit split-node metadata and parts as individual leaf writes
      patches.push({
        op: 'set',
        path: [...currentPath, '__splittedType'],
        value: 'string',
      });
      patches.push({
        op: 'set',
        path: [...currentPath, '__total'],
        value: parts.length,
      });

      for (let i = 0; i < parts.length; i++) {
        patches.push({
          op: 'set',
          path: [...currentPath, String(i + 1)],
          value: parts[i],
        });
      }

      return;
    }

    if (currentValue === null || typeof currentValue !== 'object') {
      patches.push({ op: 'set', path: currentPath, value: currentValue });
      return;
    }

    if (seen.has(currentValue as object)) {
      throw new Error('Cannot serialize circular structures to JSON.');
    }

    seen.add(currentValue as object);

    if (Array.isArray(currentValue)) {
      for (let i = 0; i < currentValue.length; i++) {
        walk(currentValue[i] as JSONValue, [...currentPath, i]);
      }
    } else {
      for (const key of Object.keys(currentValue)) {
        walk((currentValue as JSONObject)[key], [...currentPath, key]);
      }
    }

    seen.delete(currentValue as object);
  };

  walk(value, path);
  return patches;
};

/**
 * Split JSON into chunks constrained by character count of serialized chunk.
 */
export const chunkJSON = (
  value: JSONObject | JSONArray,
  maxChars: number
): JsonChunk[] => {
  if (!isObject(value) && !Array.isArray(value)) {
    throw new Error('Root must be an object or array.');
  }

  if (maxChars < 500) {
    // You can lower this if you truly need; recommended to keep some envelope headroom.
    throw new Error('maxChars is too small. Use at least 500 characters.');
  }

  const rootType: RootType = Array.isArray(value) ? 'array' : 'object';
  let sourceString: string;

  try {
    sourceString = JSON.stringify(value);
  } catch {
    // Provide a deterministic error message for circular refs
    throw new Error('Cannot serialize circular structures to JSON.');
  }

  const checksum = computeDjb2(sourceString);
  const allPatches = flattenToPatches(value as JSONValue, maxChars);

  const chunks: JsonChunk[] = [];
  let currentChunk: JsonChunk = {
    schemaVersion: 1,
    index: 0, // provisional
    total: 0, // provisional
    rootType,
    checksum,
    entries: [],
  };

  const emptyEnvelopeSize = JSON.stringify({
    ...currentChunk,
    entries: [],
  }).length;

  const tryFlush = () => {
    if (currentChunk.entries.length > 0) {
      chunks.push(currentChunk);
      currentChunk = {
        schemaVersion: 1,
        index: 0,
        total: 0,
        rootType,
        checksum,
        entries: [],
      };
    }
  };

  for (const patch of allPatches) {
    // Would adding this patch exceed maxChars?
    const withPatchSize =
      emptyEnvelopeSize +
      JSON.stringify(currentChunk.entries).length + // current entries array
      (currentChunk.entries.length ? 1 : 0) + // possible comma
      JSON.stringify(patch).length;

    if (withPatchSize <= maxChars) {
      currentChunk.entries.push(patch);
    } else {
      // Start a new chunk if current has items
      if (currentChunk.entries.length > 0) {
        tryFlush();
      }

      // Ensure single patch fits into an empty chunk
      const singleSize = emptyEnvelopeSize + JSON.stringify([patch]).length;

      if (singleSize > maxChars) {
        // This should only happen for massive strings, which we pre-split;
        // if it happens for a non-string, we cannot split further.
        throw new Error(
          'A single entry exceeds maxChars and cannot be split. Reduce entry size or increase maxChars.'
        );
      }

      currentChunk.entries.push(patch);
    }
  }

  tryFlush();

  // Ensure at least one chunk exists (even for empty root)
  if (chunks.length === 0) {
    chunks.push({
      schemaVersion: 1,
      index: 0,
      total: 0, // provisional
      rootType,
      checksum,
      entries: [],
    });
  }

  // Finalize indices & totals
  const totalChunks = chunks.length;

  chunks.forEach((chunk, index) => {
    chunk.index = index;
    chunk.total = totalChunks;
  });

  return chunks;
};

/**
 * Reassemble JSON from chunks.
 * - Validates checksums and indices.
 * - Applies 'set' patches and merges string pieces from 'str-append'.
 */
/**
 * Reconstruct content from a single chunk without validation.
 * Useful for processing individual chunks in a pipeline where you don't have all chunks yet.
 * Note: This will only reconstruct the partial content contained in this chunk.
 */
export const reconstructFromSingleChunk = (
  chunk: JsonChunk
): JSONObject | JSONArray => {
  const root: any = chunk.rootType === 'array' ? [] : {};

  // Apply all 'set' patches from this chunk
  for (const entry of chunk.entries) {
    if (entry.op === 'set') {
      setAtPath(root, entry.path, entry.value);
    }
  }

  // Reconcile split-node sentinels for strings/arrays
  // When reconstructing from a single chunk, we may have incomplete split nodes
  const reconcileSplitNodes = (node: any): any => {
    if (node === null || typeof node !== 'object') return node;

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        node[i] = reconcileSplitNodes(node[i]);
      }
      return node;
    }

    // string split-node
    if ((node as any)['__splittedType'] === 'string') {
      const total = (node as any)['__total'];

      if (typeof total !== 'number' || total <= 0) {
        // Invalid split node, return as-is
        return node;
      }

      const parts: string[] = [];
      let hasAllParts = true;

      for (let i = 1; i <= total; i++) {
        const piece = (node as any)[String(i)];

        if (typeof piece !== 'string') {
          hasAllParts = false;
          break;
        }

        parts.push(piece);
      }

      // Only reconstruct if we have all parts, otherwise return the node as-is
      if (hasAllParts) {
        return parts.join('');
      }

      return node;
    }

    // array split-node (optional support)
    if ((node as any)['__splittedType'] === 'array') {
      const total = (node as any)['__total'];

      if (typeof total !== 'number' || total < 0) {
        // Invalid split node, return as-is
        return node;
      }

      const output: any[] = [];
      let hasAllParts = true;

      for (let i = 1; i <= total; i++) {
        const slice = (node as any)[String(i)];

        if (!Array.isArray(slice)) {
          hasAllParts = false;
          break;
        }

        for (let j = 0; j < slice.length; j++) {
          output.push(reconcileSplitNodes(slice[j]));
        }
      }

      // Only reconstruct if we have all parts
      if (hasAllParts) {
        return output;
      }

      return node;
    }

    // walk normal object
    for (const key of Object.keys(node)) {
      node[key] = reconcileSplitNodes(node[key]);
    }

    return node;
  };

  return reconcileSplitNodes(root);
};

export const assembleJSON = (chunks: JsonChunk[]): JSONObject | JSONArray => {
  if (!chunks || chunks.length === 0) {
    throw new Error('No chunks provided.');
  }

  // Basic validation & sort
  const sorted = [...chunks].sort((a, b) => a.index - b.index);
  const { checksum, rootType } = sorted[0];
  const schemaVersion = 1;

  for (let i = 0; i < sorted.length; i++) {
    const chunk = sorted[i];

    if (chunk.schemaVersion !== schemaVersion) {
      console.error('Unsupported schemaVersion.', {
        cause: chunk,
        schemaVersion,
      });
      throw new Error('Unsupported schemaVersion.');
    }

    if (chunk.rootType !== rootType) {
      console.error('Chunks rootType mismatch.', {
        cause: chunk,
        rootType,
      });
      throw new Error('Chunks rootType mismatch.');
    }

    if (chunk.checksum !== checksum) {
      console.error('Chunks checksum mismatch (different source objects?).', {
        cause: chunk,
        checksum,
      });
      throw new Error('Chunks checksum mismatch (different source objects?).');
    }

    if (chunk.index !== i) {
      console.error('Chunk indices are not contiguous or sorted.', {
        cause: chunk,
        index: chunk.index,
        i,
      });
      throw new Error('Chunk indices are not contiguous or sorted.');
    }

    // Defer total check until after reconstruction to prefer more specific errors
  }

  const root: any = rootType === 'array' ? [] : {};

  // Collect string parts by path
  const stringParts = new Map<
    string,
    { path: Path; total: number; received: StrAppendPatch[] }
  >();

  const applySet = (patch: SetPatch) =>
    setAtPath(root, patch.path, patch.value);

  for (const chunk of sorted) {
    for (const entry of chunk.entries) {
      if (entry.op === 'set') {
        applySet(entry);
      } else {
        const key = pathKey(entry.path);
        const record = stringParts.get(key) ?? {
          path: entry.path,
          total: entry.total,
          received: [],
        };

        if (record.total !== entry.total) {
          throw new Error('Inconsistent string part totals for a path.');
        }

        record.received.push(entry);
        stringParts.set(key, record);
      }
    }
  }

  // Stitch strings
  for (const { path, total, received } of stringParts.values()) {
    if (received.length !== total) {
      throw new Error('Missing string parts for a path; incomplete chunk set.');
    }

    received.sort((a, b) => a.index - b.index);
    const fullString = received.map((part) => part.value).join('');
    setAtPath(root, path, fullString);
  }

  // Reconcile split-node sentinels for strings/arrays after all patches applied
  const reconcileSplitNodes = (node: any): any => {
    if (node === null || typeof node !== 'object') return node;

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        node[i] = reconcileSplitNodes(node[i]);
      }
      return node;
    }

    // string split-node
    if ((node as any)['__splittedType'] === 'string') {
      const total = (node as any)['__total'];

      if (typeof total !== 'number' || total <= 0) {
        throw new Error('Invalid split-node total for a path.');
      }

      const parts: string[] = [];

      for (let i = 1; i <= total; i++) {
        const piece = (node as any)[String(i)];

        if (typeof piece !== 'string') {
          throw new Error(
            'Missing string parts for a path; incomplete chunk set.'
          );
        }

        parts.push(piece);
      }

      return parts.join('');
    }

    // array split-node (optional support)
    if ((node as any)['__splittedType'] === 'array') {
      const total = (node as any)['__total'];

      if (typeof total !== 'number' || total < 0) {
        throw new Error('Invalid split-node total for a path.');
      }

      const output: any[] = [];

      for (let i = 1; i <= total; i++) {
        const slice = (node as any)[String(i)];

        if (!Array.isArray(slice)) {
          throw new Error(
            'Missing string parts for a path; incomplete chunk set.'
          );
        }

        for (let j = 0; j < slice.length; j++) {
          output.push(reconcileSplitNodes(slice[j]));
        }
      }

      return output;
    }

    // walk normal object
    for (const key of Object.keys(node)) {
      node[key] = reconcileSplitNodes(node[key]);
    }

    return node;
  };

  const reconciled = reconcileSplitNodes(root);

  // Now validate totals match provided count
  for (let i = 0; i < sorted.length; i++) {
    const chunk = sorted[i];

    if (chunk.total !== sorted.length) {
      throw new Error(
        `Chunk total does not match provided count. Expected ${sorted.length}, but chunk ${i} has total=${chunk.total}`
      );
    }
  }

  return reconciled;
};

/* -------------------------------------------
 * Example usage
 * -------------------------------------------
const big: JSONObject = {
  title: "Document",
  content: "…a very very long text…",
  items: Array.from({ length: 2000 }, (_, i) => ({ id: i, label: `Item ${i}` }))
};

// Split to ~16k-char chunks
const chunks = chunkJSON(big, 16_000);

// Send each `chunks[i]` as JSON to your backend.
// Later, reassemble:
const restored = assembleJSON(chunks);
console.log(JSON.stringify(restored) === JSON.stringify(big)); // true
*/
