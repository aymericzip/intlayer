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

- [Vite and Vue](references/environment_vite-and-vue.md)
- [Nuxt and Vue](references/environment_nuxt-and-vue.md)

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

[Vue Documentation](references/packages_vue-intlayer_exports.md)

## Compiler

The [Intlayer Compiler](references/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

It activates once `compiler.enabled` and `compiler.output` are set: `.svelte` files additionally require `@intlayer/vue-compiler`.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Vite and Vue](references/environment_vite-and-vue.md)
- [Nuxt and Vue](references/environment_nuxt-and-vue.md)
- [Astro and Vue](references/environment_astro_vue.md)

### Concepts

- [Variants](references/concept_variants.md)
- [Collections](references/concept_collections.md)
- [Compiler](references/compiler.md)
- [Formatters (number, currency, date, …)](references/formatters.md)

### Packages

- [Vue Intlayer Exports](references/packages_vue-intlayer_exports.md)
- [Intlayer Exports](references/packages_intlayer_exports.md)
- [nuxt-intlayer Exports](references/packages_nuxt-intlayer_exports.md)
- [vue-intlayer usePathname](references/packages_vue-intlayer_usePathname.md)
- [vue-intlayer useRewriteURL](references/packages_vue-intlayer_useRewriteURL.md)
