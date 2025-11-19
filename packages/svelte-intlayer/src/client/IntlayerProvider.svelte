<script lang="ts">
import type { LocalesValues } from '@intlayer/types';
import { createCommunicator } from '../editor/communicator';
import { createEditorEnabledClient } from '../editor/editorEnabled';
import { createFocusDictionaryClient } from '../editor/focusDictionary';
import { useEditor } from '../editor/useEditor';
import { setIntlayerContext } from './intlayerContext';

export let locale: LocalesValues;

createCommunicator();
createEditorEnabledClient();
createFocusDictionaryClient();

useEditor();

setIntlayerContext({
  locale,
  setLocale: () => {},
});
</script>

<slot />

