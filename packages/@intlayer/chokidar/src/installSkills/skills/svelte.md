---
name: intlayer-svelte
description: Integrates Intlayer internationalization with Svelte and SvelteKit applications. Use when the user asks to "setup Svelte i18n", use the "useIntlayer" store, or manage translations in Svelte components.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: @intlayer/mcp
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

# Intlayer Svelte Usage

## Setup

- [SvelteKit](https://intlayer.org/doc/environment/sveltekit.md)
- [Vite and Svelte](https://intlayer.org/doc/environment/vite-and-svelte.md)

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
