'use client';

import { type KeyPath } from '@intlayer/core';
import { type FC, type ReactNode } from 'react';

export type ContentSelectorWrapperProps = {
  children: ReactNode;
  dictionaryId: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
};

export const ContentSelectorWrapper: FC<ContentSelectorWrapperProps> = ({
  children,
}) => <>{children}</>;
