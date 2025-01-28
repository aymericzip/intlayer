'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary, KeyPath } from '@intlayer/core';
import {
  RightDrawer,
  DictionaryEditor,
  Modal,
  DictionaryFieldEditor,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { useFocusDictionary } from '@intlayer/editor-react';
import { useDictionary } from 'next-intlayer';
import { useCallback, useState, type FC } from 'react';
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
  localeList: Locales[];
  identifier: string;
  handleOnBack: () => void;
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ locale, localeList, identifier, handleOnBack, isDarkMode }) => {
  const { modalTitle } = useDictionary(dictionaryEditionDrawerContent);
  const [keyPathEditionModal, setKeyPathEditionModal] = useState<
    KeyPath[] | null
  >(null);
  const { all: dictionaries } = useGetAllDictionaries();
  const { focusedContent } = useDictionaryEditionDrawer(identifier);

  const onClickDictionaryList = useCallback(() => {
    setKeyPathEditionModal(null);
    handleOnBack();
  }, [handleOnBack]);

  const dictionaryKey = focusedContent?.dictionaryKey;

  if (!dictionaryKey) return <>No dictionary focused</>;

  const dictionary: Dictionary = dictionaries[dictionaryKey];

  if (!dictionary) return <>No dictionary focused</>;

  return (
    <>
      <Modal
        isOpen={keyPathEditionModal !== null}
        onClose={() => setKeyPathEditionModal(null)}
        hasCloseButton
        title={modalTitle}
        size="xl"
        transparency="lg"
      >
        <DictionaryFieldEditor
          dictionary={dictionary}
          onClickDictionaryList={onClickDictionaryList}
          isDarkMode={isDarkMode}
          availableLocales={localeList}
          mode="remote"
        />
      </Modal>

      <DictionaryEditor
        dictionary={dictionary}
        locale={locale}
        onClickEdit={setKeyPathEditionModal}
        mode="remote"
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
      backButton={{
        onBack: handleOnBack,
        text: backButtonText,
      }}
      onClose={close}
    >
      {focusedContent && (
        <DictionaryEditionDrawerContent
          focusedContent={focusedContent}
          locale={locale}
          identifier={id}
          handleOnBack={handleOnBack}
          isDarkMode={isDarkMode}
          localeList={localeList}
        />
      )}
    </RightDrawer>
  );
};

type DictionaryEditionDrawerControllerProps = {
  locale: Locales;
  localeList: Locales[];
};

export const DictionaryEditionDrawerController: FC<
  DictionaryEditionDrawerControllerProps
> = ({ locale, localeList }) => {
  const { focusedContent } = useFocusDictionary();
  const dictionaryKey: string | undefined = focusedContent?.dictionaryKey;

  if (!dictionaryKey) {
    return <></>;
  }

  return (
    <DictionaryEditionDrawer
      locale={locale}
      localeList={localeList}
      dictionaryKey={dictionaryKey}
    />
  );
};
