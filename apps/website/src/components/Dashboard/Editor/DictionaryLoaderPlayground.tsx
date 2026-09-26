import { useDictionariesRecordActions } from '@intlayer/editor-react';
import type { FC } from 'react';
import { useEffect } from 'react';

/**
 * Feeds the playground editor with every unmerged dictionary.
 *
 * The unmerged entry holds every declaration in every locale (~12 MB), so it
 * is imported on mount: a static import would ship it with the route chunk,
 * which the navbar preloads on every page.
 */
export const DictionaryLoaderPlayground: FC = () => {
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    let isCancelled = false;

    import('@intlayer/dictionaries-entry/unmerged').then(
      ({ getUnmergedDictionaries }) => {
        if (isCancelled) return;

        const dictionariesList = Object.fromEntries(
          Object.values(getUnmergedDictionaries())
            .flat()
            .map((dictionary) => [dictionary.localId, dictionary])
        );
        setLocaleDictionaries(dictionariesList);
      }
    );

    return () => {
      isCancelled = true;
    };
  }, []);

  return <></>;
};
