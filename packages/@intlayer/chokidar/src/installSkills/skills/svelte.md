---
name: Svelte
description: Svelte-specific stores and syntax
---

# Intlayer Svelte Usage

## Setup

- [SvelteKit](https://intlayer.org/doc/environment/sveltekit.md)
- [Vite and Svelte](https://intlayer.org/doc/environment/vite-and-svelte.md)
- [Page Metadata](https://intlayer.org/doc/environment/svelte-intlayer/page-metadata.md)
- [Sitemap](https://intlayer.org/doc/environment/svelte-intlayer/sitemap.md)
- [Server Actions](https://intlayer.org/doc/environment/svelte-intlayer/server-actions.md)

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

[Svelte Documentation](https://intlayer.org/doc/intlayer_with_svelte_kit.md)
