<script lang="ts">
import { isEnabled } from '@intlayer/editor/isEnabled';
import { defineComponent, h } from 'vue';




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
      if (process.env['INTLAYER_EDITOR_ENABLED'] === 'false' || !isEnabled) {
        return slots.default?.();
      }

      return h(
        'intlayer-content-selector-wrapper',
        {
          'key-path': JSON.stringify(props.keyPath),
          'dictionary-key': props.dictionaryKey,
        },
        slots.default?.()
      );
    };
  },
});
</script>
