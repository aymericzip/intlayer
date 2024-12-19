'use client';

import { Locales } from '@intlayer/config';
import {
  RightDrawer,
  Button,
  useEditedContentStore,
  useEditionPanelStore,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { ChevronRight } from 'lucide-react';
import { useCallback, useMemo, FC } from 'react';
import { useShallow } from 'zustand/shallow';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { dictionaryListDrawerIdentifier } from './dictionaryListDrawerIdentifier';

export const DictionaryListDrawer: FC = () => {
  const { all: dictionaries } = useGetAllDictionaries();
  const dictionaryKeyList = useMemo(
    () => Object.keys(dictionaries) as Locales[],
    [dictionaries]
  );

  const { closeDrawer, openDrawer } = useRightDrawerStore(
    useShallow((s) => ({
      closeDrawer: s.close,
      openDrawer: s.open,
    }))
  );

  const editedContent = useEditedContentStore(
    useShallow((s) => s.editedContent)
  );
  const setFocusedContent = useEditionPanelStore(
    useShallow((s) => s.setFocusedContent)
  );

  const handleClickDictionary = (dictionaryKey: string) => {
    closeDrawer(dictionaryListDrawerIdentifier);

    const { filePath } = dictionaries[dictionaryKey];
    setFocusedContent({
      dictionaryKey,
      dictionaryPath: filePath,
    });

    openDrawer(getDrawerIdentifier(dictionaryKey));
  };

  const isDictionaryEdited = useCallback(
    (dictionaryKey: string) =>
      Object.keys(editedContent).includes(dictionaryKey),
    [editedContent]
  );

  return (
    <>
      <RightDrawer
        title="Dictionary list"
        identifier={dictionaryListDrawerIdentifier}
      >
        {dictionaryKeyList.map((dictionaryKey) => (
          <div key={dictionaryKey}>
            <Button
              label={`Open dictionary editor ${dictionaryKey}`}
              onClick={() => handleClickDictionary(dictionaryKey)}
              variant="hoverable"
              color="text"
              IconRight={ChevronRight}
              size="md"
              isFullWidth
            >
              {isDictionaryEdited(dictionaryKey)
                ? `✎ ${dictionaryKey}`
                : dictionaryKey}
            </Button>
          </div>
        ))}
      </RightDrawer>
    </>
  );
};
