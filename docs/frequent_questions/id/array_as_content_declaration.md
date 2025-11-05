---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Bisakah saya menggunakan array sebagai deklarasi konten?
description: Pelajari cara menggunakan array sebagai deklarasi konten.
keywords:
  - array
  - konten
  - deklarasi
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
---

# Bisakah saya menggunakan array sebagai deklarasi konten?

Ya, Anda dapat menggunakan array sebagai deklarasi konten.

```ts
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  content: {
    test: t({
      en: ["Test", "Test2", "Test3"],
      fr: ["Test", "Test2", "Test3"],
      es: ["Test", "Test2", "Test3"],
    }),
  },
};

export default exampleContent;
```

Kemudian Anda dapat menggunakan konten seperti ini:

```tsx
import { useIntlayer } from "react-intlayer";

const Example = () => {
  const content = useIntlayer("example");

  return (
    <div>
      {content.test.map((item) => (
        <div key={item.value}>{item}</div>
      ))}
    </div>
  );
};
```

```vue
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("example");
</script>

<template>
  <div>
    <div v-for="item in content.test" :key="item.value">
      {{ item }}
    </div>
  </div>
</template>
```

`.value` memungkinkan Anda untuk mendapatkan nilai dari konten, bukan yang dibungkus oleh `IntlayerNode`.
