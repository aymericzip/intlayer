'use client';

import { Locales } from '@intlayer/config';
import { useMemo, type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { useShallow } from 'zustand/react/shallow';
import { useGetAllDictionaries } from '../../../hooks';
import { useEditionPanelStore } from '../../DictionaryEditor';
import { Loader } from '../../Loader';
import { DictionaryFieldEditor } from '../DictionaryFieldEditor';
import { dictionariesSelectorContent } from './dictionariesSelector.content';

type DictionariesSelectorProps = {
  onClickDictionaryList: () => void;
  isDarkMode?: boolean;
  availableLocales: Locales[];
};

export const DictionariesSelector: FC<DictionariesSelectorProps> = ({
  onClickDictionaryList,
  isDarkMode,
  availableLocales,
}) => {
  const { online, locale, isLoading } = useGetAllDictionaries();
  const { focusedContent } = useEditionPanelStore(
    useShallow((s) => ({
      focusedContent: s.focusedContent,
    }))
  );
  const { noDictionaryMessage, dictionaryNotFoundMessage } = useDictionary(
    dictionariesSelectorContent
  );
  const dictionary = useMemo(
    () =>
      focusedContent?.dictionaryKey
        ? (online?.[focusedContent?.dictionaryKey] ??
          locale?.[focusedContent?.dictionaryKey])
        : null,
    [online, locale, focusedContent?.dictionaryKey]
  );

  if (isLoading) return <Loader />;

  if (!focusedContent?.dictionaryKey) return noDictionaryMessage;

  if (!dictionary) return dictionaryNotFoundMessage;

  return (
    <DictionaryFieldEditor
      dictionary={dictionary}
      onClickDictionaryList={onClickDictionaryList}
      isDarkMode={isDarkMode}
      availableLocales={availableLocales}
    />
  );
};
