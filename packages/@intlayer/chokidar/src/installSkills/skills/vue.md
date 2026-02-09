# Intlayer Vue Usage

## useIntlayer Composable

```vue
<script setup>
import { useIntlayer } from "vue-intlayer";
const content = useIntlayer("my-dictionary-key");
</script>
<template>
  <div>
    <h1>{{ content.title }}</h1>
    <img :src="content.image.src.value" :alt="content.image.alt.value" />
  </div>
</template>
```

[Vue Documentation](https://intlayer.org/doc/packages/vue-intlayer)
