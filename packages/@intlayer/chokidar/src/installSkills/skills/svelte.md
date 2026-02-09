# Intlayer Svelte Usage

## useIntlayer Hook

```svelte
<script>
  import { useIntlayer } from "svelte-intlayer";
  const content = useIntlayer("my-dictionary-key");
</script>
<div>
  <h1>{$content.title}</h1>
  <div aria-label={$content.title.value}></div>
  <svelte:component this={$content.title} />
</div>
```

[Svelte Documentation](https://intlayer.org/doc/intlayer_with_svelte_kit)
