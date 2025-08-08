'use client';

import type { KeyPath } from '@intlayer/core';
import { cn } from '@utils/cn';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type LongPressMessageProps =
  | {
      dictionaryKey?: string;
      keyPath?: KeyPath[];
    }
  | undefined
  | null;

export const LongPressMessage: FC<LongPressMessageProps> = (props) => {
  const { message } = useIntlayer('long-press-message');

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
