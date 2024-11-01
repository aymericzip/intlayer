'use client';

import { type KeyPath, type Dictionary } from '@intlayer/core';
import { X } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { EditableFieldInput } from '../..//EditableField';
import { getDictionaryValueByKeyPath } from '../../../utils/dictionary';
import { Button } from '../../Button';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../../DictionaryEditor';
import { Label } from '../../Label';
import { editorViewContent } from '../editorView.content';
import { getIsEditableSection } from '../getIsEditableSection';
import { NodeTypeSelector } from '../NodeTypeSelector';
import { TextEditor } from './TextEditor';

type EditorViewProps = {
  dictionaryKey: string;
  dictionary: Dictionary;
};

export const EditorView: FC<EditorViewProps> = ({
  dictionaryKey,
  dictionary,
}) => {
  const { focusedContent, setFocusedContentKeyPath } = useEditionPanelStore(
    (s) => ({
      setFocusedContentKeyPath: s.setFocusedContentKeyPath,
      focusedContent: s.focusedContent,
    })
  );
  const keyPath = focusedContent?.keyPath ?? [];
  const initialKeyName = keyPath[keyPath.length - 1]?.key ?? '';
  const { titleInput, deleteButton, nodeTypeSelector } =
    useDictionary(editorViewContent);

  const { editedContent, renameEditedContent, addEditedContent } =
    useEditedContentStore((s) => ({
      editedContent: s.editedContent,
      renameEditedContent: s.renameEditedContent,
      addEditedContent: s.addEditedContent,
    }));

  const section = editedContent[dictionaryKey]?.content
    ? getDictionaryValueByKeyPath(editedContent[dictionaryKey].content, keyPath)
    : getDictionaryValueByKeyPath(dictionary.content, keyPath);

  const isEditableSection = getIsEditableSection(section);

  const handleRenameNodeKey = (keyName: string) => {
    renameEditedContent(dictionaryKey, keyName, keyPath);

    const prevKeyPath: KeyPath[] = keyPath.slice(0, -1);
    const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];

    const newKeyPath: KeyPath[] = [
      ...prevKeyPath,
      { ...lastKeyPath, key: keyName } as KeyPath,
    ];

    setFocusedContentKeyPath(newKeyPath);
  };

  return (
    <>
      {isEditableSection && (
        <TextEditor
          key={keyPath.join('.')}
          keyPath={keyPath}
          section={section}
          dictionaryKey={dictionaryKey}
        />
      )}
      {keyPath.length > 0 ? (
        <form
          className="bg-text text-text-dark dark:bg-text-dark dark:text-text flex w-full flex-col items-start justify-between gap-6 px-4 py-2"
          key={JSON.stringify(focusedContent?.keyPath)}
        >
          <div className="flex w-full items-start justify-between gap-2">
            {typeof initialKeyName === 'string' && (
              <div>
                <Label>{titleInput.label}</Label>
                <EditableFieldInput
                  name="key"
                  aria-label="Key"
                  placeholder={titleInput.placeholder.value}
                  defaultValue={initialKeyName}
                  onChange={handleRenameNodeKey}
                  className="h-8"
                  variant="invisible"
                />
              </div>
            )}

            <div>
              <Label>{nodeTypeSelector.label}</Label>

              <NodeTypeSelector
                keyPath={keyPath}
                dictionaryKey={dictionaryKey}
                section={section}
              />
            </div>
          </div>
          {keyPath.length > 0 && (
            <Button
              label={deleteButton.label.value}
              variant="outline"
              color="error"
              className="ml-auto"
              Icon={X}
              onClick={() => {
                addEditedContent(dictionaryKey, undefined, keyPath);

                const parentKeyPath: KeyPath[] = keyPath.slice(0, -1);
                setFocusedContentKeyPath(parentKeyPath);
              }}
            >
              {deleteButton.text}
            </Button>
          )}
        </form>
      ) : (
        <span className="h-8"></span>
      )}
    </>
  );
};
