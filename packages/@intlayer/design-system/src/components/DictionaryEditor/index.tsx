import type { Locales } from '@intlayer/config/client';
import type { ContentModule, ContentValue, KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { ItemWrapper } from './ItemWrapper';

interface DictionaryEditorProps {
  dictionary: ContentModule;
  onContentChange: (content: {
    keyPath: KeyPath[];
    newValue: string;
    dictionaryPath: string;
  }) => void;
  locale: Locales;
  focusedKeyPath?: KeyPath[];
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  onContentChange,
  focusedKeyPath,
  ...props
}) => (
  <ItemWrapper
    {...props}
    keyPath={[]}
    focusedKeyPath={focusedKeyPath}
    section={dictionary as ContentValue}
    onContentChange={({ keyPath, newValue }) =>
      onContentChange({
        keyPath,
        newValue,
        dictionaryPath: dictionary.filePath!,
      })
    }
  />
);
