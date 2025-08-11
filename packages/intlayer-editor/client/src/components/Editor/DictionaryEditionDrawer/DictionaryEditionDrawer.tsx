'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import {
  Button,
  DictionaryEditor,
  DictionaryFieldEditor,
  Modal,
  RightDrawer,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { useFocusDictionary } from '@intlayer/editor-react';
import { Pencil } from 'lucide-react';
import { useCallback, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { dictionaryListDrawerIdentifier } from '../DictionaryListDrawer/dictionaryListDrawerIdentifier';
import dictionaryEditionDrawerContent from './dictionaryEditionDrawer.content';
import {
  getDrawerIdentifier,
  useDictionaryEditionDrawer,
  type FileContent as FileContentWithDictionaryPath,
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
  const {
    modalTitle,
    openDictionaryEditor,
    noDictionaryFocused,
    focusedDictionaryNotFound,
  } = useDictionary(dictionaryEditionDrawerContent);
  const [editionModalOpen, setEditionModalOpen] = useState<boolean>(false);
  const { all: dictionaries } = useGetAllDictionaries();
  const { focusedContent } = useDictionaryEditionDrawer(identifier);

  const onClickDictionaryList = useCallback(() => {
    setEditionModalOpen(false);
    handleOnBack();
  }, [handleOnBack]);

  const dictionaryKey = focusedContent?.dictionaryKey;

  if (!dictionaryKey)
    return (
      <span className="mx-auto my-10 text-sm text-neutral">
        {noDictionaryFocused}
      </span>
    );

  const dictionary: Dictionary = dictionaries[dictionaryKey];

  if (!dictionary)
    return (
      <span className="mx-auto my-10 text-sm text-neutral">
        {focusedDictionaryNotFound}
      </span>
    );

  return (
    <>
      <Modal
        isOpen={editionModalOpen}
        onClose={() => setEditionModalOpen(false)}
        hasCloseButton
        title={modalTitle.value}
        size="xl"
        transparency="lg"
      >
        <div className="size-full px-3 pt-5">
          <DictionaryFieldEditor
            dictionary={dictionary}
            onClickDictionaryList={onClickDictionaryList}
            isDarkMode={isDarkMode}
            mode={['local', 'remote']}
            onDelete={() => {
              setEditionModalOpen(false);
              handleOnBack();
            }}
          />
        </div>
      </Modal>

      <div className="border-text/20 /20 mb-5 flex w-full border-b border-dashed px-3 pb-2">
        <h3 className="w-full text-center text-lg">
          {dictionary.title ? dictionary.title : dictionary.key}
        </h3>
        <Button
          variant="hoverable"
          color="text"
          size="icon-md"
          IconRight={Pencil}
          label={openDictionaryEditor.label.value}
          onClick={() => setEditionModalOpen(true)}
        />
      </div>

      <DictionaryEditor
        dictionary={dictionary}
        locale={locale}
        mode={['local', 'remote']}
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
      identifier={id}
      backButton={{
        onBack: handleOnBack,
        text: backButtonText.value,
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
        />
      )}
    </RightDrawer>
  );
};

type DictionaryEditionDrawerControllerProps = {
  locale: Locales;
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawerController: FC<
  DictionaryEditionDrawerControllerProps
> = ({ locale, isDarkMode }) => {
  const { focusedContent } = useFocusDictionary();
  const dictionaryKey: string | undefined = focusedContent?.dictionaryKey;

  if (!dictionaryKey) {
    return <></>;
  }

  return (
    <DictionaryEditionDrawer
      locale={locale}
      dictionaryKey={dictionaryKey}
      isDarkMode={isDarkMode}
    />
  );
};
