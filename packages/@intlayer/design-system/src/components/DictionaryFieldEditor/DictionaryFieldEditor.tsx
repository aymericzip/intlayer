'use client';

import { Locales } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { ArrowLeft } from 'lucide-react';
import { useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../Button';
import { Container } from '../Container';
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
  mode: 'local' | 'remote';
};

enum EditorViewType {
  ContentEditor,
  StructureEditor,
  JSONEditor,
}

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onClickDictionaryList,
  isDarkMode,
  availableLocales,
  mode,
}) => {
  const [editorView, setEditorView] = useState<EditorViewType>(
    EditorViewType.ContentEditor
  );
  const { returnToDictionaryList, titleContent, titleInformation } =
    useDictionary(dictionaryFieldEditorContent);

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

        {mode === 'remote' && (
          <Container
            className="flex size-full justify-center gap-10 p-6"
            roundedSize="xl"
          >
            <H2>{titleInformation}</H2>

            <DictionaryDetailsForm dictionary={dictionary} mode={mode} />
          </Container>
        )}

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
            className="m-auto w-full max-w-2xl"
            choices={[
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
            ]}
          />
          {editorView === EditorViewType.ContentEditor && (
            <NodeEditor dictionary={dictionary} locales={availableLocales} />
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
