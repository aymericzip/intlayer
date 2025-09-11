<script lang="ts">
  import { useIntLayer, useDictionary } from 'svelte-intlayer-test';
  import appDictionary from './app.content';
  let content = useIntLayer('app');

  let dictionary = useDictionary(appDictionary);
</script>

{JSON.stringify(content)}
{JSON.stringify(dictionary)}
