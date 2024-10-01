'use client';

import type { Locales } from '@intlayer/config/client';
import type { KeyPath, Dictionary } from '@intlayer/core';
import { Check } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { getDictionaryValueByKeyPath } from '../../utils/dictionary';
import { Button } from '../Button';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../DictionaryEditor';
import { Input } from '../Input';
import { editorViewContent } from './editorView.content';
import { NodeTypeSelector } from './NodeTypeSelector';
import { NodeWrapper } from './NodeWrapper';

type EditorViewProps = {
  keyPath: KeyPath[];
  dictionaryId: string;
  locale: Locales;
  dictionary: Dictionary;
};

export const EditorView: FC<EditorViewProps> = ({
  keyPath,
  dictionaryId,
  locale,
  dictionary,
}) => {
  const initialKeyName = keyPath[keyPath.length - 1]?.key ?? '';
  const [keyName, setKeyName] = useState<string | number>(initialKeyName);
  const isKeyNameEdited = keyName !== initialKeyName;
  const { titleInput, titleValidationButton } =
    useDictionary(editorViewContent);

  const { editedContent, renameEditedContent } = useEditedContentStore((s) => ({
    editedContent: s.editedContent,
    renameEditedContent: s.renameEditedContent,
  }));
  const { setFocusedContentKeyPath } = useEditionPanelStore((s) => ({
    setFocusedContentKeyPath: s.setFocusedContentKeyPath,
  }));

  const section =
    getDictionaryValueByKeyPath(editedContent[dictionaryId], keyPath) ??
    getDictionaryValueByKeyPath(dictionary, keyPath);
  const isEditableSection = typeof section === 'string';

  useEffect(() => {
    setKeyName(initialKeyName);
  }, [initialKeyName]);

  return (
    <>
      {isEditableSection && (
        <div className="border-text dark:border-text-dark flex min-h-44 w-full items-start overflow-x-auto border-t-[1.5px] p-2">
          <NodeWrapper
            key={keyPath.join('.')}
            keyPath={keyPath}
            section={section}
            locale={locale}
            dictionaryId={dictionaryId}
          />
        </div>
      )}

      {keyPath.length > 0 ? (
        <form className="bg-text dark:bg-text-dark text-text-dark dark:text-text flex w-full items-start justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-1" key={initialKeyName}>
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
