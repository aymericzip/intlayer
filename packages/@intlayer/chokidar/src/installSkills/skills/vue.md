# Intlayer Vue Usage

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

[Vue Documentation](https://intlayer.org/doc/packages/vue-intlayer)
