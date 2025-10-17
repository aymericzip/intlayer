'use client';

import type { Dictionary } from '@intlayer/core';
import {
  Button,
  RightDrawer,
  useRightDrawerStore,
} from '@intlayer/design-system';
import {
  useDictionariesRecord,
  useEditedContent,
  useFocusDictionary,
} from '@intlayer/editor-react';
import { ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { dictionaryListDrawerIdentifier } from './dictionaryListDrawerIdentifier';

export const DictionaryListDrawer: FC = () => {
  const { drawerTitle, buttonLabel } = useIntlayer('dictionary-list-drawer');
  const { close: closeDrawer, open: openDrawer } = useRightDrawerStore();

  const { localeDictionaries } = useDictionariesRecord();
  const { editedContent } = useEditedContent();
  const { setFocusedContent } = useFocusDictionary();

  const handleClickDictionary = (dictionary: Dictionary) => {
    closeDrawer(dictionaryListDrawerIdentifier);

    setFocusedContent({
      dictionaryKey: dictionary.key!,
      dictionaryLocalId: dictionary.localId!,
    });

    openDrawer(getDrawerIdentifier(dictionary.key!));
  };

  const isDictionaryEdited = (dictionaryKey: string) =>
    Object.keys(editedContent ?? {}).includes(dictionaryKey);

  return (
    <RightDrawer
      title={drawerTitle.label.value}
      identifier={dictionaryListDrawerIdentifier}
    >
      {Object.values(localeDictionaries).map((dictionary) => (
        <Button
          key={dictionary.localId!}
          label={
            buttonLabel.label({ dictionaryLocalId: dictionary.localId! }).value
          }
          onClick={() => handleClickDictionary(dictionary)}
          variant="hoverable"
          color="text"
          IconRight={ChevronRight}
          size="md"
          isFullWidth
        >
          {isDictionaryEdited(dictionary.key!)
            ? `✎ ${dictionary.key}`
            : dictionary.key}
        </Button>
      ))}
    </RightDrawer>
  );
};
