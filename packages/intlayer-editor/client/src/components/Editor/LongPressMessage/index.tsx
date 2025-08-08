'use client';

import type { KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { cn } from '../../../utils/cn';
import longPressMessageContent from './index.content';

type LongPressMessageProps =
  | {
      dictionaryKey?: string;
      keyPath?: KeyPath[];
    }
  | undefined
  | null;

export const LongPressMessage: FC<LongPressMessageProps> = (props) => {
  const { message } = useDictionary(longPressMessageContent);

  return (
    <div
      className={cn(
        'bg-neutral/30 py-1 px-3 rounded-2xl font-bold text-text text-sm transition-opacity duration-100',
        props?.dictionaryKey ? 'opacity-100' : 'opacity-0'
      )}
    >
      {props?.dictionaryKey
        ? message({ dictionaryKey: props.dictionaryKey })
        : ''}
    </div>
  );
};
