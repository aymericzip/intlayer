'use client';

import { type Locales } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { useEffect, type FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Container } from '../Container';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../DictionaryEditor';
import { LocaleSwitcherContent } from '../LocaleSwitcherContentDropDown';
import { EditorView } from './EditorView/EditorView';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NavigationViewNode } from './NavigationView/NavigationViewNode';

type NodeEditorProps = {
  dictionary: Dictionary;
  locales: Locales[];
};

export const NodeEditor: FC<NodeEditorProps> = ({ dictionary, locales }) => {
  const { content: dictionaryContent, key } = dictionary;
  const { editedContent, dictionaryRecord, setDictionariesRecord } =
    useEditedContentStore(
      useShallow((s) => ({
        editedContent: s.editedContent,
        dictionaryRecord: s.dictionariesRecord,
        setDictionariesRecord: s.setDictionariesRecord,
      }))
    );

  const { focusedContent, setFocusedContentKeyPath } = useEditionPanelStore(
    useShallow((s) => ({
      focusedContent: s.focusedContent,
      setFocusedContentKeyPath: s.setFocusedContentKeyPath,
    }))
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
      <div className="flex items-center justify-between gap-2">
        <KeyPathBreadcrumb
          dictionaryKey={key}
          keyPath={focusedKeyPath ?? []}
          onClickKeyPath={setFocusedContentKeyPath}
        />
        <div className="flex items-center gap-2">
          <LocaleSwitcherContent />
        </div>
      </div>

      <div className="flex gap-2 max-md:flex-col">
        <Container
          border
          background={false}
          className="top-6 flex h-full flex-col items-start gap-0.5 overflow-auto p-2 md:sticky md:max-w-[50%]"
          roundedSize="xl"
          transparency="sm"
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
              <EditorView
                dictionary={dictionary}
                dictionaryKey={key}
                locales={locales}
              />
            </Container>
          )}
        </div>
      </div>
    </>
  );
};
