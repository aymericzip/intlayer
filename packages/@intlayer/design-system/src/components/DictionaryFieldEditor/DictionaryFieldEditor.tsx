'use client';

import { Locales } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '../Button';
import { Container } from '../Container';
import { useEditedContentStore } from '../DictionaryEditor';
import { H2 } from '../Headers';
import { LocaleSwitcherContentProvider } from '../LocaleSwitcherContentDropDown';
import { SwitchSelector } from '../SwitchSelector';
import { DictionaryDetailsForm } from './DictionaryDetails/DictionaryDetailsForm';
import { dictionaryFieldEditorContent } from './dictionaryFieldEditor.content';
import { JSONEditor } from './JSONEditor';
import { NodeEditor } from './NodeEditor';
import { SaveForm } from './SaveForm/SaveForm';

type DictionaryFieldEditorProps = {
  dictionary: Dictionary;
  onClickDictionaryList?: () => void;
  isDarkMode?: boolean;
  availableLocales: Locales[];
};

enum EditorViewType {
  NodeEditor,
  JSONEditor,
}

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onClickDictionaryList,
  isDarkMode,
  availableLocales,
}) => {
  const { key } = dictionary;
  const [editorView, setEditorView] = useState<EditorViewType>(
    EditorViewType.NodeEditor
  );
  const { dictionaryRecord, setDictionariesRecord } = useEditedContentStore(
    useShallow((s) => ({
      editedContent: s.editedContent,
      dictionaryRecord: s.dictionariesRecord,
      setDictionariesRecord: s.setDictionariesRecord,
    }))
  );
  const { returnToDictionaryList, titleContent, titleInformation } =
    useDictionary(dictionaryFieldEditorContent);

  useEffect(() => {
    if (dictionaryRecord[key]) return;

    setDictionariesRecord({
      [key]: dictionary,
    });
  }, [dictionary, key, setDictionariesRecord, dictionaryRecord]);

  return (
    <LocaleSwitcherContentProvider availableLocales={availableLocales}>
      <div className="flex size-full flex-1 flex-col gap-10">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onClickDictionaryList?.()}
            variant="hoverable"
            size="icon-md"
            color="text"
            id="return-to-dictionary-list"
            Icon={ArrowLeft}
            label={returnToDictionaryList.label}
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
          <H2>{titleInformation}</H2>

          <DictionaryDetailsForm dictionary={dictionary} />
        </Container>

        <Container
          className="flex size-full justify-center gap-10 p-6"
          roundedSize="xl"
        >
          <H2>{titleContent}</H2>
          <SwitchSelector
            defaultValue={editorView}
            onChange={(value) => setEditorView(value)}
            color="text"
            size="sm"
            className="ml-auto"
            choices={[
              {
                content: 'Node editor',
                value: EditorViewType.NodeEditor,
              },
              {
                content: 'JSON editor',
                value: EditorViewType.JSONEditor,
              },
            ]}
          />
          {editorView === EditorViewType.NodeEditor && (
            <NodeEditor dictionary={dictionary} locales={availableLocales} />
          )}
          {editorView === EditorViewType.JSONEditor && (
            <JSONEditor dictionary={dictionary} isDarkMode={isDarkMode} />
          )}
          <SaveForm dictionary={dictionary} />
        </Container>
      </div>
    </LocaleSwitcherContentProvider>
  );
};
