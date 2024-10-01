'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import type { FC } from 'react';
import { useGetAllDictionaries } from '../../hooks';
import { useEditionPanelStore } from '../DictionaryEditor';
import { Loader } from '../Loader';
import { DictionaryFieldEditor } from './DictionaryFieldEditor';

type DictionariesSelectorProps = {
  locale: Locales;
};

export const DictionariesSelector: FC<DictionariesSelectorProps> = ({
  locale,
}) => {
  const { all } = useGetAllDictionaries();
  const { focusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
  }));

  if (!focusedContent?.dictionaryId) return <>No dictionary focused</>;

  const dictionary: Dictionary | undefined =
    all?.[focusedContent?.dictionaryId];

  if (!dictionary) return <Loader />;

  return <DictionaryFieldEditor dictionary={dictionary} locale={locale} />;
};
