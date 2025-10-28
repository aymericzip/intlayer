'use client';

import {
  Button,
  RightDrawer,
  useRightDrawerStore,
} from '@intlayer/design-system';
import {
  useDictionariesRecord,
  useEditedContent,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import { ChevronRight, Pencil } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { dictionaryListDrawerIdentifier } from './dictionaryListDrawerIdentifier';

export const DictionaryListDrawer: FC = () => {
  const { drawerTitle, buttonLabel } = useIntlayer('dictionary-list-drawer');

  const { close: closeDrawer, open: openDrawer } = useRightDrawerStore();

  const { localeDictionaries } = useDictionariesRecord();
  const { editedContent } = useEditedContent();
  const { setFocusedContent } = useFocusUnmergedDictionary();

  const handleClickDictionary = (dictionary: Dictionary) => {
    closeDrawer(dictionaryListDrawerIdentifier);

    setFocusedContent({
      dictionaryKey: dictionary.key!,
      dictionaryLocalId: dictionary.localId!,
      keyPath: [],
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
      <ul className="flex flex-col gap-1">
        {Object.values(localeDictionaries).map((dictionary) => (
          <li key={dictionary.localId!} className="w-full">
            <Button
              label={
                buttonLabel.label({ dictionaryLocalId: dictionary.localId! })
                  .value
              }
              onClick={() => handleClickDictionary(dictionary)}
              variant="hoverable"
              color="text"
              IconRight={ChevronRight}
              size="md"
              isFullWidth
              Icon={
                isDictionaryEdited(dictionary.localId!) ? Pencil : undefined
              }
            >
              <div className="flex items-center gap-2 py-1">
                <div className="flex max-w-full flex-col gap-1">
                  <span
                    className={dictionary.title ? 'text-neutral text-sm' : ''}
                  >
                    {dictionary.key}
                  </span>
                  {dictionary.title && <span>{dictionary.title}</span>}
                  {dictionary.filePath && (
                    <span className="truncate text-left text-neutral text-xs [direction:rtl]">
                      {dictionary.filePath}
                    </span>
                  )}
                </div>
              </div>
            </Button>
          </li>
        ))}
      </ul>
    </RightDrawer>
  );
};
