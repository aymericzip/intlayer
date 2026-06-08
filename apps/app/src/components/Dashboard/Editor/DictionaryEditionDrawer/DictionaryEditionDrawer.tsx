import { Button } from '@intlayer/design-system/button';
import { DictionaryEditor } from '@intlayer/design-system/dictionary-editor';
import {
  DictionaryFieldEditor,
  SaveForm,
} from '@intlayer/design-system/dictionary-field-editor';
import { Modal } from '@intlayer/design-system/modal';
import { Popover } from '@intlayer/design-system/popover';
import { Tag } from '@intlayer/design-system/tag';
import {
  useDictionariesRecord,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import { ChevronLeft, PencilRuler } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntlayer } from 'react-intlayer';
import { useDashboardRightPanel } from '#hooks/useDashboardRightPanel';
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
  const {
    backButtonText,
    openDictionaryEditor,
    modalTitle,
    openDictionaryInEditor,
  } = useIntlayer('dictionary-edition-drawer');
  const id = getDrawerIdentifier(dictionaryKey);
  const { noDictionaryFocused, focusedDictionaryNotFound } = useIntlayer(
    'dictionary-edition-drawer'
  );

  const { close, isOpen } = useDictionaryEditionDrawer(dictionaryKey);
  const { open } = useDashboardRightPanel();
  const openDictionaryListDrawer = () => open(dictionaryListDrawerIdentifier);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.getElementById('dashboard-right-panel'));
  }, []);

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

  if (!isOpen || !portalTarget) return null;

  if (!focusedContent?.dictionaryKey)
    return createPortal(
      <div className="flex size-full items-center justify-center">
        <span className="text-neutral text-sm">{noDictionaryFocused}</span>
      </div>,
      portalTarget
    );

  const dictionary = Object.values(localeDictionaries ?? {}).find(
    (dictionary) => dictionary.localId === focusedContent?.dictionaryLocalId
  );

  if (!dictionary)
    return createPortal(
      <div className="flex size-full items-center justify-center">
        <span className="text-neutral text-sm">
          {focusedDictionaryNotFound}
        </span>
      </div>,
      portalTarget
    );

  return createPortal(
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="flex shrink-0 flex-col px-3 pt-4">
        <header className="relative mb-5 flex w-full">
          <Button
            variant="hoverable"
            color="text"
            size="icon-md"
            Icon={ChevronLeft}
            onClick={handleOnBack}
            label={backButtonText.value}
            className="absolute top-0 left-0"
          />
          <h3 className="w-full px-10 text-center font-medium text-lg">
            {dictionary.title ? dictionary.title : dictionary.key}
          </h3>

          <div className="absolute top-0 right-0">
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
                  {openDictionaryInEditor}
                </span>
              </Popover.Detail>
            </Popover>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-text/20 border-b border-dotted pb-3">
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
      </div>

      <div className="flex-1 overflow-auto p-3">
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
      </div>

      <div className="shrink-0 border-text/20 border-t bg-background pt-4">
        <SaveForm
          dictionary={dictionary}
          mode={['remote']}
          className="mb-4 flex-col px-3"
          onDelete={handleOnBack}
        />
      </div>
    </div>,
    portalTarget
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
