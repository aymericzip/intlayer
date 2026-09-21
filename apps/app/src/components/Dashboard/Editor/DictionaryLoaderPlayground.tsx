import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import { useDictionariesRecordActions } from '@intlayer/editor-react';
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
    setLocaleDictionaries(dictionariesList);
  }, []);

  return <></>;
};
