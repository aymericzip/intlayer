'use client';

import type { Locales } from '@intlayer/config/client';
import type { ContentModule } from '@intlayer/core';
import {
  useRightDrawerStore,
  RightDrawer,
  DictionaryEditor,
  LocaleSwitcher,
} from '@intlayer/design-system';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import { type FC, useEffect } from 'react';
import { useEditorServer } from '../useEditorServer';
import { useEditedContentStore } from './useEditedContentStore';
import { useEditionPanelStore } from './useEditionPanelStore';

type EditionPanelProps = {
  locale: Locales;
  localeList: Locales[];
  setLocale: (locale: Locales) => void;
};

export const EditionPanel: FC<EditionPanelProps> = ({
  locale,
  localeList,
  setLocale,
}) => {
  const { open } = useRightDrawerStore((s) => ({ open: s.open }));
  const { focusedContent, setFocusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
    setFocusedContent: s.setFocusedContent,
  }));
  const { editedContent, addEditedContent, clearEditedDictionaryContent } =
    useEditedContentStore((s) => ({
      editedContent: s.editedContent,
      addEditedContent: s.addEditedContent,
      clearEditedDictionaryContent: s.clearEditedDictionaryContent,
    }));
  const { editContentRequest } = useEditorServer();

  // Use effect to react to changes in focusedContent
  useEffect(() => {
    if (focusedContent !== null) {
      open(); // Call the open function from useRightDrawerStore
    }
  }, [focusedContent, open]); // Depend on focusedContent and open to trigger the effect

  if (!focusedContent) {
    return null;
  }

  const dictionary: ContentModule = dictionaries[focusedContent.dictionaryId];

  if (!dictionary?.filePath) {
    return null;
  }

  const dictionaryPath = dictionary.filePath;
  const editedDictionaryContent = editedContent[dictionaryPath] ?? [];

  return (
    <RightDrawer
      title={dictionary.id}
      label={`Edit dictionary ${dictionary.id}`}
      header={
        <LocaleSwitcher
          setLocale={setLocale}
          locale={locale}
          localeList={localeList}
        />
      }
    >
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
    </RightDrawer>
  );
};
