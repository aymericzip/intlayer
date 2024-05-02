'use client';

import type { FC } from 'react';
import { PressableDiv } from '../PressableDiv';

type ContentEditorProps = {
  children: string;
  onSelect: () => void;
  onUnselect?: () => void;
};

export const ContentSelector: FC<ContentEditorProps> = ({
  children,
  onSelect,
  onUnselect,
}) => {
  return (
    <PressableDiv onPress={onSelect} onClickOutside={onUnselect}>
      {children}
    </PressableDiv>
  );
};
