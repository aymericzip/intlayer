'use client';

import { Dictionary } from '@intlayer/core';
import { useEffect, type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { Container } from '../Container';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../DictionaryEditor';
import { EditorView } from './EditorView/EditorView';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NavigationViewNode } from './NavigationView/NavigationViewNode';
import { SaveForm } from './SaveForm/SaveForm';

type NodeEditorProps = {
  dictionary: Dictionary;
};

export const NodeEditor: FC<NodeEditorProps> = ({ dictionary }) => {
  const { content: dictionaryContent, key } = dictionary;
  const { editedContent, dictionaryRecord, setDictionariesRecord } =
    useEditedContentStore((s) => ({
      editedContent: s.editedContent,
      dictionaryRecord: s.dictionariesRecord,
      setDictionariesRecord: s.setDictionariesRecord,
    }));

  const { focusedContent, setFocusedContentKeyPath } = useEditionPanelStore(
    (s) => ({
      focusedContent: s.focusedContent,
      setFocusedContentKeyPath: s.setFocusedContentKeyPath,
    })
  );

  const focusedKeyPath = focusedContent?.keyPath;

  const section = editedContent[key]?.content ?? dictionaryContent;

  useEffect(() => {
    if (dictionaryRecord[key]) return;

    setDictionariesRecord({
      [key]: dictionary,
    });
  }, [dictionary, key, setDictionariesRecord, dictionaryRecord]);

  return (
    <>
      <KeyPathBreadcrumb
        dictionaryKey={key}
        keyPath={focusedKeyPath ?? []}
        onClickKeyPath={setFocusedContentKeyPath}
      />
      <div className="flex gap-2 max-md:flex-col">
        <Container
          border
          background={false}
          className="top-6 flex h-full flex-col items-start gap-0.5 overflow-auto p-2 md:sticky md:max-w-[50%]"
          roundedSize="xl"
        >
          <NavigationViewNode
            keyPath={[]}
            section={section}
            dictionaryKey={key}
          />
        </Container>
        <div className="top-6 flex h-full flex-1 flex-col gap-6 md:sticky">
          {(focusedKeyPath?.length ?? 0) > 0 && (
            <Container
              border
              background={false}
              className="h-full flex-1 overflow-hidden"
              roundedSize="xl"
            >
              <EditorView dictionary={dictionary} dictionaryKey={key} />
            </Container>
          )}
          <SaveForm dictionary={dictionary} />
        </div>
      </div>
    </>
  );
};
