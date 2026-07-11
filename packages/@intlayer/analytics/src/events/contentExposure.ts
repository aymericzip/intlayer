import type { KeyPath } from '@intlayer/types/keyPath';
import type { ContentExposureEvent, TrackableEvent } from '../core/types';

/**
 * Serializes a `KeyPath[]` into a compact, stable string used both as the
 * coalescing key in the buffer and as the stored `keyPath` on the wire.
 *
 * Only the `key` of each segment is kept (types are implied by the dictionary
 * shape), producing paths like `"faq.items.2.answer"`.
 *
 * @param keyPath - The interpreter key path locating a node.
 * @returns A dot-joined, stable path string.
 *
 * @example
 * serializeKeyPath([{ type: 'object', key: 'faq' }, { type: 'array', key: 2 }]);
 * // "faq.2"
 */
export const serializeKeyPath = (keyPath: KeyPath[]): string =>
  keyPath
    .map((segment) => (segment.key === undefined ? '*' : String(segment.key)))
    .join('.');

/**
 * Builds a content-exposure payload from interpreter node metadata. Shared by
 * every framework binding's analytics node plugin so the wire shape stays
 * identical across React, Vue, Svelte, Angular, etc.
 *
 * @param params - Node metadata available on `NodeProps`.
 * @returns A trackable content-exposure event (minus buffer-stamped fields).
 */
export const buildContentExposure = (params: {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: string;
  nodeType?: string;
  experimentKey?: string;
  variant?: string;
}): Omit<TrackableEvent<ContentExposureEvent>, 'type'> => ({
  dictionaryKey: params.dictionaryKey,
  keyPath: serializeKeyPath(params.keyPath),
  // Left undefined when unknown so the client stamps its ambient locale.
  locale: params.locale,
  nodeType: params.nodeType,
  experimentKey: params.experimentKey,
  variant: params.variant,
});
