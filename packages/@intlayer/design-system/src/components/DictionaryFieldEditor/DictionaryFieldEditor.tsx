'use client';

import type { Dictionary } from '@intlayer/core';
import {
  useConfiguration,
  useDictionariesRecordActions,
  useFocusDictionaryActions,
} from '@intlayer/editor-react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../Button';
import { LocaleSwitcherContentProvider } from '../LocaleSwitcherContentDropDown';
import { SwitchSelector } from '../SwitchSelector';
import { ContentEditor } from './ContentEditor';
import { DictionaryDetailsForm } from './DictionaryDetails/DictionaryDetailsForm';
import { dictionaryFieldEditorContent } from './dictionaryFieldEditor.content';
import { JSONEditor } from './JSONEditor';
import { SaveForm } from './SaveForm/SaveForm';
import { StructureEditor } from './StructureEditor';

type DictionaryFieldEditorProps = {
  dictionary: Dictionary;
  onClickDictionaryList?: () => void;
  onDelete?: () => void;
  isDarkMode?: boolean;
  mode: ('local' | 'remote')[];
};

enum EditorViewType {
  DetailsEditor,
  ContentEditor,
  StructureEditor,
  JSONEditor,
}

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onClickDictionaryList,
  isDarkMode,
  mode,
  onDelete,
}) => {
  const config = useConfiguration();
  const [editorView, setEditorView] = useState<EditorViewType>(
    EditorViewType.ContentEditor
  );
  const { returnToDictionaryList } = useDictionary(
    dictionaryFieldEditorContent
  );
  const { setFocusedContent } = useFocusDictionaryActions();
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    // Focus the dictionary if not focused
    setFocusedContent((prev) => ({
      ...(prev ?? {}),
      dictionaryKey: dictionary.key,
    }));
    setLocaleDictionaries((prev) => ({
      ...prev,
      [dictionary.key]: dictionary,
    }));
  }, []);

  return (
    <LocaleSwitcherContentProvider
      availableLocales={config?.internationalization.locales ?? []}
    >
      <div className="flex size-full flex-col gap-6 px-2">
        <Button
          onClick={onClickDictionaryList}
          variant="hoverable"
          className="z-10 ml-5 mr-auto"
          color="text"
          Icon={ArrowLeft}
          label={returnToDictionaryList.label.value}
        >
          {returnToDictionaryList.text}
        </Button>

        <SwitchSelector
          defaultValue={editorView}
          onChange={(value) => setEditorView(value)}
          color="text"
          size="sm"
          className="m-auto w-full max-w-xl"
          choices={[
            {
              content: 'Details',
              value: EditorViewType.DetailsEditor,
            },
            {
              content: 'Structure',
              value: EditorViewType.StructureEditor,
            },
            {
              content: 'Content',
              value: EditorViewType.ContentEditor,
            },
            {
              content: 'JSON',
              value: EditorViewType.JSONEditor,
            },
          ].filter(
            ({ value }) =>
              !(
                !mode.includes('remote') &&
                value === EditorViewType.DetailsEditor
              )
          )}
        />

        {editorView === EditorViewType.DetailsEditor && (
          <DictionaryDetailsForm dictionary={dictionary} />
        )}
        {editorView === EditorViewType.StructureEditor && (
          <StructureEditor dictionary={dictionary} />
        )}
        {editorView === EditorViewType.ContentEditor && (
          <ContentEditor dictionary={dictionary} isDarkMode={isDarkMode} />
        )}
        {editorView === EditorViewType.JSONEditor && (
          <JSONEditor dictionary={dictionary} isDarkMode={isDarkMode} />
        )}

        <SaveForm
          dictionary={dictionary}
          mode={mode}
          onDelete={() => {
            setFocusedContent(null);
            onDelete?.();
          }}
        />
      </div>
    </LocaleSwitcherContentProvider>
  );
};
