import { useRightDrawerStore } from '@intlayer/design-system';

export const dictionaryListDrawerIdentifier = 'dictionaryList';

export const useDictionaryListDrawer = useRightDrawerStore(
  dictionaryListDrawerIdentifier
);
