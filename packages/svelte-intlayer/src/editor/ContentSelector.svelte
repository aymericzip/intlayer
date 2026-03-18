<script lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';

export let dictionaryKey: NodeProps['dictionaryKey'];
export let keyPath: NodeProps['keyPath'];
</script>

<intlayer-content-selector-wrapper
  key-path={JSON.stringify(keyPath)}
  dictionary-key={dictionaryKey}
>
  <slot />
</intlayer-content-selector-wrapper>
