---
name: intlayer-vue
description: Integrates Intlayer internationalization with Vue.js and Nuxt applications. Use when the user asks to "setup Vue i18n", use the "useIntlayer" composable, or manage translations in Vue components.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Vue Usage

## Setup

- [Vite and Vue](https://intlayer.org/doc/environment/vite-and-vue.md)
- [Nuxt and Vue](https://intlayer.org/doc/environment/nuxt-and-vue.md)

## useIntlayer Composable

```vue
<script setup>
import { useIntlayer } from "vue-intlayer";
const content = useIntlayer("my-dictionary-key");

console.log(content.title.raw); // Render as raw
</script>
<template>
  <div>
    <h1>
      <!-- Render the visual editor -->
      <content.title />
    </h1>
    <h1>
      <!-- Render as string -->
      {{ content.title }}
    </h1>
    <img :src="content.image.src" :alt="content.image.alt" />
  </div>
</template>
```

[Vue Documentation](https://intlayer.org/doc/packages/vue-intlayer/exports.md)

## Compiler

The [Intlayer Compiler](https://intlayer.org/doc/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

It activates once `compiler.enabled` and `compiler.output` are set: `.svelte` files additionally require `@intlayer/vue-compiler`.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Vite and Vue](https://intlayer.org/doc/environment/vite-and-vue.md)
- [Nuxt and Vue](https://intlayer.org/doc/environment/nuxt-and-vue.md)
- [Astro and Vue](https://intlayer.org/doc/environment/astro/vue.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Compiler](https://intlayer.org/doc/compiler.md)
- [Formatters (number, currency, date, …)](https://intlayer.org/doc/formatters.md)

### Packages

- [Vue Intlayer Exports](https://intlayer.org/doc/packages/vue-intlayer/exports.md)
- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [nuxt-intlayer Exports](https://intlayer.org/doc/packages/nuxt-intlayer/exports.md)
- [vue-intlayer usePathname](https://intlayer.org/doc/packages/vue-intlayer/usePathname.md)
- [vue-intlayer useRewriteURL](https://intlayer.org/doc/packages/vue-intlayer/useRewriteURL.md)
