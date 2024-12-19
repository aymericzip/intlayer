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
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { useCallback, useEffect, useState, type FC } from 'react';
import { t, useDictionary } from 'react-intlayer';
import { useShallow } from 'zustand/shallow';
import { dictionaryListDrawerIdentifier } from '../DictionaryListDrawer/dictionaryListDrawerIdentifier';
import dictionaryEditionDrawerContent from './dictionaryEditionDrawer.content';
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
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ locale, identifier, handleOnBack, isDarkMode }) => {
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

  const dictionaryKey = focusedContent?.dictionaryKey;

  if (!dictionaryKey) return <>No dictionary focused</>;

  const dictionary: Dictionary = dictionaries[dictionaryKey];

  return (
    <>
      <Modal
        isOpen={keyPathEditionModal !== null}
        onClose={() => setKeyPathEditionModal(null)}
        hasCloseButton
        title={t({
          en: 'Edit field',
          fr: 'Modifier le champ',
          es: 'Editar campo',
        })}
        size="xl"
        transparency="lg"
      >
        {dictionary && (
          <DictionaryFieldEditor
            dictionary={dictionary}
            onClickDictionaryList={onClickDictionaryList}
            isDarkMode={isDarkMode}
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
  dictionaryKey: string;
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawer: FC<DictionaryEditionDrawerProps> = ({
  locale,
  localeList,
  setLocale,
  dictionaryKey,
  isDarkMode,
}) => {
  const { backButtonText } = useDictionary(dictionaryEditionDrawerContent);
  const id = getDrawerIdentifier(dictionaryKey);

  const { focusedContent, close } = useDictionaryEditionDrawer(dictionaryKey);
  const { openDictionaryListDrawer } = useRightDrawerStore((s) => ({
    openDictionaryListDrawer: () => s.open(dictionaryListDrawerIdentifier),
  }));

  const handleOnBack = () => {
    close();
    openDictionaryListDrawer();
  };

  return (
    <RightDrawer
      title={dictionaryKey}
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
        text: backButtonText,
      }}
    >
      {focusedContent && (
        <DictionaryEditionDrawerContent
          focusedContent={focusedContent}
          locale={locale}
          identifier={id}
          handleOnBack={handleOnBack}
          isDarkMode={isDarkMode}
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
  const dictionaryKey: string | undefined = focusedContent?.dictionaryKey;

  if (!dictionaryKey) {
    return <></>;
  }

  return (
    <DictionaryEditionDrawer
      locale={locale}
      localeList={localeList}
      setLocale={setLocale}
      dictionaryKey={dictionaryKey}
    />
  );
};
