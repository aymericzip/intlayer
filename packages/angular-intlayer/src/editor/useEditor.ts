import { useConfiguration } from './configuration';
import { createSharedComposable } from './createSharedComposable';
import { useDictionariesRecord } from './dictionariesRecord';
import { useEditorEnabled } from './editorEnabled';
import { useEditorLocale } from './editorLocale';
import { useFocusDictionary } from './focusDictionary';
import { useCrossURLPathSetter } from './useCrossURLPathState';
import { useIframeClickMerger } from './useIframeClickInterceptor';

export const useEditor = createSharedComposable(() => {
  useConfiguration();
  useEditorEnabled();
  useFocusDictionary();
  useIframeClickMerger();
  useCrossURLPathSetter();
  useEditorLocale();
  useDictionariesRecord();
  useEditorLocale();
});
