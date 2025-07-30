---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Posso usare un array come dichiarazione di contenuto?
description: Scopri come usare un array come dichiarazione di contenuto.
keywords:
  - array
  - contenuto
  - dichiarazione
  - intlayer
slugs:
  - doc
  - faq
  - array-as-content-declaration
---

# Posso usare un array come dichiarazione di contenuto?

Sì, puoi usare un array come dichiarazione di contenuto.

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

Poi puoi usare il contenuto in questo modo:

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

`.value` ti permette di ottenere il valore del contenuto, non incapsulato da un `IntlayerNode`.
