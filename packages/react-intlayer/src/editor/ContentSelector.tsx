'use client';

import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import { createElement, type FC, type HTMLAttributes } from 'react';

export type ContentSelectorProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const ContentSelector: FC<ContentSelectorProps> = ({
  children,
  dictionaryKey,
  keyPath,
}) => {
  if (isEnabled) {
    return createElement(
      'intlayer-content-selector-wrapper',
      {
        'key-path': JSON.stringify(keyPath),
        'dictionary-key': dictionaryKey,
      },
      children
    );
  }

  return children;
};
