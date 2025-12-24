'use client';

import { Button, Container, DropDown } from '@intlayer/design-system';
import {
  useAuth,
  usePushDictionaries,
  useWriteDictionary,
} from '@intlayer/design-system/hooks';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { RotateCcw, Save } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';

type SaveAllButtonProps = {
  dictionaries: Record<string, Dictionary>;
};

export const SaveAllButton: FC<SaveAllButtonProps> = ({ dictionaries }) => {
  const {
    saveAllButton,
    restoreAllButton,
    saveDictionaryButton,
    restoreDictionaryButton,
    modifiedCount,
  } = useIntlayer('dictionary-list');
  const { editedContent, restoreEditedContent } = useEditedContent();
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { isAuthenticated } = useAuth();
  const { mutateAsync: writeDictionary } = useWriteDictionary();
  const { mutateAsync: pushDictionaries } = usePushDictionaries();

  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [isGlobalSaving, setIsGlobalSaving] = useState(false);

  // Identify modified dictionaries
  const getModifiedDictionaries = () => {
    if (!editedContent) return [];
    return Object.entries(editedContent)
      .filter(([localId, editedDict]) => {
        const originalDict = dictionaries[localId];
        if (!originalDict) return true;
        return JSON.stringify(editedDict) !== JSON.stringify(originalDict);
      })
      .map(([localId, editedDict]) => ({
        localId,
        editedDict,
        originalDict: dictionaries[localId],
      }));
  };

  const modifiedDictionaries = getModifiedDictionaries();

  if (modifiedDictionaries.length === 0) {
    return null;
  }

  const saveOne = async (localId: string, dictionary: Dictionary) => {
    setSavingIds((prev) => new Set(prev).add(localId));
    try {
      if (isAuthenticated) {
        await pushDictionaries({ dictionaries: [dictionary] });
      } else {
        await writeDictionary({ dictionary });
      }

      setLocaleDictionary(dictionary);
      restoreEditedContent(localId as LocalDictionaryId);
    } catch (error) {
      console.error(`Failed to save dictionary ${localId}`, error);
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(localId);
        return next;
      });
    }
  };

  const handleSaveAll = async () => {
    setIsGlobalSaving(true);
    const limit = 5;
    const queue = [...modifiedDictionaries];
    const executing: Promise<void>[] = [];

    const processItem = async (item: (typeof modifiedDictionaries)[0]) => {
      const dictToSave = item.originalDict
        ? ({ ...item.originalDict, ...item.editedDict } as Dictionary)
        : item.editedDict;
      await saveOne(item.localId, dictToSave);
    };

    const results = [];
    for (const item of queue) {
      const p = processItem(item);
      results.push(p);
      executing.push(p);
      p.then(() => {
        const index = executing.indexOf(p);
        if (index > -1) executing.splice(index, 1);
      });

      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
    await Promise.all(results);
    setIsGlobalSaving(false);
  };

  const handleRestoreAll = () => {
    modifiedDictionaries.forEach(({ localId }) => {
      restoreEditedContent(localId as LocalDictionaryId);
    });
  };

  return (
    <div className="fixed right-10 bottom-42 z-50 md:bottom-24">
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
          {saveAllButton?.text}
          <span className="flex size-6 items-center justify-center rounded-full bg-white/20 text-xs">
            {modifiedDictionaries.length}
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
            className="flex flex-col gap-4"
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestoreAll();
                }}
                Icon={RotateCcw}
              >
                {restoreAllButton?.text}
              </Button>
            </div>

            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
              {modifiedDictionaries.map(
                ({ localId, editedDict, originalDict }) => (
                  <div
                    key={localId}
                    className="flex items-center justify-between gap-6 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                  >
                    <span className="truncate font-medium text-text-strong">
                      {localId?.split('::').slice(0, 1)}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        label={restoreDictionaryButton?.label?.value}
                        isLoading={savingIds.has(localId)}
                        variant="outline"
                        color="text"
                        size="icon-md"
                        Icon={RotateCcw}
                        className="p-2!"
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreEditedContent(localId as LocalDictionaryId);
                        }}
                      />
                      <Button
                        label={saveDictionaryButton?.label?.value}
                        variant="outline"
                        color="text"
                        size="icon-md"
                        Icon={Save}
                        className="p-2!"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveOne(
                            localId,
                            originalDict
                              ? ({
                                  ...originalDict,
                                  ...editedDict,
                                } as Dictionary)
                              : editedDict
                          );
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
