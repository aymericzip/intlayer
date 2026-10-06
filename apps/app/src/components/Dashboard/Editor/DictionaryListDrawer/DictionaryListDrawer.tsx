import { Button } from '@intlayer/design-system/button';
import { useSearch } from '@intlayer/design-system/hooks';
import { SearchInput } from '@intlayer/design-system/input';
import { Tag } from '@intlayer/design-system/tag';
import {
  useDictionariesRecord,
  useEditedContent,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import Fuse from 'fuse.js';
import { ChevronRight, Pencil } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntlayer } from 'react-intlayer';
import {
  useDashboardRightPanel,
  useRegisterDashboardRightPanel,
} from '#hooks/useDashboardRightPanel';
import { dictionaryEditionDrawerIdentifier } from '../DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { dictionaryListDrawerIdentifier } from './dictionaryListDrawerIdentifier';

export const DictionaryListDrawer: FC = () => {
  const { drawerTitle, buttonLabel } = useIntlayer('dictionary-list-drawer');

  const { open: openPanel, isOpen: checkIsOpen } = useDashboardRightPanel();

  const isOpen = checkIsOpen(dictionaryListDrawerIdentifier);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useRegisterDashboardRightPanel(dictionaryListDrawerIdentifier);

  useEffect(() => {
    setPortalTarget(document.getElementById('dashboard-right-panel'));
  }, []);

  const { localeDictionaries } = useDictionariesRecord();
  const { editedContent } = useEditedContent();
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const { setSearch, search } = useSearch();

  const dictionariesArray = useMemo(
    () => Object.values(localeDictionaries ?? {}),
    [localeDictionaries]
  );

  // Indexing is O(n) over every dictionary, so it must not run on each render
  const fuse = useMemo(
    () =>
      new Fuse(dictionariesArray, {
        keys: ['key', 'title', 'filePath', 'description', 'tags'],
        threshold: 0.3,
        includeScore: true,
      }),
    [dictionariesArray]
  );

  // Filter dictionaries based on search
  const filteredDictionaries = useMemo(() => {
    const trimmedSearch = search?.trim() ?? '';

    if (trimmedSearch === '') {
      return dictionariesArray;
    }

    return fuse.search(trimmedSearch).map((result) => result.item);
  }, [search, fuse, dictionariesArray]);

  const handleClickDictionary = (dictionary: Dictionary) => {
    setFocusedContent({
      dictionaryKey: dictionary.key!,
      dictionaryLocalId: dictionary.localId!,
      keyPath: [],
    });

    openPanel(dictionaryEditionDrawerIdentifier);
  };

  const editedDictionaryKeys = useMemo(
    () => new Set(Object.keys(editedContent ?? {})),
    [editedContent]
  );

  if (!isOpen || !portalTarget) return null;

  return createPortal(
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="flex shrink-0 flex-col p-3 pb-4">
        <h3 className="mb-4 text-center font-medium text-lg">
          {drawerTitle.label.value}
        </h3>
        <SearchInput
          placeholder="Search dictionaries"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
        />
      </div>

      <div className="flex-1 overflow-auto p-3 pt-0">
        <ul className="flex flex-col gap-1">
          {filteredDictionaries.map((dictionary) => (
            <li key={dictionary.localId!} className="w-full">
              <Button
                label={
                  buttonLabel.label({ dictionaryLocalId: dictionary.localId! })
                    .value
                }
                onClick={() => handleClickDictionary(dictionary)}
                variant="hoverable"
                color="text"
                IconRight={ChevronRight}
                size="md"
                isFullWidth
                Icon={
                  editedDictionaryKeys.has(dictionary.localId!)
                    ? Pencil
                    : undefined
                }
              >
                <div className="flex items-center gap-2 py-1">
                  <div className="flex max-w-full flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2 py-1.5">
                      <Tag color="text" roundedSize="full" size="xs">
                        {dictionary.key}
                      </Tag>
                      {dictionary.filePath && (
                        <Tag color="neutral" roundedSize="full" size="xs">
                          {dictionary.filePath.split('/').pop()}
                        </Tag>
                      )}
                      {dictionary.id && (
                        <Tag color="success" roundedSize="full" size="xs">
                          remote
                        </Tag>
                      )}
                    </div>
                    <span>
                      {(dictionary.title ?? '').length > 0
                        ? dictionary.title
                        : dictionary.key}
                    </span>
                  </div>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    portalTarget
  );
};
