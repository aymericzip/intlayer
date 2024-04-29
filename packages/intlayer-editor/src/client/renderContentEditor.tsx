import type { KeyPath } from '../server/types';
import { ContentEditor } from './ContentEditor';

export const renderContentEditor = (
  content: string,
  dictionaryPath: string,
  keyPath: KeyPath[]
) => (
  <ContentEditor dictionaryPath={dictionaryPath} keyPath={keyPath}>
    {content}
  </ContentEditor>
);
