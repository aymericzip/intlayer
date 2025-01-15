import { type KeyPath } from '@intlayer/core';
import { type PropsWithChildren, type FC } from 'react';

export type ContentSelectorWrapperProps = PropsWithChildren<{
  dictionaryKey: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
}>;

export const ContentSelectorWrapper: FC<ContentSelectorWrapperProps> = ({
  children,
}) => <>{children}</>;
