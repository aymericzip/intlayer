'use client';

import { type Locales } from '@intlayer/config';
import {
  type KeyPath,
  type Dictionary,
  getContentNodeByKeyPath,
} from '@intlayer/core';
import { useFocusDictionary, useEditedContent } from '@intlayer/editor-react';
import { RotateCcw, X } from 'lucide-react';
import { useMemo, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import {
  camelCaseToSentence,
  sentenceToCamelCase,
} from '../../../utils/camelCase';
import { Button } from '../../Button';
import { EditableFieldInput } from '../../EditableField';
import { Label } from '../../Label';
import { editorViewContent } from '../editorView.content';
import { getIsEditableSection } from '../getIsEditableSection';
import { NodeTypeSelector } from '../NodeTypeSelector';
import { TextEditor } from './TextEditor';

type EditorViewProps = {
  dictionaryKey: string;
  dictionary: Dictionary;
  locales: Locales[];
};

export const EditorView: FC<EditorViewProps> = ({
  dictionaryKey,
  dictionary,
  locales,
}) => {
  const { focusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  const keyPath = focusedContent?.keyPath ?? [];
  const initialKeyName = keyPath[keyPath.length - 1]?.key ?? '';
  const { titleInput, deleteButton, nodeTypeSelector, restoreButton } =
    useDictionary(editorViewContent);
  const {
    editedContent,
    renameEditedContent,
    addEditedContent,
    removeEditedContent,
  } = useEditedContent();

  const editedSection = editedContent?.[dictionaryKey]?.content
    ? getContentNodeByKeyPath(editedContent?.[dictionaryKey].content, keyPath)
    : undefined;

  const dictionarySection = getContentNodeByKeyPath(
    dictionary.content,
    keyPath
  );

  const section = editedSection ?? dictionarySection;

  const isEdited = useMemo(
    () =>
      editedSection &&
      JSON.stringify(editedSection) !== JSON.stringify(dictionarySection),
    [editedSection, dictionarySection]
  );

  const isEditableSection = getIsEditableSection(section);

  const handleRenameNodeKey = (keyName: string) => {
    const camelCaseSentence = sentenceToCamelCase(keyName);
    renameEditedContent(dictionaryKey, camelCaseSentence, keyPath);
    const prevKeyPath: KeyPath[] = keyPath.slice(0, -1);
    const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];
    const newKeyPath: KeyPath[] = [
      ...prevKeyPath,
      { ...lastKeyPath, key: camelCaseSentence } as KeyPath,
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
          dictionary={dictionary}
          locales={locales}
        />
      )}

      {keyPath.length > 0 ? (
        <form
          className="bg-text text-text-dark dark:bg-text-dark dark:text-text flex w-full flex-col items-start justify-between gap-6 px-4 py-2"
          key={JSON.stringify(focusedContent?.keyPath)}
        >
          <div className="flex w-full flex-wrap items-start justify-between gap-6">
            {typeof initialKeyName === 'string' && (
              <div className="flex flex-col gap-3">
                <Label>{titleInput.label}</Label>
                <div className="flex flex-wrap items-center gap-4">
                  <EditableFieldInput
                    name="key"
                    aria-label="Key"
                    key={initialKeyName}
                    placeholder={titleInput.placeholder}
                    defaultValue={camelCaseToSentence(initialKeyName)}
                    onSave={(value) => handleRenameNodeKey(value)}
                    className="h-8"
                    variant="invisible"
                  />
                  <span className="text-neutral dark:text-neutral-dark text-sm">
                    ({initialKeyName})
                  </span>
                </div>
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
            <div className="ml-auto flex gap-2">
              {isEdited && (
                <Button
                  label={restoreButton.label}
                  variant="outline"
                  color="text-inverse"
                  Icon={RotateCcw}
                  onClick={() => removeEditedContent(dictionaryKey, keyPath)}
                >
                  {restoreButton.text}
                </Button>
              )}
              <Button
                label={deleteButton.label}
                variant="outline"
                color="error"
                Icon={X}
                onClick={() => {
                  addEditedContent(dictionaryKey, undefined, keyPath);

                  const parentKeyPath: KeyPath[] = keyPath.slice(0, -1);
                  setFocusedContentKeyPath(parentKeyPath);
                }}
              >
                {deleteButton.text}
              </Button>
            </div>
          )}
        </form>
      ) : (
        <span className="h-8"></span>
      )}
    </>
  );
};
