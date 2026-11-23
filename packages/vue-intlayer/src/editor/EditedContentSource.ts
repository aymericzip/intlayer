import { isEnabled } from '@intlayer/editor/isEnabled';
import type { KeyPath } from '@intlayer/types/keyPath';
import {
  defineComponent,
  onBeforeUnmount,
  type PropType,
  ref,
  watch,
} from 'vue';

/**
 * Renderless component exposing, through its default scoped slot, the source
 * string edited in the visual editor for a markdown / html node
 * (`{ editedSource }`, `undefined` when the node is not edited).
 */
export const EditedContentSource = defineComponent({
  name: 'EditedContentSource',
  props: {
    dictionaryKey: { type: String, required: true },
    keyPath: { type: Array as PropType<KeyPath[]>, required: true },
  },
  setup(props, { slots }) {
    const editedSource = ref<string | undefined>();
    let stopSubscription: (() => void) | null = null;

    const subscribe = (dictionaryKey: string, keyPathJson: string) => {
      stopSubscription?.();
      stopSubscription = null;
      editedSource.value = undefined;

      if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;
      if (typeof window === 'undefined' || !dictionaryKey) return;

      let isStopped = false;
      let unsubscribe: (() => void) | null = null;

      import('@intlayer/editor')
        .then(({ subscribeToEditedContentSource }) => {
          if (isStopped) return;

          unsubscribe = subscribeToEditedContentSource(
            dictionaryKey,
            JSON.parse(keyPathJson) as KeyPath[],
            (source) => {
              editedSource.value = source;
            }
          );
        })
        .catch(() => {});

      stopSubscription = () => {
        isStopped = true;
        unsubscribe?.();
      };
    };

    watch(
      () => [props.dictionaryKey, JSON.stringify(props.keyPath)] as const,
      ([dictionaryKey, keyPathJson]) => subscribe(dictionaryKey, keyPathJson),
      { immediate: true }
    );

    onBeforeUnmount(() => stopSubscription?.());

    return () => slots.default?.({ editedSource: editedSource.value });
  },
});
