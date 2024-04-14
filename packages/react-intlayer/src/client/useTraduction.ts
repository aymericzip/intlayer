'use client';

import type { LanguageContent } from '@intlayer/core';
import { useContext } from 'react';
import { getTranslation } from '../getTranslation';
import { LocaleContext } from './LocaleClientContextProvider';

export const useTraduction = <Content>(
  languageContent: LanguageContent<Content>
): Content => {
  const { locale } = useContext(LocaleContext);

  return getTranslation(languageContent, locale);
};
