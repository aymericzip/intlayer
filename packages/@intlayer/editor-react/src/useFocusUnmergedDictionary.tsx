'use client';

import { getContentNodeByKeyPath } from '@intlayer/core';
import type {
  Dictionary,
  KeyPath,
  LocalDictionaryId,
  Locale,
} from '@intlayer/types';
import { useMemo } from 'react';
import { useDictionariesRecord } from './DictionariesRecordContext';
import { type FileContent, useFocusDictionary } from './FocusDictionaryContext';
import { useEditorLocale } from './useEditorLocale';

type UnmergedKeyPath = {
  keyPath: KeyPath[];
  dictionaryLocalId?: LocalDictionaryId;
};

/**
 * Converts merged keypath format to unmerged format.
 * Merged: [{type: "translation", key: "fr"}, {type: "object", key: "title"}]
 * Unmerged: [{type: "object", key: "title"}, {type: "translation", key: "fr"}]
 */
const mergedKeyPathToUnmergedKeyPath = (
  keyPath: KeyPath[],
  dictionaries: Dictionary[],
  locale: Locale
): UnmergedKeyPath | undefined => {
  // If we have a dictionary, verify the path exists
  // Try to find the correct position for the translation key
  // by checking which path actually exists in the dictionary
  for (const dictionary of dictionaries) {
    try {
      const result = getContentNodeByKeyPath(
        dictionary.content,
        keyPath ?? [],
        locale
      );

      if (result) {
        return { keyPath, dictionaryLocalId: dictionary.localId };
      }
    } catch {
      // Continue to next candidate
    }
  }
};

export const useFocusUnmergedDictionary = () => {
  const { localeDictionaries } = useDictionariesRecord();
  const currentLocale = useEditorLocale();
  const {
    setFocusedContent,
    setFocusedContentKeyPath,
    focusedContent: mergedFocusedContent,
  } = useFocusDictionary();

  const focusedContent = useMemo<FileContent | null>(() => {
    if (!mergedFocusedContent) return mergedFocusedContent;
    if (!localeDictionaries) return mergedFocusedContent;
    if (mergedFocusedContent.dictionaryLocalId) return mergedFocusedContent;

    const dictionaries = Object.values(localeDictionaries).filter(
      (dictionary) => dictionary.key === mergedFocusedContent.dictionaryKey
    );

    const unmergedKeyPath = mergedKeyPathToUnmergedKeyPath(
      mergedFocusedContent.keyPath ?? [],
      dictionaries,
      currentLocale
    );

    return {
      ...mergedFocusedContent,
      ...unmergedKeyPath,
    };
  }, [mergedFocusedContent, localeDictionaries, currentLocale]);

  return {
    focusedContent,
    setFocusedContent,
    setFocusedContentKeyPath,
  };
};
