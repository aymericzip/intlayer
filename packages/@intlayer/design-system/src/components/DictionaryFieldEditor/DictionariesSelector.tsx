'use client';

import type { Locales } from '@intlayer/config/client';
import type { FC } from 'react';
import { useGetAllDictionaries } from '../../hooks';
import { useEditionPanelStore } from '../DictionaryEditor';
import { Loader } from '../Loader';
import { DictionaryFieldEditor } from './DictionaryFieldEditor';
import { useDictionary } from 'react-intlayer';
import { dictionariesSelectorContent } from './dictionariesSelector.content';

type DictionariesSelectorProps = {
  locale: Locales;
};

export const DictionariesSelector: FC<DictionariesSelectorProps> = ({
  locale,
}) => {
  const { all, isLoading } = useGetAllDictionaries();
  const { focusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
  }));
  const { noDictionaryMessage, dictionaryNotFoundMessage } = useDictionary(
    dictionariesSelectorContent
  );

  if (isLoading) return <Loader />;

  if (!focusedContent?.dictionaryId) return <>{noDictionaryMessage}</>;

  const dictionary = all?.[focusedContent?.dictionaryId];

  if (!dictionary) return <>{dictionaryNotFoundMessage}</>;

  return <DictionaryFieldEditor dictionary={dictionary} locale={locale} />;
};
