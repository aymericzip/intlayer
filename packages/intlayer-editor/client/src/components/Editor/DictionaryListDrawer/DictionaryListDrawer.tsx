'use client';

import {
  Button,
  RightDrawer,
  SearchInput,
  Tag,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useSearch } from '@intlayer/design-system/hooks';
import {
  useDictionariesRecord,
  useEditedContent,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import Fuse from 'fuse.js';
import { ChevronRight, Pencil } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { getDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { dictionaryListDrawerIdentifier } from './dictionaryListDrawerIdentifier';

export const DictionaryListDrawer: FC = () => {
  const { drawerTitle, buttonLabel } = useIntlayer('dictionary-list-drawer');
  const { close: closeDrawer, open: openDrawer } = useRightDrawerStore();

  const { localeDictionaries } = useDictionariesRecord();
  const { editedContent } = useEditedContent();
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const { setSearch, search } = useSearch();

  // Create Fuse instance for searching dictionaries
  const fuse = useMemo(() => {
    const dictionariesArray = Object.values(localeDictionaries);
    return new Fuse(dictionariesArray, {
      keys: ['key', 'title', 'filePath', 'description', 'tags'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [localeDictionaries]);

  // Filter dictionaries based on search
  const filteredDictionaries = useMemo(() => {
    if (!search || search.trim() === '') {
      return Object.values(localeDictionaries);
    }
    return fuse.search(search).map((result) => result.item);
  }, [search, fuse, localeDictionaries]);

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
      <div className="p-3 pb-4">
        <SearchInput
          placeholder="Search dictionaries"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
        />
      </div>
      <ul className="flex flex-col gap-1">
        {filteredDictionaries.map((dictionary) => (
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
                  <div className="flex flex-wrap items-center gap-2 py-1.5">
                    <Tag color="text" roundedSize="full" size="xs">
                      {dictionary.key}
                    </Tag>
                    {dictionary.filePath && (
                      <Tag color="blue" roundedSize="full" size="xs">
                        {dictionary.filePath.split('/').pop()}
                      </Tag>
                    )}
                    {dictionary.id && (
                      <Tag color="purple" roundedSize="full" size="xs">
                        remote
                      </Tag>
                    )}
                  </div>
                  <span>
                    {(dictionary.title ?? '').length > 0
                      ? dictionary.title
                      : dictionary.key}
                  </span>
                </div>
              </div>
            </Button>
          </li>
        ))}
      </ul>
    </RightDrawer>
  );
};
