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
  for (let i = 0; i < str.length; i++)
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  // convert to unsigned hex
  return (hash >>> 0).toString(16).padStart(8, '0');
};

const setAtPath = (root: any, path: Path, value: JSONValue) => {
  let cur = root;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];
    const isNextIndex = typeof nextKey === 'number';

    if (typeof key === 'number') {
      if (!Array.isArray(cur))
        throw new Error(`Expected array at path segment ${i}`);
      if (cur[key] === undefined) cur[key] = isNextIndex ? [] : {};
      cur = cur[key];
    } else {
      if (!isObject(cur))
        throw new Error(`Expected object at path segment ${i}`);
      if (!(key in cur)) (cur as any)[key] = isNextIndex ? [] : {};
      cur = (cur as any)[key];
    }
  }
  const last = path[path.length - 1];
  if (typeof last === 'number') {
    if (!Array.isArray(cur)) throw new Error(`Expected array at final segment`);
    cur[last] = value as any;
  } else {
    if (!isObject(cur)) throw new Error(`Expected object at final segment`);
    (cur as any)[last] = value as any;
  }
};

const pathKey = (path: Path): string => {
  // stable key for grouping string parts
  return JSON.stringify(path);
};

/**
 * Split a string into parts using getChunk with a charLength budget per part.
 */
const splitStringByBudget = (s: string, maxCharsPerPart: number): string[] => {
  if (maxCharsPerPart <= 0) throw new Error('maxChars must be > 0');
  const out: string[] = [];
  let offset = 0;
  while (offset < s.length) {
    const part = getChunk(s, {
      charStart: offset,
      charLength: maxCharsPerPart,
    });
    if (!part) break;
    out.push(part);
    offset += part.length;
  }
  return out;
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

  const walk = (val: JSONValue, p: Path) => {
    if (typeof val === 'string') {
      // If the serialized patch wouldn't fit, split the string into multiple parts
      // and encode as a split-node sentinel with numbered keys.
      const testPatch: SetPatch = { op: 'set', path: p, value: val };
      const testLen = JSON.stringify(testPatch).length + 150; // margin
      if (testLen <= maxCharsPerChunk) {
        patches.push(testPatch);
        return;
      }
      // Use getChunk-based splitting to produce stable parts
      const parts = splitStringByBudget(val, maxStringPiece);
      // Emit split-node metadata and parts as individual leaf writes
      patches.push({
        op: 'set',
        path: [...p, '__splittedType'],
        value: 'string',
      });
      patches.push({ op: 'set', path: [...p, '__total'], value: parts.length });
      for (let i = 0; i < parts.length; i++) {
        patches.push({
          op: 'set',
          path: [...p, String(i + 1)],
          value: parts[i],
        });
      }
      return;
    }

    if (val === null || typeof val !== 'object') {
      patches.push({ op: 'set', path: p, value: val });
      return;
    }

    if (seen.has(val as object)) {
      throw new Error('Cannot serialize circular structures to JSON.');
    }
    seen.add(val as object);

    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) walk(val[i] as JSONValue, [...p, i]);
    } else {
      for (const k of Object.keys(val)) walk((val as JSONObject)[k], [...p, k]);
    }

    seen.delete(val as object);
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
  if (maxChars < 50) {
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
  let cur: JsonChunk = {
    schemaVersion: 1,
    index: 0, // provisional
    total: 0, // provisional
    rootType,
    checksum,
    entries: [],
  };

  const emptyEnvelopeSize = JSON.stringify({ ...cur, entries: [] }).length;

  const tryFlush = () => {
    if (cur.entries.length > 0) {
      chunks.push(cur);
      cur = {
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
      JSON.stringify(cur.entries).length + // current entries array
      (cur.entries.length ? 1 : 0) + // possible comma
      JSON.stringify(patch).length;

    if (withPatchSize <= maxChars) {
      cur.entries.push(patch);
    } else {
      // Start a new chunk if current has items
      if (cur.entries.length > 0) {
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
      cur.entries.push(patch);
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
  const total = chunks.length;
  chunks.forEach((c, i) => {
    c.index = i;
    c.total = total;
  });

  return chunks;
};

/**
 * Reassemble JSON from chunks.
 * - Validates checksums and indices.
 * - Applies 'set' patches and merges string pieces from 'str-append'.
 */
export const assembleJSON = (chunks: JsonChunk[]): JSONObject | JSONArray => {
  if (!chunks || chunks.length === 0) throw new Error('No chunks provided.');

  // Basic validation & sort
  const sorted = [...chunks].sort((a, b) => a.index - b.index);
  const { checksum, rootType } = sorted[0];
  const schemaVersion = 1;

  for (let i = 0; i < sorted.length; i++) {
    const c = sorted[i];
    if (c.schemaVersion !== schemaVersion)
      throw new Error('Unsupported schemaVersion.');
    if (c.rootType !== rootType) throw new Error('Chunks rootType mismatch.');
    if (c.checksum !== checksum)
      throw new Error('Chunks checksum mismatch (different source objects?).');
    if (c.index !== i)
      throw new Error('Chunk indices are not contiguous or sorted.');
    // Defer total check until after reconstruction to prefer more specific errors
  }

  const root: any = rootType === 'array' ? [] : {};

  // Collect string parts by path
  const strParts = new Map<
    string,
    { path: Path; total: number; received: StrAppendPatch[] }
  >();

  const applySet = (p: SetPatch) => setAtPath(root, p.path, p.value);

  for (const c of sorted) {
    for (const entry of c.entries) {
      if (entry.op === 'set') {
        applySet(entry);
      } else {
        const key = pathKey(entry.path);
        const rec = strParts.get(key) ?? {
          path: entry.path,
          total: entry.total,
          received: [],
        };
        if (rec.total !== entry.total)
          throw new Error('Inconsistent string part totals for a path.');
        rec.received.push(entry);
        strParts.set(key, rec);
      }
    }
  }

  // Stitch strings
  for (const { path, total, received } of strParts.values()) {
    if (received.length !== total)
      throw new Error('Missing string parts for a path; incomplete chunk set.');
    received.sort((a, b) => a.index - b.index);
    const full = received.map((p) => p.value).join('');
    setAtPath(root, path, full);
  }

  // Reconcile split-node sentinels for strings/arrays after all patches applied
  const reconcileSplitNodes = (node: any): any => {
    if (node === null || typeof node !== 'object') return node;
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++)
        node[i] = reconcileSplitNodes(node[i]);
      return node;
    }
    // string split-node
    if ((node as any)['__splittedType'] === 'string') {
      const total = (node as any)['__total'];
      if (typeof total !== 'number' || total <= 0)
        throw new Error('Invalid split-node total for a path.');
      const parts: string[] = [];
      for (let i = 1; i <= total; i++) {
        const piece = (node as any)[String(i)];
        if (typeof piece !== 'string')
          throw new Error(
            'Missing string parts for a path; incomplete chunk set.'
          );
        parts.push(piece);
      }
      return parts.join('');
    }
    // array split-node (optional support)
    if ((node as any)['__splittedType'] === 'array') {
      const total = (node as any)['__total'];
      if (typeof total !== 'number' || total < 0)
        throw new Error('Invalid split-node total for a path.');
      const out: any[] = [];
      for (let i = 1; i <= total; i++) {
        const slice = (node as any)[String(i)];
        if (!Array.isArray(slice))
          throw new Error(
            'Missing string parts for a path; incomplete chunk set.'
          );
        for (let j = 0; j < slice.length; j++) {
          out.push(reconcileSplitNodes(slice[j]));
        }
      }
      return out;
    }
    // walk normal object
    for (const k of Object.keys(node)) {
      node[k] = reconcileSplitNodes(node[k]);
    }
    return node;
  };

  const reconciled = reconcileSplitNodes(root);

  // Now validate totals match provided count
  for (let i = 0; i < sorted.length; i++) {
    const c = sorted[i];
    if (c.total !== sorted.length)
      throw new Error('Chunk total does not match provided count.');
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
