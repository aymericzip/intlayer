import {
  type FileContent,
  useEditedContentActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import {
  DashboardRightPanelId,
  useDashboardRightPanel,
  useRegisterDashboardRightPanel,
} from '#hooks/useDashboardRightPanel';

/** Right panel showing the node editor of the focused dictionary. */
export const dictionaryEditionDrawerIdentifier =
  DashboardRightPanelId.DictionaryEdition;

type DictionaryEditionDrawer = {
  focusedContent: FileContent | null;
  isOpen: boolean;
  close: () => void;
  getEditedContentValue: (
    localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
    keyPath: KeyPath[]
  ) => ContentNode | undefined;
};

/**
 * Node editor panel state. Registers the panel as available while mounted,
 * which only happens when a dictionary is focused on the editor page.
 */
export const useDictionaryEditionDrawer = (): DictionaryEditionDrawer => {
  const { isOpen: isOpenDrawer, close: closeDrawer } = useDashboardRightPanel();
  const { getEditedContentValue } = useEditedContentActions();
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();

  useRegisterDashboardRightPanel(dictionaryEditionDrawerIdentifier);

  return {
    isOpen: isOpenDrawer(dictionaryEditionDrawerIdentifier),
    focusedContent,
    getEditedContentValue,
    close: () => {
      closeDrawer();

      setFocusedContent(
        focusedContent?.dictionaryKey
          ? { ...(focusedContent as FileContent), keyPath: [] }
          : focusedContent
      );
    },
  };
};
