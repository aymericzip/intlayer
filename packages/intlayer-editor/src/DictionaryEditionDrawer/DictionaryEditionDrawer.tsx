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
import { useCallback, useEffect, useState, type FC } from 'react';
import { useShallow } from 'zustand/shallow';
import { useDictionaryListDrawer } from '../DictionaryListDrawer/useDictionaryListDrawer';
import {
  type FileContent as FileContentWithDictionaryPath,
  useDictionaryEditionDrawer,
  getDrawerIdentifier,
} from './useDictionaryEditionDrawer';

type DictionaryEditionDrawerContentProps = {
  focusedContent: FileContentWithDictionaryPath;
  locale: Locales;
  identifier: string;
  handleOnBack: () => void;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ locale, identifier, handleOnBack }) => {
  const [keyPathEditionModal, setKeyPathEditionModal] = useState<
    KeyPath[] | null
  >(null);
  const { setDictionariesRecord, focusedContent } =
    useDictionaryEditionDrawer(identifier);
  const { all: dictionaries } = useGetAllDictionaries();

  const onClickDictionaryList = useCallback(() => {
    setKeyPathEditionModal(null);
    handleOnBack();
  }, [handleOnBack]);

  useEffect(() => {
    if (dictionaries) {
      setDictionariesRecord(dictionaries);
    }
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
        size="xl"
        transparency="lg"
      >
        {dictionary && (
          <DictionaryFieldEditor
            dictionary={dictionary}
            onClickDictionaryList={onClickDictionaryList}
          />
        )}
      </Modal>
      <DictionaryEditor
        dictionary={dictionary}
        locale={locale}
        onClickEdit={setKeyPathEditionModal}
      />
    </>
  );
};

type DictionaryEditionDrawerProps = DictionaryEditionDrawerControllerProps & {
  dictionaryId: string;
};

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
          handleOnBack={handleOnBack}
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
  const focusedContent = useEditionPanelStore(
    useShallow((s) => s.focusedContent)
  );
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
