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

  const handleClickDictionary = (dictionaryId: string) => {
    closeDrawer(dictionaryListDrawerIdentifier);

    const { filePath } = dictionaries[dictionaryId];
    setFocusedContent({
      dictionaryId,
      dictionaryPath: filePath,
    });

    openDrawer(getDrawerIdentifier(dictionaryId));
  };

  const isDictionaryEdited = useCallback(
    (dictionaryId: string) => Object.keys(editedContent).includes(dictionaryId),
    [editedContent]
  );

  return (
    <>
      <RightDrawer
        title="Dictionary list"
        identifier={dictionaryListDrawerIdentifier}
      >
        {dictionaryKeyList.map((dictionaryId) => (
          <div key={dictionaryId}>
            <Button
              label={`Open dictionary editor ${dictionaryId}`}
              onClick={() => handleClickDictionary(dictionaryId)}
              variant="hoverable"
              color="text"
              IconRight={ChevronRight}
              size="md"
              isFullWidth
            >
              {isDictionaryEdited(dictionaryId)
                ? `✎ ${dictionaryId}`
                : dictionaryId}
            </Button>
          </div>
        ))}
      </RightDrawer>
    </>
  );
};
