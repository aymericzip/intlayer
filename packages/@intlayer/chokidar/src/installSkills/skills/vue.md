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
  version: 8.1.2
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

## References

- [Vite and Vue](https://intlayer.org/doc/environment/vite-and-vue.md)
- [Nuxt and Vue](https://intlayer.org/doc/environment/nuxt-and-vue.md)
- [Vue Intlayer Exports](https://intlayer.org/doc/packages/vue-intlayer/exports.md)
- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
