'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary, KeyPath } from '@intlayer/core';
import {
  RightDrawer,
  DictionaryEditor,
  LocaleSwitcher,
  type FieldContent,
  Modal,
  DictionaryFieldEditor,
} from '@intlayer/design-system';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import { useState, type FC } from 'react';
import { useDictionaryListDrawer } from '../DictionaryListDrawer/index';
import {
  type FileContent as FileContentWithDictionaryPath,
  useDictionaryEditionDrawer,
} from './useDictionaryEditionDrawer';
import { useEditionPanelStore } from './useFocusContentStore';

type DictionaryEditionDrawerContentProps = {
  focusedContent: FileContentWithDictionaryPath;
  locale: Locales;
  identifier: string;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ focusedContent, locale, identifier }) => {
  const [keyPathEditionModal, setKeyPathEditionModal] = useState<
    KeyPath[] | null
  >(null);
  const {
    setFocusedContent,
    editContentRequest,
    editedContent,
    addEditedContent,
    clearEditedDictionaryContent,
  } = useDictionaryEditionDrawer(identifier);

  const dictionaryId: string = focusedContent.dictionaryId;
  const dictionary: Dictionary = dictionaries[dictionaryId];
  const dictionaryPath: string = dictionary.filePath;
  const editedDictionaryContent: FieldContent[] = editedContent[dictionaryPath];

  return (
    <>
      <Modal
        isOpen={keyPathEditionModal !== null}
        onClose={() => setKeyPathEditionModal(null)}
        hasCloseButton
        title="Edit field"
        size="lg"
      >
        <DictionaryFieldEditor
          dictionary={dictionary}
          keyPath={keyPathEditionModal ?? []}
          locale={locale}
          editedContent={editedDictionaryContent}
          onFocusKeyPath={(keyPath) => {
            setFocusedContent({ ...focusedContent, keyPath });
            setKeyPathEditionModal(keyPath);
          }}
          onContentChange={(keyPath, newValue) =>
            addEditedContent(dictionaryPath, keyPath, newValue)
          }
          onValidEdition={editContentRequest}
          onCancelEdition={() => clearEditedDictionaryContent(dictionaryPath)}
        />
      </Modal>
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
        onCancelEdition={() => clearEditedDictionaryContent(dictionaryPath)}
        onClickEdit={setKeyPathEditionModal}
      />
    </>
  );
};

type DictionaryEditionDrawerProps = DictionaryEditionDrawerControllerProps & {
  dictionaryId: string;
};

export const getDrawerIdentifier = (dictionaryId: string) =>
  `dictionary_edition_${dictionaryId}`;

export const DictionaryEditionDrawer: FC<DictionaryEditionDrawerProps> = ({
  locale,
  localeList,
  setLocale,
  dictionaryId,
}) => {
  const id = getDrawerIdentifier(dictionaryId);

  const { focusedContent, close } = useDictionaryEditionDrawer(dictionaryId);
  const { open: openDictionaryListDrawer } = useDictionaryListDrawer();

  const handleOnBack = () => {
    close();
    openDictionaryListDrawer();
  };

  return (
    <RightDrawer
      title={dictionaryId}
      identifier={id}
      header={
        <LocaleSwitcher
          setLocale={setLocale}
          locale={locale}
          localeList={localeList}
        />
      }
      backButton={{
        onBack: handleOnBack,
        text: 'Dictionary list',
      }}
    >
      {focusedContent && (
        <DictionaryEditionDrawerContent
          focusedContent={focusedContent}
          locale={locale}
          identifier={id}
        />
      )}
    </RightDrawer>
  );
};

type DictionaryEditionDrawerControllerProps = {
  locale: Locales;
  localeList: Locales[];
  setLocale: (locale: Locales) => void;
};

export const DictionaryEditionDrawerController: FC<
  DictionaryEditionDrawerControllerProps
> = ({ locale, localeList, setLocale }) => {
  const focusedContent = useEditionPanelStore((s) => s.focusedContent);
  const dictionaryId: string | undefined = focusedContent?.dictionaryId;

  if (!dictionaryId) {
    return <></>;
  }

  return (
    <DictionaryEditionDrawer
      locale={locale}
      localeList={localeList}
      setLocale={setLocale}
      dictionaryId={dictionaryId}
    />
  );
};
