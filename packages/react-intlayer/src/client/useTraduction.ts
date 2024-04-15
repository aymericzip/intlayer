'use client';

import type { LanguageContent } from '@intlayer/core';
import { useContext } from 'react';
import { getTranslation } from '../getTranslation';
import { LocaleClientContext } from './LocaleClientContextProvider';

export const useTraduction = <Content>(
  languageContent: LanguageContent<Content>
): Content => {
  const { locale } = useContext(LocaleClientContext);

  return getTranslation(languageContent, locale);
};
