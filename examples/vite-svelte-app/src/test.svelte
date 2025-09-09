<script lang="ts">
  import { useIntLayer } from 'svelte-intlayer-test';

  let content = useIntLayer('app');
</script>

{JSON.stringify(content)}
