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

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

- [Vite and Vue](references/environment_vite-and-vue.md)
- [Nuxt and Vue](references/environment_nuxt-and-vue.md)
- [Vue Intlayer Exports](references/packages_vue-intlayer_exports.md)
- [Intlayer Exports](references/packages_intlayer_exports.md)
