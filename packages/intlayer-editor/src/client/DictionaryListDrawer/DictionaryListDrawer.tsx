import type { Locales } from '@intlayer/config/client';
import { RightDrawer, RedirectionButton } from '@intlayer/design-system';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import type { FC } from 'react';
import {
  useDictionaryEditionDrawerControl,
  useEditedContentStore,
} from '../DictionaryEditionDrawer/index';
import {
  dictionaryListDrawerIdentifier,
  useDictionaryListDrawer,
} from './useDictionaryListDrawer';

export const DictionaryListDrawer: FC = () => {
  const dictionaryKeyList = Object.keys(dictionaries) as Locales[];
  const { open: openDictionaryEditionDrawer } =
    useDictionaryEditionDrawerControl();
  const { close } = useDictionaryListDrawer();
  const editedContent = useEditedContentStore((s) => s.editedContent);

  const handleClickDictionary = (dictionaryId: string) => {
    const { filePath } = dictionaries[dictionaryId];

    close();
    openDictionaryEditionDrawer({ dictionaryId, dictionaryPath: filePath });
  };

  const isDictionaryEdited = (dictionaryId: string) => {
    const dictionaryPath = dictionaries[dictionaryId].filePath;

    return Object.keys(editedContent).includes(dictionaryPath);
  };

  return (
    <RightDrawer
      title="Dictionary list"
      identifier={dictionaryListDrawerIdentifier}
    >
      {dictionaryKeyList.map((dictionaryId) => (
        <RedirectionButton
          key={dictionaryId}
          label={`Open dictionary editor ${dictionaryId}`}
          onClick={() => handleClickDictionary(dictionaryId)}
        >
          {isDictionaryEdited(dictionaryId)
            ? `✎ ${dictionaryId}`
            : dictionaryId}
        </RedirectionButton>
      ))}
    </RightDrawer>
  );
};
