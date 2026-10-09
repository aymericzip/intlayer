import { useAuth } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  getModifiedDictionaries,
  type ModifiedDictionary,
  useDictionarySave,
} from '@intlayer/design-system/dictionary-field-editor';
import { DropDown } from '@intlayer/design-system/drop-down';
import { VirtualizedList } from '@intlayer/design-system/virtualized-list';
import { useEditedContent } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { RotateCcw, Save } from 'lucide-react';
import { type FC, memo, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

/** Dictionaries saved at the same time by "save all". */
const SAVE_ALL_CONCURRENCY = 5;

/** Fixed height of one dictionary row (incl. its gap), in pixels. */
const DICTIONARY_ROW_HEIGHT = 64;

type ModifiedDictionaryRowProps = {
  modifiedDictionary: ModifiedDictionary;
  isSaving: boolean;
  onSave: (modifiedDictionary: ModifiedDictionary) => void;
  onRestore: (localId: LocalDictionaryId) => void;
};

/** One edited dictionary, with its own restore and save actions. */
const ModifiedDictionaryRow: FC<ModifiedDictionaryRowProps> = memo(
  ({ modifiedDictionary, isSaving, onSave, onRestore }) => {
    const { saveDictionaryButton, restoreDictionaryButton } = useIntlayer(
      'translate-dashboard'
    );

    return (
      <div className="pb-2" style={{ height: DICTIONARY_ROW_HEIGHT }}>
        <div className="flex h-full items-center justify-between gap-6 rounded-lg bg-white/5 px-3 transition-colors hover:bg-white/10">
          <span className="truncate font-medium text-text-strong">
            {modifiedDictionary.dictionaryToSave.key}
          </span>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              label={restoreDictionaryButton?.label?.value}
              variant="outline"
              color="text"
              size="icon-md"
              Icon={RotateCcw}
              className="p-2!"
              onClick={(event) => {
                event.stopPropagation();
                onRestore(modifiedDictionary.localId);
              }}
            />
            <Button
              label={saveDictionaryButton?.label?.value}
              isLoading={isSaving}
              variant="outline"
              color="text"
              size="icon-md"
              Icon={Save}
              className="p-2!"
              onClick={(event) => {
                event.stopPropagation();
                onSave(modifiedDictionary);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

const getModifiedDictionaryKey = (modifiedDictionary: ModifiedDictionary) =>
  modifiedDictionary.localId;

type SaveAllButtonProps = {
  dictionaries: Record<string, Dictionary>;
};

export const SaveAllButton: FC<SaveAllButtonProps> = ({ dictionaries }) => {
  const { saveAllButton, restoreAllButton, modifiedCount } = useIntlayer(
    'translate-dashboard'
  );
  const { editedContent, restoreEditedContent } = useEditedContent();
  const { isAuthenticated } = useAuth();
  const { saveDictionary } = useDictionarySave();

  const [savingIds, setSavingIds] = useState<Set<LocalDictionaryId>>(new Set());
  const [isGlobalSaving, setIsGlobalSaving] = useState(false);

  // Serializing every dictionary is costly: only redo it when either changes
  const modifiedDictionaries = useMemo(
    () => getModifiedDictionaries(editedContent, dictionaries),
    [editedContent, dictionaries]
  );

  if (modifiedDictionaries.length === 0) {
    return null;
  }

  const updateSavingIds = (
    localId: LocalDictionaryId,
    isSaving: boolean
  ): void =>
    setSavingIds((previousIds) => {
      const nextIds = new Set(previousIds);

      if (isSaving) nextIds.add(localId);
      else nextIds.delete(localId);

      return nextIds;
    });

  const saveOne = async ({
    localId,
    dictionaryToSave,
  }: ModifiedDictionary): Promise<void> => {
    updateSavingIds(localId, true);

    await saveDictionary(
      dictionaryToSave,
      isAuthenticated ? 'remote' : 'local'
    );

    updateSavingIds(localId, false);
  };

  const handleSaveAll = async () => {
    setIsGlobalSaving(true);

    for (
      let startIndex = 0;
      startIndex < modifiedDictionaries.length;
      startIndex += SAVE_ALL_CONCURRENCY
    ) {
      await Promise.all(
        modifiedDictionaries
          .slice(startIndex, startIndex + SAVE_ALL_CONCURRENCY)
          .map(saveOne)
      );
    }

    setIsGlobalSaving(false);
  };

  const handleRestoreAll = () => {
    for (const { localId } of modifiedDictionaries) {
      restoreEditedContent(localId);
    }
  };

  return (
    <div className="fixed inset-e-10 bottom-42 z-50 md:bottom-24">
      <DropDown identifier="save-all-dictionaries">
        <DropDown.Trigger
          identifier="save-all-dictionaries"
          label={saveAllButton?.label?.value}
          color="text"
          variant="default"
          Icon={Save}
          isLoading={isGlobalSaving}
          onClick={handleSaveAll}
        >
          <span className="flex items-center gap-2">
            {saveAllButton?.text}
            <span className="flex size-6 items-center justify-center rounded-full bg-white/20 text-xs">
              {modifiedDictionaries.length}
            </span>
          </span>
        </DropDown.Trigger>
        <DropDown.Panel
          identifier="save-all-dictionaries"
          align="end"
          yAlign="above"
          isOverable
          isHidden={isGlobalSaving ? false : undefined}
        >
          <Container
            className="flex max-h-[60vh] flex-col gap-4"
            padding="md"
            roundedSize="2xl"
          >
            <div className="flex flex-row items-center justify-between gap-8 border-white/10 border-b pb-2 font-semibold text-text">
              <span className="flex shrink-0 flex-row items-center gap-2 whitespace-nowrap">
                {modifiedCount({ count: modifiedDictionaries.length })}
              </span>
              <Button
                label={restoreAllButton?.label?.value}
                variant="outline"
                color="text"
                size="icon-md"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRestoreAll();
                }}
                Icon={RotateCcw}
              >
                {restoreAllButton?.text}
              </Button>
            </div>

            <VirtualizedList
              items={modifiedDictionaries}
              itemHeight={DICTIONARY_ROW_HEIGHT}
              getItemKey={getModifiedDictionaryKey}
              // Absolute rows give the panel no intrinsic width
              className="w-80 max-w-[80vw]"
              renderItem={(modifiedDictionary) => (
                <ModifiedDictionaryRow
                  modifiedDictionary={modifiedDictionary}
                  isSaving={savingIds.has(modifiedDictionary.localId)}
                  onSave={saveOne}
                  onRestore={restoreEditedContent}
                />
              )}
            />
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
