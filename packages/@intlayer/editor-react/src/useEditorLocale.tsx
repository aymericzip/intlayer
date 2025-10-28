import { MessageKey } from '@intlayer/editor';
import type { Locale } from '@intlayer/types';
import { useCrossFrameState } from './useCrossFrameState';

export const useEditorLocale = () => {
  const [currentLocale] = useCrossFrameState<Locale>(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  return currentLocale;
};

export const useSetEditorLocale = () => {
  const setCurrentLocale = useCrossFrameState<Locale>(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  return setCurrentLocale;
};
