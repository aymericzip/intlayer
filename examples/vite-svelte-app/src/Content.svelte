<script lang="ts">
  import { useIntLayer, useDictionary } from 'svelte-intlayer';
  import appDictionary from './app.content';
  let content = useIntLayer('app');

  let dictionary = useDictionary(appDictionary);
</script>

<p>{content.title}</p>
<p>{dictionary.readTheDocs}</p>
