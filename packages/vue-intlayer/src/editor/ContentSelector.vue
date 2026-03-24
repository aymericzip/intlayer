<script lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import { defineComponent, h, type HTMLAttributes } from 'vue';

type Props = NodeProps & Omit<HTMLAttributes, 'children'>;

export default defineComponent({
  name: 'ContentSelector',
  props: {
    dictionaryKey: {
      type: String,
      required: true,
    },
    keyPath: {
      type: Array,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      if (isEnabled) {
        return h(
          'intlayer-content-selector-wrapper',
          {
            'key-path': JSON.stringify(props.keyPath),
            'dictionary-key': props.dictionaryKey,
          },
          slots.default?.()
        );
      }

      return slots.default?.();
    };
  },
});
</script>
