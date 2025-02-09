'use client';

import { Dictionary } from '@intlayer/core';
import {
  useConfiguration,
  useDictionariesRecordActions,
  useFocusDictionaryActions,
} from '@intlayer/editor-react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../Button';
import { Container } from '../Container';
import { H2 } from '../Headers';
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
  isDarkMode?: boolean;
  mode: 'local' | 'remote';
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
  }, [dictionary, setFocusedContent, setLocaleDictionaries]);

  return (
    <LocaleSwitcherContentProvider
      availableLocales={config.internationalization.locales ?? []}
    >
      <div className="flex size-full flex-1 flex-col gap-10">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onClickDictionaryList?.()}
            variant="hoverable"
            size="icon-md"
            color="text"
            id="return-to-dictionary-list"
            Icon={ArrowLeft}
            label={returnToDictionaryList.label.value}
          />
          <label
            className="cursor-pointer text-xs hover:underline"
            htmlFor="return-to-dictionary-list"
          >
            {returnToDictionaryList.text}
          </label>
        </div>

        <Container
          className="flex size-full justify-center gap-10 p-6"
          roundedSize="xl"
        >
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
                content: 'Content',
                value: EditorViewType.ContentEditor,
              },
              {
                content: 'Structure',
                value: EditorViewType.StructureEditor,
              },
              {
                content: 'JSON',
                value: EditorViewType.JSONEditor,
              },
            ].filter(
              ({ value }) =>
                !(mode === 'local' && value === EditorViewType.DetailsEditor)
            )}
          />
          {editorView === EditorViewType.DetailsEditor && (
            <DictionaryDetailsForm dictionary={dictionary} mode={mode} />
          )}
          {editorView === EditorViewType.ContentEditor && (
            <ContentEditor dictionary={dictionary} />
          )}
          {editorView === EditorViewType.StructureEditor && (
            <StructureEditor dictionary={dictionary} />
          )}
          {editorView === EditorViewType.JSONEditor && (
            <JSONEditor dictionary={dictionary} isDarkMode={isDarkMode} />
          )}
          <SaveForm dictionary={dictionary} mode={mode} />
        </Container>
      </div>
    </LocaleSwitcherContentProvider>
  );
};
