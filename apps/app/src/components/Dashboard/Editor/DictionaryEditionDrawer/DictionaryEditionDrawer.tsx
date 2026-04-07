'use client';

import { Button } from '@intlayer/design-system/button';
import { DictionaryEditor } from '@intlayer/design-system/dictionary-editor';
import {
  DictionaryFieldEditor,
  SaveForm,
} from '@intlayer/design-system/dictionary-field-editor';
import { Modal } from '@intlayer/design-system/modal';
import { Popover } from '@intlayer/design-system/popover';
import {
  RightDrawer,
  useRightDrawer,
} from '@intlayer/design-system/right-drawer';
import { Tag } from '@intlayer/design-system/tag';
import {
  useDictionariesRecord,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import { PencilRuler } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { dictionaryListDrawerIdentifier } from '../DictionaryListDrawer/dictionaryListDrawerIdentifier';
import {
  getDrawerIdentifier,
  useDictionaryEditionDrawer,
} from './useDictionaryEditionDrawer';

type DictionaryEditionDrawerProps = {
  dictionaryKey: string;
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawer: FC<DictionaryEditionDrawerProps> = ({
  dictionaryKey,
  isDarkMode,
}) => {
  const { backButtonText, openDictionaryEditor, modalTitle } = useIntlayer(
    'dictionary-edition-drawer'
  );
  const id = getDrawerIdentifier(dictionaryKey);
  const { noDictionaryFocused, focusedDictionaryNotFound } = useIntlayer(
    'dictionary-edition-drawer'
  );

  const { close } = useDictionaryEditionDrawer(dictionaryKey);
  const { open } = useRightDrawer();
  const openDictionaryListDrawer = () => open(dictionaryListDrawerIdentifier);

  const handleOnBack = () => {
    close();
    setFocusedContent(null);
    openDictionaryListDrawer();
  };

  const { localeDictionaries } = useDictionariesRecord();
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();

  const [editionModalOpen, setEditionModalOpen] = useState<boolean>(false);

  const onClickDictionaryList = () => {
    setEditionModalOpen(false);
    handleOnBack();
  };

  if (!focusedContent.dictionaryKey)
    return (
      <span className="mx-auto my-10 text-neutral text-sm">
        {noDictionaryFocused}
      </span>
    );

  const dictionary = Object.values(localeDictionaries ?? {}).find(
    (dictionary) => dictionary.localId === focusedContent?.dictionaryLocalId
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
          mode={['remote']}
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
            className="h-full"
          >
            <div className="flex h-full min-h-0 w-full flex-1 flex-col px-3 pt-5">
              <DictionaryFieldEditor
                dictionary={dictionary}
                onClickDictionaryList={onClickDictionaryList}
                isDarkMode={isDarkMode}
                mode={['remote']}
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

          <DictionaryEditor dictionary={dictionary} />
        </>
      )}
    </RightDrawer>
  );
};

type DictionaryEditionDrawerControllerProps = {
  isDarkMode?: boolean;
};

export const DictionaryEditionDrawerController: FC<
  DictionaryEditionDrawerControllerProps
> = ({ isDarkMode }) => {
  const { focusedContent } = useFocusUnmergedDictionary();
  const dictionaryKey: string | undefined = focusedContent?.dictionaryKey;

  if (!dictionaryKey) {
    return <></>;
  }

  return (
    <DictionaryEditionDrawer
      dictionaryKey={dictionaryKey}
      isDarkMode={isDarkMode}
    />
  );
};
