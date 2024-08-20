'use client';

import type { FC, ReactNode } from 'react';
import { PressableSpan } from '../PressableSpan';

type ContentSelectorProps = {
  children: ReactNode;
  onSelect: () => void;
  onUnselect?: () => void;
  isSelecting?: boolean;
};

export const ContentSelector: FC<ContentSelectorProps> = ({
  children,
  onSelect,
  onUnselect,
  isSelecting,
}) => (
  <PressableSpan
    onPress={onSelect}
    onClickOutside={onUnselect}
    isSelecting={isSelecting}
  >
    {children}
  </PressableSpan>
);
