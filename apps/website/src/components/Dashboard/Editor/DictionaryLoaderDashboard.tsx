'use client';

import { useGetDictionaries } from '@intlayer/design-system/hooks';
import { useDictionariesRecordActions } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import { type FC, useEffect } from 'react';

export const DictionaryLoaderDashboard: FC = () => {
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  const { data } = useGetDictionaries();

  useEffect(() => {
    const dictionariesList = Object.fromEntries(
      data.data.map((dictionary: Dictionary) => [
        dictionary.localId,
        dictionary,
      ])
    );

    setLocaleDictionaries(dictionariesList);
  }, [data]);

  return <></>;
};
