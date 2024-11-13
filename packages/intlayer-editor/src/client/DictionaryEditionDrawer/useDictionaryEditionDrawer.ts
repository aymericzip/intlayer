import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import {
  useRightDrawerStore,
  useEditedContentStore,
  useEditionPanelStore,
} from '@intlayer/design-system';

export const getDrawerIdentifier = (dictionaryId: string) =>
  `dictionary_edition_${dictionaryId}`;

type DictionaryId = string;
type DictionaryPath = string;

export type FileContent = {
  dictionaryPath?: DictionaryPath;
  dictionaryId: string;
  keyPath?: KeyPath[];
};

type DictionaryEditionDrawer = {
  focusedContent: FileContent | null;
  isOpen: boolean;
  open: (content: FileContent) => void;
  close: () => void;
  setDictionariesRecord: (
    dictionariesRecord: Record<DictionaryId, Dictionary>
  ) => void;
  getEditedContentValue: (
    dictionaryId: DictionaryId,
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
};

type OpenDictionaryEditionDrawerProps = {
  dictionaryId: string;
  dictionaryPath?: string;
  keyPath?: KeyPath[];
};

export const useDictionaryEditionDrawer = (
  dictionaryId: string
): DictionaryEditionDrawer => {
  const id = getDrawerIdentifier(dictionaryId);
  const { isOpen, open, close } = useRightDrawerStore(id)();
  const { setDictionariesRecord, getEditedContentValue } =
    useEditedContentStore((s) => ({
      setDictionariesRecord: s.setDictionariesRecord,
      getEditedContentValue: s.getEditedContentValue,
    }));
  const { setFocusedContent, focusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
    setFocusedContent: s.setFocusedContent,
  }));

  const openDictionaryEditionDrawer = ({
    dictionaryId,
    dictionaryPath,
    keyPath = [],
  }: OpenDictionaryEditionDrawerProps) => {
    setFocusedContent({
      dictionaryId,
      dictionaryPath,
      keyPath,
    });

    open();
  };

  return {
    isOpen,
    focusedContent,
    setDictionariesRecord,
    getEditedContentValue,
    open: openDictionaryEditionDrawer,
    close,
  };
};

type DictionaryEditionDrawerControl = {
  open: (content: FileContent) => void;
  close: (dictionaryId: string) => void;
};

export const useDictionaryEditionDrawerControl =
  (): DictionaryEditionDrawerControl => {
    const setFocusedContent = useEditionPanelStore((s) => s.setFocusedContent);

    const open = ({
      dictionaryId,
      dictionaryPath,
      keyPath = [],
    }: OpenDictionaryEditionDrawerProps) => {
      setFocusedContent({
        dictionaryId,
        dictionaryPath,
        keyPath,
      });

      const id = getDrawerIdentifier(dictionaryId);

      useRightDrawerStore(id).getState().open();
    };

    const close = (dictionaryId: string) => {
      const id = getDrawerIdentifier(dictionaryId);

      useRightDrawerStore(id).getState().close();
    };

    return {
      open,
      close,
    };
  };
