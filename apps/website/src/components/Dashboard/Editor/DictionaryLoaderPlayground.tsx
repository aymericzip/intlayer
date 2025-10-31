'use client';

import { useDictionariesRecordActions } from '@intlayer/editor-react';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import type { FC } from 'react';
import { useEffect } from 'react';

export const DictionaryLoaderPlayground: FC = () => {
  const unmergedDictionaries = getUnmergedDictionaries();
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    const dictionariesList = Object.fromEntries(
      Object.values(unmergedDictionaries)
        .flat()
        .map((dictionary) => [dictionary.localId, dictionary])
    );
    console.dir({ test: 'test', dictionariesList });
    setLocaleDictionaries(dictionariesList);
  }, []);

  return <></>;
};
