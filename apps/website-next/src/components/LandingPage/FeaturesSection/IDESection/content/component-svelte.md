```svelte
<!-- src/components/Component.svelte -->
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";
  const content = useIntlayer("component");
</script>

<div>
  <h2>{content.title}</h2>
  <p>{content.content}</p>
</div>
```
