import { useRef } from 'preact/hooks';

/**
 * Returns the latest non-nullish value received, so a view can stay rendered,
 * and filled, after its source clears (e.g. a drawer sliding out once the
 * focused content is reset).
 *
 * Read from a ref rather than synced into state: a state update during render
 * costs an extra render pass for every change.
 *
 * @param value - Current value, possibly cleared
 * @returns The current value, or the last one that was set
 */
export const useLastDefinedValue = <Value>(
  value: Value | null | undefined
): Value | undefined => {
  const lastValueRef = useRef<Value | undefined>(value ?? undefined);

  if (value !== null && value !== undefined) {
    lastValueRef.current = value;
  }

  return lastValueRef.current;
};
