import type { KeyPath } from '@intlayer/core';
import { ContentSelectorWrapper } from './ContentSelectorWrapper';

export const renderContentEditor = (
  content: string,
  dictionaryId: string,
  dictionaryPath: string,
  keyPath: KeyPath[]
) => (
  <ContentSelectorWrapper
    dictionaryId={dictionaryId}
    dictionaryPath={dictionaryPath}
    keyPath={keyPath}
  >
    {content}
  </ContentSelectorWrapper>
);
