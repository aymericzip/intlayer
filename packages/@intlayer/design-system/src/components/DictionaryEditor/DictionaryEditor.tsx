'use client';

import {
  useEditedContent,
  useEditorLocale,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Locale } from '@intlayer/types/allLocales';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { FC } from 'react';
import { NodeWrapper } from './NodeWrapper';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  onDelete?: () => void;
};

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  ...props
}) => {
  const locale = useEditorLocale();
  const { editedContent, addEditedContent } = useEditedContent();
  const { focusedContent, setFocusedContentKeyPath } =
    useFocusUnmergedDictionary();

  return (
    <div className="flex flex-col gap-2">
      <NodeWrapper
        {...props}
        keyPath={[]}
        locale={locale as Locale}
        dictionary={dictionary}
        key={`${JSON.stringify(
          (editedContent?.[dictionary.localId!] ?? dictionary).content
        )}${locale}`}
        editedContent={editedContent?.[dictionary.localId!]?.content}
        focusedKeyPath={focusedContent?.keyPath}
        section={dictionary.content}
        onContentChange={(content) => {
          addEditedContent(
            dictionary.localId!,
            content.newValue,
            content.keyPath
          );
        }}
        onFocusKeyPath={setFocusedContentKeyPath}
      />
    </div>
  );
};
