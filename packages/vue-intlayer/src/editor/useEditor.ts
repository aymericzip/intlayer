import { useDictionariesRecord } from './dictionariesRecord';
import { useEditorEnabled } from './editorEnabled';
import { useEditorLocale } from './editorLocale';
import { useFocusDictionary } from './focusDictionary';
import { useIframeClickMerger } from './useIframeClickInterceptor';

export const useEditor = () => {
  useEditorEnabled();
  useFocusDictionary();
  useIframeClickMerger();
  useEditorLocale();
  useDictionariesRecord();
};
