'use client';

import type { FC, ReactNode } from 'react';
import { Popover } from '../Popover';
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
  <Popover content="Long pless to edit">
    <PressableDiv
      onPress={onSelect}
      onClickOutside={onUnselect}
      isSelecting={isSelecting}
    >
      {children}
    </PressableDiv>
  </Popover>
);
