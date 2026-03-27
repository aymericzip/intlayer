```vue
<!-- src/components/Component.vue -->
<template>
  <div>
    <h2>{{ content.title }}</h2>
    <p>{{ content.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
const content = useIntlayer("component");
</script>
```
