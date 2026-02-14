---
name: Vue
description: Vue-specific composables and syntax
---

# Intlayer Vue Usage

## Setup

- [Vite and Vue](https://intlayer.org/doc/environment/vite-and-vue.md)
- [Nuxt and Vue](https://intlayer.org/doc/environment/nuxt-and-vue.md)
- [Page Metadata](https://intlayer.org/doc/environment/vue-intlayer/page-metadata.md)
- [Sitemap](https://intlayer.org/doc/environment/vue-intlayer/sitemap.md)
- [Server Actions](https://intlayer.org/doc/environment/vue-intlayer/server-actions.md)

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

[Vue Documentation](https://intlayer.org/doc/packages/vue-intlayer.md)
