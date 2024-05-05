'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import {
  RightDrawer,
  DictionaryEditor,
  LocaleSwitcher,
  type FileContent,
} from '@intlayer/design-system';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import type { FC } from 'react';
import {
  type FileContent as FileContentWithDictionaryPath,
  useDictionaryEditionDrawer,
} from './useDictionaryEditionDrawer';

type DictionaryEditionDrawerContentProps = {
  focusedContent: FileContentWithDictionaryPath;
  locale: Locales;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ focusedContent, locale }) => {
  const {
    setFocusedContent,
    editContentRequest,
    editedContent,
    addEditedContent,
    clearEditedDictionaryContent,
  } = useDictionaryEditionDrawer();

  const dictionaryId: string = focusedContent.dictionaryId;
  const dictionary: Dictionary = dictionaries[dictionaryId];
  const dictionaryPath: string = dictionary.filePath;
  const editedDictionaryContent: FileContent[] = editedContent[dictionaryPath];

  return (
    <DictionaryEditor
      dictionary={dictionary}
      locale={locale}
      focusedKeyPath={focusedContent.keyPath}
      editedContent={editedDictionaryContent}
      onFocusKeyPath={(keyPath) =>
        setFocusedContent({ ...focusedContent, keyPath })
      }
      onContentChange={(keyPath, newValue) =>
        addEditedContent(dictionaryPath, keyPath, newValue)
      }
      onValidEdition={editContentRequest}
      onCancelEdition={() => {
        clearEditedDictionaryContent(dictionaryPath);
        setFocusedContent(null);
      }}
    />
  );
};

type DictionaryEditionDrawerProps = {
  locale: Locales;
  localeList: Locales[];
  setLocale: (locale: Locales) => void;
};

export const DictionaryEditionDrawer: FC<DictionaryEditionDrawerProps> = ({
  locale,
  localeList,
  setLocale,
}) => {
  const { focusedContent } = useDictionaryEditionDrawer();

  const dictionaryId: string | undefined = focusedContent?.dictionaryId;

  return (
    <RightDrawer
      title={dictionaryId}
      label={`Edit dictionary ${dictionaryId}`}
      header={
        <LocaleSwitcher
          setLocale={setLocale}
          locale={locale}
          localeList={localeList}
        />
      }
    >
      {focusedContent && (
        <DictionaryEditionDrawerContent
          focusedContent={focusedContent}
          locale={locale}
        />
      )}
    </RightDrawer>
  );
};
