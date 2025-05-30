'use client';

import type { Locales } from '@intlayer/config';
import {
  Button,
  RightDrawer,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { useEditedContent, useFocusDictionary } from '@intlayer/editor-react';
import { ChevronRight } from 'lucide-react';
import { type FC } from 'react';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { dictionaryListDrawerIdentifier } from './dictionaryListDrawerIdentifier';

export const DictionaryListDrawer: FC = () => {
  const { all: dictionaries } = useGetAllDictionaries();
  const dictionaryKeyList = Object.keys(dictionaries) as Locales[];

  const { close: closeDrawer, open: openDrawer } = useRightDrawerStore();

  const { editedContent } = useEditedContent();
  const { setFocusedContent } = useFocusDictionary();

  const handleClickDictionary = (dictionaryKey: string) => {
    closeDrawer(dictionaryListDrawerIdentifier);

    const { filePath } = dictionaries[dictionaryKey];
    setFocusedContent({
      dictionaryKey,
      dictionaryPath: filePath,
    });

    openDrawer(getDrawerIdentifier(dictionaryKey));
  };

  const isDictionaryEdited = (dictionaryKey: string) =>
    Object.keys(editedContent ?? {}).includes(dictionaryKey);

  return (
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
  );
};
