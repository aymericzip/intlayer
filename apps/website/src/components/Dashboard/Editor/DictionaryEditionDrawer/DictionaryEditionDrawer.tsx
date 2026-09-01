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
  useRightDrawerActions,
} from '@intlayer/design-system/right-drawer';
import { Tag } from '@intlayer/design-system/tag';
import {
  useDictionariesRecord,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import { PencilRuler } from 'lucide-react';
import { type FC, useDeferredValue, useState } from 'react';
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
  const { open } = useRightDrawerActions();
  const openDictionaryListDrawer = () => open(dictionaryListDrawerIdentifier);

  const handleOnBack = () => {
    close();
    setFocusedContent(null);
    openDictionaryListDrawer();
  };

  const { localeDictionaries } = useDictionariesRecord();
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();

  /**
   * Closing clears the focused content, which would strip the drawer out of the
   * DOM before its transition could run. Holding on to the last focused
   * dictionary keeps the panel rendered, and filled, while it slides away.
   */
  const focusedDictionaryLocalId = focusedContent?.dictionaryLocalId;
  const [displayedDictionaryLocalId, setDisplayedDictionaryLocalId] = useState(
    focusedDictionaryLocalId
  );

  if (
    focusedDictionaryLocalId &&
    focusedDictionaryLocalId !== displayedDictionaryLocalId
  ) {
    setDisplayedDictionaryLocalId(focusedDictionaryLocalId);
  }

  /**
   * Building the editor body is the expensive half of opening this drawer, and
   * it lands in the very commit that opens it, blocking the slide. Deferring it
   * lets React paint the opening drawer first, then fill it in at transition
   * priority, where the work can yield back to the browser between chunks.
   */
  const deferredDictionaryLocalId = useDeferredValue(
    displayedDictionaryLocalId,
    undefined
  );
  const isBodyReady = deferredDictionaryLocalId === displayedDictionaryLocalId;

  const [editionModalOpen, setEditionModalOpen] = useState<boolean>(false);

  const onClickDictionaryList = () => {
    setEditionModalOpen(false);
    handleOnBack();
  };

  const dictionary = Object.values(localeDictionaries ?? {}).find(
    (item) => item.localId === displayedDictionaryLocalId
  );

  if (!dictionary)
    return (
      <span className="mx-auto my-10 text-muted-foreground text-sm">
        {displayedDictionaryLocalId
          ? focusedDictionaryNotFound
          : noDictionaryFocused}
      </span>
    );

  return (
    <RightDrawer
      identifier={id}
      backButton={{
        onBack: handleOnBack,
        text: backButtonText.value,
      }}
      onClose={() => {
        close();
        setFocusedContent(null);
      }}
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
                <span className="whitespace-nowrap p-2 text-muted-foreground text-xs">
                  {openDictionaryEditor.popoverContent}
                </span>
              </Popover.Detail>
            </Popover>
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
        </>
      }
      footer={
        isBodyReady && (
          <SaveForm
            dictionary={dictionary}
            mode={['remote']}
            className="mb-4 flex-col px-3"
            onDelete={handleOnBack}
          />
        )
      }
    >
      {isBodyReady && (
        <>
          <Modal
            isOpen={editionModalOpen}
            onClose={() => setEditionModalOpen(false)}
            hasCloseButton
            title={modalTitle}
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

  /**
   * Unmounting as soon as focus clears would remove the drawer before it could
   * animate out. The last focused key stays mounted, and is only replaced once
   * another dictionary takes focus.
   */
  const [mountedDictionaryKey, setMountedDictionaryKey] =
    useState(dictionaryKey);

  if (dictionaryKey && dictionaryKey !== mountedDictionaryKey) {
    setMountedDictionaryKey(dictionaryKey);
  }

  if (!mountedDictionaryKey) {
    return <></>;
  }

  return (
    <DictionaryEditionDrawer
      dictionaryKey={mountedDictionaryKey}
      isDarkMode={isDarkMode}
    />
  );
};
