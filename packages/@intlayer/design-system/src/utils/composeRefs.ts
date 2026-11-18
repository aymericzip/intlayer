import type { Ref, RefCallback, RefObject } from 'react';

type RefCleanup = () => void;

/** Assigns a node to a callback or object ref, returning the callback's cleanup if any. */
const assignRef = <TNode>(
  ref: Ref<TNode> | undefined,
  node: TNode | null
): RefCleanup | undefined => {
  if (typeof ref === 'function') {
    const cleanup = ref(node);

    return typeof cleanup === 'function' ? cleanup : undefined;
  }

  if (ref) (ref as RefObject<TNode | null>).current = node;

  return undefined;
};

/**
 * Merges several refs into one callback ref, forwarding React 19 ref cleanups.
 *
 * @example
 * <div ref={composeRefs(localRef, forwardedRef)} />
 */
export const composeRefs =
  <TNode>(...refs: (Ref<TNode> | undefined)[]): RefCallback<TNode> =>
  (node) => {
    const cleanups = refs.map((ref) => assignRef(ref, node));

    return () => {
      refs.forEach((ref, index) => {
        const cleanup = cleanups[index];

        if (cleanup) cleanup();
        else assignRef(ref, null);
      });
    };
  };
