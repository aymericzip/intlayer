'use client';

import type { Locales } from '@intlayer/config/client';
import {
  RightDrawer,
  Button,
  useEditedContentStore,
  useEditionPanelStore,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer';
import {
  dictionaryListDrawerIdentifier,
  useDictionaryListDrawer,
} from './useDictionaryListDrawer';

export const DictionaryListDrawer: FC = () => {
  const { all: dictionaries } = useGetAllDictionaries();
  const dictionaryKeyList = Object.keys(dictionaries) as Locales[];
  const { close } = useDictionaryListDrawer();
  const editedContent = useEditedContentStore((s) => s.editedContent);
  const setFocusedContent = useEditionPanelStore((s) => s.setFocusedContent);
  const [clickedDictionaryId, setClickedDictionaryId] = useState<string>();
  const { openRightDrawer } = useRightDrawerStore(
    clickedDictionaryId ? getDrawerIdentifier(clickedDictionaryId) : ''
  )((s) => ({
    openRightDrawer: s.open,
  }));

  const handleClickDictionary = (dictionaryId: string) => {
    close();

    const { filePath } = dictionaries[dictionaryId];
    setFocusedContent({
      dictionaryId,
      dictionaryPath: filePath,
    });

    setClickedDictionaryId(dictionaryId);
  };

  useEffect(() => {
    if (clickedDictionaryId) {
      openRightDrawer();
    }
    setClickedDictionaryId(undefined);
  }, [clickedDictionaryId]);

  const isDictionaryEdited = (dictionaryId: string) =>
    Object.keys(editedContent).includes(dictionaryId);

  return (
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
  );
};
