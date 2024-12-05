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
import { useState, useEffect, useCallback, useMemo, FC } from 'react';
import { useShallow } from 'zustand/shallow';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { useDictionaryListDrawer } from './useDictionaryListDrawer';

type DictionaryDrawerConnectorProps = {
  dictionaryId: string;
};
const DictionaryDrawerConnector: FC<DictionaryDrawerConnectorProps> = ({
  dictionaryId,
}) => {
  const rightDrawerStore = useRightDrawerStore(dictionaryId)();

  useEffect(() => {
    rightDrawerStore.open();
  }, [rightDrawerStore]);

  return <></>;
};

export const DictionaryListDrawer: FC = () => {
  const { all: dictionaries } = useGetAllDictionaries();
  const dictionaryKeyList = useMemo(
    () => Object.keys(dictionaries) as Locales[],
    [dictionaries]
  );
  const { closeDictionaryListDrawer } = useDictionaryListDrawer(
    useShallow((s) => ({
      closeDictionaryListDrawer: s.close,
    }))
  );
  const editedContent = useEditedContentStore(
    useShallow((s) => s.editedContent)
  );
  const setFocusedContent = useEditionPanelStore(
    useShallow((s) => s.setFocusedContent)
  );

  const [clickedDictionaryId, setClickedDictionaryId] = useState<string>();

  const handleClickDictionary = (dictionaryId: string) => {
    closeDictionaryListDrawer();

    const { filePath } = dictionaries[dictionaryId];
    setFocusedContent({
      dictionaryId,
      dictionaryPath: filePath,
    });

    setClickedDictionaryId(getDrawerIdentifier(dictionaryId));
  };

  const isDictionaryEdited = useCallback(
    (dictionaryId: string) => Object.keys(editedContent).includes(dictionaryId),
    [editedContent]
  );

  return (
    <>
      {clickedDictionaryId && (
        <DictionaryDrawerConnector dictionaryId={clickedDictionaryId} />
      )}
      <RightDrawer title="Dictionary list" identifier="dictionaryListDrawer">
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
