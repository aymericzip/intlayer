'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { useEffect, useState, type FC } from 'react';
import { useGetDictionaries, useUpdateDictionary } from '../../hooks';
import {
  type DictionaryContent,
  useEditionPanelStore,
} from '../DictionaryEditor';
import { Loader } from '../Loader';
import { DictionaryFieldEditor } from './DictionaryFieldEditor';

type DictionariesSelectorProps = {
  locale: Locales;
};

export const DictionariesSelector: FC<DictionariesSelectorProps> = ({
  locale,
}) => {
  const { getDictionaries } = useGetDictionaries();
  const { updateDictionary } = useUpdateDictionary();
  const [dictionaryRecord, setDictionaryRecord] = useState<DictionaryContent>(
    {}
  );
  const { focusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
  }));

  useEffect(() => {
    getDictionaries()
      .then((response) => {
        const dictionariesRecord = response.data?.reduce((acc, dictionary) => {
          acc[dictionary.key] = {
            ...dictionary.content,
            id: dictionary.key,
          } as Dictionary;
          return acc;
        }, {} as DictionaryContent);

        if (!dictionariesRecord) return;

        setDictionaryRecord(dictionariesRecord);
      })
      .catch(() => console.error('Error loading dictionaries'));
  }, [getDictionaries]);

  if (!focusedContent?.dictionaryId) return <>No dictionary focused</>;

  const dictionary: Dictionary | undefined =
    dictionaryRecord?.[focusedContent?.dictionaryId];

  if (!dictionary) return <Loader />;

  return <DictionaryFieldEditor dictionary={dictionary} locale={locale} />;
};
