'use client';

import {
  Button,
  DictionaryEditor,
  DictionaryFieldEditor,
  Modal,
  Popover,
  RightDrawer,
  SaveForm,
  Tag,
  useRightDrawerStore,
} from '@intlayer/design-system';
import { useGetEditorDictionaries } from '@intlayer/design-system/hooks';
import { useFocusUnmergedDictionary } from '@intlayer/editor-react';
import type { Dictionary, Locale } from '@intlayer/types';
import { PencilRuler } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { dictionaryListDrawerIdentifier } from '../DictionaryListDrawer/dictionaryListDrawerIdentifier';
import {
  getDrawerIdentifier,
  useDictionaryEditionDrawer,
} from './useDictionaryEditionDrawer';

type DictionaryEditionDrawerContentProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export const DictionaryEditionDrawerContent: FC<
  DictionaryEditionDrawerContentProps
> = ({ dictionary, locale }) => {
  return <DictionaryEditor dictionary={dictionary} locale={locale} />;
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
  const {
    backButtonText,
    openDictionaryEditor,
    modalTitle,
    noDictionaryFocused,
    focusedDictionaryNotFound,
  } = useIntlayer('dictionary-edition-drawer');
  const id = getDrawerIdentifier(dictionaryKey);

  const { focusedContent, close } = useDictionaryEditionDrawer(dictionaryKey);
  const { openDictionaryListDrawer } = useRightDrawerStore((s) => ({
    openDictionaryListDrawer: () => s.open(dictionaryListDrawerIdentifier),
  }));
  const { data: unmergedDictionaries } = useGetEditorDictionaries();

  const handleOnBack = () => {
    close();
    openDictionaryListDrawer();
  };

  const [editionModalOpen, setEditionModalOpen] = useState<boolean>(false);

  const onClickDictionaryList = () => {
    setEditionModalOpen(false);
    handleOnBack();
  };

  if (!focusedContent?.dictionaryKey)
    return (
      <span className="mx-auto my-10 text-neutral text-sm">
        {noDictionaryFocused}
      </span>
    );

  const dictionary = unmergedDictionaries?.[focusedContent.dictionaryKey]?.find(
    (dict: Dictionary) => dict.localId === focusedContent?.dictionaryLocalId
  );

  if (!dictionary)
    return (
      <span className="mx-auto my-10 text-neutral text-sm">
        {focusedDictionaryNotFound}
      </span>
    );

  return (
    <RightDrawer
      identifier={id}
      backButton={{
        onBack: handleOnBack,
        text: backButtonText.value,
      }}
      onClose={close}
      header={
        <>
          <header className="mb-5 flex w-full px-3">
            <h3 className="w-full text-center text-lg">
              {dictionary.title ? dictionary.title : dictionary.key}
            </h3>

            <Popover identifier="open-dictionary-editor">
              <Button
                variant="hoverable"
                color="text"
                size="icon-md"
                IconRight={PencilRuler}
                label={openDictionaryEditor.label.value}
                onClick={() => setEditionModalOpen(true)}
              />
              <Popover.Detail identifier="open-dictionary-editor">
                <span className="whitespace-nowrap p-2 text-neutral text-xs">
                  Open Dictionary in Editor
                </span>
              </Popover.Detail>
            </Popover>
          </header>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-text/20 border-b border-dashed pb-3">
            <Tag color="text" roundedSize="full" size="xs">
              {dictionary.key}
            </Tag>
            {dictionary.filePath && (
              <Tag color="blue" roundedSize="full" size="xs">
                {dictionary.filePath.split('/').pop()}
              </Tag>
            )}
            {dictionary.id && (
              <Tag color="purple" roundedSize="full" size="xs">
                remote
              </Tag>
            )}
          </div>
        </>
      }
      footer={
        <SaveForm
          dictionary={dictionary}
          mode={['local', 'remote']}
          className="mb-4 flex-col px-3"
          onDelete={handleOnBack}
        />
      }
    >
      {focusedContent && (
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
                onSave={() => {
                  setEditionModalOpen(false);
                }}
              />
            </div>
          </Modal>

          <DictionaryEditionDrawerContent
            dictionary={dictionary}
            locale={locale}
          />
        </>
      )}
    </RightDrawer>
  );
};

type DictionaryEditionDrawerControllerProps = {
  locale: Locale;
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawerController: FC<
  DictionaryEditionDrawerControllerProps
> = ({ locale, isDarkMode }) => {
  const { focusedContent } = useFocusUnmergedDictionary();
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
