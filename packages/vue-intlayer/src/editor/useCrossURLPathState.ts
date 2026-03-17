import { inject } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useCrossURLPathSetter = () => {
  inject<ReturnType<typeof getEditorStateManager>>(
    INTLAYER_EDITOR_MANAGER_SYMBOL
  ) ?? getEditorStateManager();

  // UrlStateManager is already started by manager.start()
  // Nothing else needed here
};
