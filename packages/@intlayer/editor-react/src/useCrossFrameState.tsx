'use client';

import type { MessageKey } from '@intlayer/editor';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

/**
 * Returns the latest value another frame posted under `key`.
 */
export const useCrossFrameState = <Value,>(
  key: `${MessageKey}`,
  initialValue: Value
): Value => {
  const manager = useEditorStateManager();
  const [value, setValue] = useState<Value>(initialValue);

  useEffect(
    () =>
      manager?.messenger.subscribe<Value>(`${key}/post`, (postedValue) =>
        setValue(() => postedValue)
      ),
    [manager, key]
  );

  return value;
};
