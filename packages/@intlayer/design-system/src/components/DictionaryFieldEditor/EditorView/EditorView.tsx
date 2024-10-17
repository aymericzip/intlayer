'use client';

import { type KeyPath, type Dictionary } from '@intlayer/core';
import { Check, X } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { getDictionaryValueByKeyPath } from '../../../utils/dictionary';
import { Button } from '../../Button';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../../DictionaryEditor';
import { Input } from '../../Input';
import { editorViewContent } from '../editorView.content';
import { getIsEditableSection } from '../getIsEditableSection';
import { NodeTypeSelector } from '../NodeTypeSelector';
import { TextEditor } from './TextEditor';

type EditorViewProps = {
  keyPath: KeyPath[];
  dictionaryId: string;
  dictionary: Dictionary;
};

export const EditorView: FC<EditorViewProps> = ({
  keyPath,
  dictionaryId,
  dictionary,
}) => {
  const initialKeyName = keyPath[keyPath.length - 1]?.key ?? '';
  const [keyName, setKeyName] = useState<string | number>(initialKeyName);
  const isKeyNameEdited = keyName !== initialKeyName;
  const { titleInput, titleValidationButton } =
    useDictionary(editorViewContent);

  const { editedContent, renameEditedContent, addEditedContent } =
    useEditedContentStore((s) => ({
      editedContent: s.editedContent,
      renameEditedContent: s.renameEditedContent,
      addEditedContent: s.addEditedContent,
    }));
  const { setFocusedContentKeyPath } = useEditionPanelStore((s) => ({
    setFocusedContentKeyPath: s.setFocusedContentKeyPath,
  }));

  const section =
    getDictionaryValueByKeyPath(editedContent[dictionaryId], keyPath) ??
    getDictionaryValueByKeyPath(dictionary, keyPath);
  const isEditableSection = getIsEditableSection(section);

  useEffect(() => {
    setKeyName(initialKeyName);
  }, [initialKeyName]);

  return (
    <>
      {isEditableSection && (
        <TextEditor
          key={keyPath.join('.')}
          keyPath={keyPath}
          section={section}
          dictionaryId={dictionaryId}
        />
      )}

      {keyPath.length > 0 ? (
        <form className="bg-text text-text-dark dark:bg-text-dark dark:text-text flex w-full items-start justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-1" key={initialKeyName}>
            {keyPath.length > 0 && (
              <Button
                label="Remove key from section"
                variant="hoverable"
                size="icon"
                color="text-inverse"
                Icon={X}
                className="w-16"
                onClick={() => {
                  addEditedContent(dictionaryId, undefined, keyPath);

                  const parentKeyPath: KeyPath[] = keyPath.slice(0, -1);
                  setFocusedContentKeyPath(parentKeyPath);
                }}
              />
            )}
            <Input
              name="key"
              aria-label="Key"
              placeholder={titleInput.placeholder.value}
              defaultValue={initialKeyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="h-8"
              variant="invisible"
            />
            {isKeyNameEdited && (
              <Button
                type="submit"
                color="text-inverse"
                variant="hoverable"
                isLoading={false}
                label={titleValidationButton.label.value}
                onClick={() => {
                  renameEditedContent(dictionaryId, keyName, keyPath);

                  const prevKeyPath: KeyPath[] = keyPath.slice(0, -1);
                  const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];

                  const newKeyPath: KeyPath[] = [
                    ...prevKeyPath,
                    { ...lastKeyPath, key: keyName } as KeyPath,
                  ];

                  setFocusedContentKeyPath(newKeyPath);
                }}
              >
                <Check className="size-4" />
              </Button>
            )}
          </div>
          <NodeTypeSelector
            keyPath={keyPath}
            dictionaryId={dictionaryId}
            section={section}
          />
        </form>
      ) : (
        <span className="h-8"></span>
      )}
    </>
  );
};
