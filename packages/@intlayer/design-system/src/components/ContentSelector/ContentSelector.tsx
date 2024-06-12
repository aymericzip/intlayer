'use client';

import type { FC, ReactNode } from 'react';
import { Popover } from '../Popover';
import { PressableDiv } from '../PressableDiv';

type ContentSelectorProps = {
  children: ReactNode;
  onSelect: () => void;
  onUnselect?: () => void;
  isSelecting?: boolean;
  popoverContent?: string;
};

export const ContentSelector: FC<ContentSelectorProps> = ({
  children,
  onSelect,
  onUnselect,
  isSelecting,
  popoverContent = 'Long press',
}) => (
  <Popover content={popoverContent}>
    <PressableDiv
      onPress={onSelect}
      onClickOutside={onUnselect}
      isSelecting={isSelecting}
    >
      {children}
    </PressableDiv>
  </Popover>
);
