'use client';

import type { FC, ReactNode } from 'react';
import { PressableDiv } from '../PressableDiv';

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
  <PressableDiv
    onPress={onSelect}
    onClickOutside={onUnselect}
    isSelecting={isSelecting}
  >
    {children}
  </PressableDiv>
);
