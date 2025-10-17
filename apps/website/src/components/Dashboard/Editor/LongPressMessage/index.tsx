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
        'rounded-2xl bg-neutral/30 px-3 py-1 font-bold text-sm text-text transition-opacity duration-100',
        props?.dictionaryKey ? 'opacity-100' : 'opacity-0'
      )}
    >
      {props?.dictionaryKey
        ? message({ dictionaryKey: props.dictionaryKey })
        : ''}
    </div>
  );
};
