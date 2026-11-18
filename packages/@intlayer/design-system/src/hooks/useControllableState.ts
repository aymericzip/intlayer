'use client';

import { useRef, useState } from 'react';

export type UseControllableStateProps<TValue> = {
  /** Controlled value; when defined, the hook never stores its own state. */
  value?: TValue;
  /** Initial value used while uncontrolled. */
  defaultValue: TValue;
  /** Called on every change, controlled or not. */
  onChange?: (value: TValue) => void;
};

/**
 * State that is either controlled by a `value` prop or kept locally,
 * notifying `onChange` in both cases.
 *
 * @example
 * const [open, setOpen] = useControllableState({
 *   value: props.open,
 *   defaultValue: false,
 *   onChange: props.onOpenChange,
 * });
 */
export const useControllableState = <TValue>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<TValue>): [TValue, (value: TValue) => void] => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  // Read the latest value in the setter without recreating it.
  const currentValueRef = useRef(currentValue);
  currentValueRef.current = currentValue;

  const setValue = (nextValue: TValue) => {
    if (Object.is(nextValue, currentValueRef.current)) return;

    currentValueRef.current = nextValue;

    if (!isControlled) setUncontrolledValue(nextValue);

    onChange?.(nextValue);
  };

  return [currentValue, setValue];
};
