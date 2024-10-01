'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary, KeyPath } from '@intlayer/core';
import {
  RightDrawer,
  DictionaryEditor,
  LocaleSwitcher,
  Modal,
  useEditionPanelStore,
  DictionaryFieldEditor,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { useEffect, useState, type FC } from 'react';
import { useDictionaryListDrawer } from '../DictionaryListDrawer/index';
import {
  type FileContent as FileContentWithDictionaryPath,
  useDictionaryEditionDrawer,
} from './useDictionaryEditionDrawer';

type DictionaryEditionDrawerContentProps = {
  focusedContent: FileContentWithDictionaryPath;
  locale: Locales;
  identifier: string;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ locale, identifier }) => {
  const [keyPathEditionModal, setKeyPathEditionModal] = useState<
    KeyPath[] | null
  >(null);
  const {
    setFocusedContent,
    setDictionariesRecord,
    editContentRequest,
    editedContent,
    focusedContent,
    addEditedContent,
    clearEditedDictionaryContent,
  } = useDictionaryEditionDrawer(identifier);
  const { all: dictionaries } = useGetAllDictionaries();

  useEffect(() => {
    setDictionariesRecord(dictionaries);
  }, [setDictionariesRecord, dictionaries]);

  const dictionaryId = focusedContent?.dictionaryId;

  if (!dictionaryId) return <>No dictionary focused</>;

  const dictionary: Dictionary = dictionaries[dictionaryId];

  return (
    <>
      <Modal
        isOpen={keyPathEditionModal !== null}
        onClose={() => setKeyPathEditionModal(null)}
        hasCloseButton
        title="Edit field"
        size="lg"
      >
        {dictionary && (
          <DictionaryFieldEditor dictionary={dictionary} locale={locale} />
        )}
      </Modal>
      <DictionaryEditor
        dictionary={dictionary}
        locale={locale}
        focusedKeyPath={focusedContent.keyPath}
        editedContent={editedContent[dictionaryId]}
        onFocusKeyPath={(keyPath) =>
          setFocusedContent({ ...focusedContent, keyPath })
        }
        onContentChange={(keyPath, newValue) =>
          addEditedContent(dictionaryId, newValue, keyPath)
        }
        onValidEdition={editContentRequest}
        onCancelEdition={() => clearEditedDictionaryContent(dictionaryId)}
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
